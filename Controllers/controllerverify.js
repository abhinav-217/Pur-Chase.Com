const UserSchemaModel = require('../Schema/User')

async function render_verify(req,res){
    if (req.session.isLogIn) {
        res.redirect('/')
        return;
      }
      res.render('verify')
}

async function verifyUser(req,res)
{
    if (req.session.isLogIn) {
        redirect('/');
        return;
      }
      let enteredOtp = parseInt(req.body.otp);
      const isPresent = await UserSchemaModel.find({ email: req.session.email })
      let originalOtp = isPresent[0].otp;
      let _id = isPresent[0]._id.valueOf();
      if (parseInt(enteredOtp) == parseInt(originalOtp)) {
        let result = await UserSchemaModel.updateOne({ _id: _id }, { $set: { isVerified: true } })
        req.session.isLogIn = true;
        res.redirect("/")
      }
      else {
        res.render('signup', { err: 'OTP Does Not match Try again' })
        return;
      }
}

module.exports = {render_verify,verifyUser}