const express = require('express')
const router = express.Router()

const {render_verify,verifyUser} = require('../Controllers/controllerverify')

router.route("/").get(render_verify)
.post(verifyUser)

module.exports = router;