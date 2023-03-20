const UserSchemaModel = require('../Schema/User')

async function render_reset(req,res){
    if (req.session.isLogIn) {
        let user = {
          name: req.session.name,
          username: req.session.username,
          phone: req.session.phone,
          email: req.session.email,
        }
        res.render('reset', { name: JSON.stringify(user), err: "" })
      }
      else if (req.session.forVerify) {
        const isPresent = await UserSchemaModel.find({ email: req.session.email })
        req.session.name = isPresent[0].name;
        req.session.email = isPresent[0].email;
        req.session.phone = isPresent[0].phone;
        req.session.username = isPresent[0].username;
    
        res.render('reset', { name: JSON.stringify({}), err: "" })
      }
      else {
        res.redirect('/login')
      }
}

async function resetPassword(req,res)
{
    let newPass = req.body.new;
    let confirm = req.body.confirm;
    let email = req.session.email;
    if (newPass == confirm) {
      let result = await UserSchemaModel.updateOne({ email: email }, { $set: { password: newPass } })
      req.session.isLogIn = true;
      res.redirect("/")
    }
    else {
      let user = {
        name: req.session.name,
        username: req.session.username,
        phone: req.session.phone,
        email: req.session.email,
      }
      res.render('reset', { name: JSON.stringify(user), err: "Password's Do not match" })
    }
}

module.exports = {render_reset,resetPassword}