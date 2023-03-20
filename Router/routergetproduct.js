const express = require('express')
const router = express.Router()

const {getProduct} = require('../Controllers/controllergetproduct')

router.route("/").post(getProduct)

module.exports = router;