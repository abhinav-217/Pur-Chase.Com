const sendEmail = require("../methods/sendEmail");

async function render_forgot(req,res){
    if (req.session.isLogIn) {
        res.redirect('/');
        return;
      }
      res.render('forgot', { name: "" });
}

async function forgot(req,res)
{
    let email = req.body.email;
    let otp = parseInt(Math.random() * 1000000);
    sendEmail(email, otp, "Forgot Password Otp", (err, data) => {
      if (err) {
        res.render('login', { err: 'Something Went Wrong!! Try Again' })
        return;
      }
    })
    req.session.otpVerify = otp;
    req.session.email = email;
    res.redirect('/verifyF');
}

module.exports = {render_forgot,forgot}