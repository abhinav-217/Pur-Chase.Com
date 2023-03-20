const express = require('express')
const router = express.Router()

const {loadmore} = require('../Controllers/controllerloadmore')

router.route("/").get(loadmore)

module.exports = router;