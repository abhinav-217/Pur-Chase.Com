const express = require('express')
const router = express.Router()

const {update} = require('../Controllers/controllerupdate')

router.route("/").post(update)

module.exports = router;