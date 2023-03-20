const UserSchemaModel = require('../Schema/User')
const sendEmail = require('../methods/sendEmail')
async function render_signup(req, res) {

    if (req.session.isLogIn) {
        res.redirect('/')
    }
    else {
        res.render('signup.ejs', { err: "" })
    }
}

async function checkSignup(req, res) {
    let otp = parseInt(Math.random() * 1000000);
    let Thisuser = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    }
    const isPresent = await UserSchemaModel.find({ email: Thisuser.email })
    if (isPresent.length) {
      res.render('signup.ejs', { err: "Email already exist" })
    }
    else {
      sendEmail(Thisuser.email, otp, "Verify Your Email", (err, data) => {
        if (err) {
          res.render('signup', { err: 'Something Went Wrong!! Try Again' })
          return;
        }
      })
      const user = new UserSchemaModel();
      user.name = Thisuser.name;
      user.username = Thisuser.username;
      user.email = Thisuser.email;
      user.phone = Thisuser.phone;
      user.password = Thisuser.password;
      user.otp = otp;
      user.isVerified = false;
      user.isAdmin = false;
      let savedUser = user.save();
      req.session.name = Thisuser.name;
      req.session.username = Thisuser.username;
      req.session.email = Thisuser.email;
      req.session.phone = Thisuser.phone;
      req.session.otp = otp;
      console.log(otp)
      res.redirect('/verify')
    }
}

module.exports = { render_signup, checkSignup }