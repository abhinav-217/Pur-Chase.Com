const express = require('express')
const router = express.Router()

const {render_forgot,forgot} = require('../Controllers/controllerforgot')

router.route("/").get(render_forgot)
.post(forgot)

module.exports = router;