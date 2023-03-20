const express = require('express')
const router = express.Router()

const {addtocart} = require('../Controllers/controlleraddtocart')

router.route("/:pId").get(addtocart)

module.exports = router;