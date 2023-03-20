const express = require('express')
const router = express.Router()

const {sortProd} = require('../Controllers/controllersortProduct')

router.route("/").post(sortProd)

module.exports = router;