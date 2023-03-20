const UserSchemaModel = require('../Schema/User')

async function render_login(req,res){
    if (req.session.isLogIn) {
        res.redirect('/')
      }
      else {
        res.render('login.ejs', { err: "" })
      }
}

async function checkLogin(req,res)
{
    const isPresent = await UserSchemaModel.find({ email: req.body.email })
    if (isPresent.length > 0) {
      if (isPresent[0].isVerified) {
        if (isPresent[0].password == req.body.password) {
          req.session.name = isPresent[0].name;
          req.session.username = isPresent[0].username;
          req.session.email = isPresent[0].email;
          req.session.phone = isPresent[0].phone;
          req.session.isLogIn = true;
          if (isPresent[0].isAdmin) {
            req.session.isAdmin = true;
          }
          else {
            req.session.isAdmin = false;
          }
          res.redirect('/');
        }
        else {
          res.render('login.ejs', { err: "Incorrect Password" })
        }
      }
      else {
        req.session.name = isPresent[0].name;
        req.session.username = isPresent[0].username;
        req.session.email = isPresent[0].email;
        req.session.phone = isPresent[0].phone;
        res.redirect('/verify');
      }
    }
    else {
      res.render('login.ejs', { err: "Not matching email Try Signing In!!!" })
    }
}

module.exports = {render_login,checkLogin}