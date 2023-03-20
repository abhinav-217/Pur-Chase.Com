const UserSchemaModel = require('../Schema/User')
const CartSchemaModel = require('../Schema/Cart')
async function userAccount(req,res){
    res.send("Page for User Account Details")
}

module.exports = {userAccount}