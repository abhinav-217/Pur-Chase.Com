const express = require('express')
const router = express.Router()

const root_render = require('../Controllers/root')

router.route("/").get(root_render)

module.exports = router;