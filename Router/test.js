const express = require('express')
const router = express.Router()

const {testingFunction1,testingFunction2} = require("../Controllers/test")

router.route("/").get(testingFunction1)
router.route("/2").get(testingFunction2)

module.exports = router