const express = require('express')
const router = express.Router()

const openProduct = require('../Controllers/controlleropenProduct')

router.route("/:pId").get(openProduct)

module.exports = router;