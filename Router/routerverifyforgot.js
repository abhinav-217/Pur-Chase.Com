const express = require('express')
const router = express.Router()

const {render_verifyF,checkVerifyf} = require('../Controllers/controllerverifyforgot')

router.route("/").get(render_verifyF)
.post(checkVerifyf)

module.exports = router;