const express = require('express')
const router = express.Router()

const {markForOrder} = require('../Controllers/controllermarkfororder')

router.route("/").post(markForOrder)

module.exports = router;