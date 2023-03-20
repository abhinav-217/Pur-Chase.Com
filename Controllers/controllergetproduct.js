const UserSchemaModel = require('../Schema/User')
const CartSchemaModel = require('../Schema/Cart')
const getProductDb = require('../DbConnect/getProductDb')
async function getProduct(req,res){
    let page = parseInt(req.body.quantity);
    let totalproducts = 4;
    let data = await getProductDb();
    let products = await data.find().skip(page * totalproducts).limit(totalproducts).toArray();
    res.json(products)
}


module.exports = {getProduct}