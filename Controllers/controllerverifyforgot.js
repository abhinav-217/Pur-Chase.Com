async function render_verifyF(req,res){
    if (req.session.isLogIn) {
        res.redirect('/');
        return;
      }
      res.render('forgotVerify')
}

async function checkVerifyf(req,res)
{
    let otp = parseInt(req.body.otp)
    console.log(otp)
    if (otp == parseInt(req.session.otpVerify)) {
      req.session.forVerify = true;
      res.redirect('reset')
    }
    else {
      res.redirect('/verifyF');
    }
}

module.exports = {render_verifyF,checkVerifyf}