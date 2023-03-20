const express = require('express')
const router = express.Router()

const {delProd} = require('../Controllers/controllerdelproduct')

router.route("/:pId").get(delProd)

module.exports = router;