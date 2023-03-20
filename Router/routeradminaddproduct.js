const express = require('express')
const router = express.Router()

const {get_addProd,post_addProd} = require('../Controllers/controlleradminaddproduct')

router.route("/").get(get_addProd)
.post(post_addProd)

module.exports = router;