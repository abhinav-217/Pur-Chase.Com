const express = require('express')
const router = express.Router()

const {userAccount} = require('../Controllers/controlleruserAccount')

router.route("/").get(userAccount)

module.exports = router;