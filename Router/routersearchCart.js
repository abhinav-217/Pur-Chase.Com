const express = require('express')
const router = express.Router()

const {searchCart} = require('../Controllers/searchCartcontroller')

router.route("/").post(searchCart)

module.exports = router;