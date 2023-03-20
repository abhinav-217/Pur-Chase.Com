const express = require('express')
const router = express.Router()
const {render_reset,resetPassword} = require("../Controllers/controllerreset")

router.route("/").get(render_reset)
.post(resetPassword)

module.exports = router;