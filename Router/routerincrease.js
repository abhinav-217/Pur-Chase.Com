const express = require('express')
const router = express.Router()

const {increase} = require('../Controllers/controllerincrease')

router.route("/:pId/:quantity/:chk").get(increase)

module.exports = router;