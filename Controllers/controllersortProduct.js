const getProductDb = require('../DbConnect/getProductDb')
async function sortProd(req,res){
    let order = req.body.quantity;
    let lim = req.body.limit;
    let data = await getProductDb();
    let products;
    if(order==1)
    {
      products = await data.find().sort({price:-1}).limit(lim).toArray();
    }
    else if(order==-1)
    {
      products = await data.find().sort({price:1}).limit(lim).toArray();
    }
    else if(order==0)
    {
      products = await data.find().limit(lim).toArray();
    }
    res.json(products)
}

module.exports = {sortProd}