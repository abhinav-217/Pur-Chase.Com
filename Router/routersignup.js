const express = require('express')
const router = express.Router()

const {render_signup,checkSignup} = require('../Controllers/controllersignup')

router.route("/").get(render_signup)
.post(checkSignup)

module.exports = router;