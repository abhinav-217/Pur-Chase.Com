const express = require('express')
const router = express.Router()

const {openAdmin} = require('../Controllers/controlleradmin')

router.route("/").get(openAdmin)

module.exports = router;