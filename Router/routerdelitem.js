const express = require('express')
const router = express.Router()

const {deleteCartItem} = require('../Controllers/controllerdelitemcart')

router.route("/:Id").get(deleteCartItem)

module.exports = router;