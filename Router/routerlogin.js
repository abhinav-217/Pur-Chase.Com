const express = require('express')
const router = express.Router()

const {render_login,checkLogin} = require('../Controllers/controllerlogin')

router.route("/").get(render_login)
.post(checkLogin)

module.exports = router;