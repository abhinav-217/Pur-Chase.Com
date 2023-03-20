const express = require('express')
const router = express.Router()

const {showcart} = require('../Controllers/controllercart')

router.route("/").get(showcart)

module.exports = router;