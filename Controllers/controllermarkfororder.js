const UserSchemaModel = require('../Schema/User')
const CartSchemaModel = require('../Schema/Cart')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function markForOrder(req,res){
    let pId = req.body.pId;
    let toCheck = req.body.toCheck;
    let tofind = await getUser(req);
    let cartPresent = await getCartProducts(tofind)
    let cartProducts = cartPresent[0].cartItems;
    cartProducts.forEach((e)=>{
      if(e.pId==pId)
      {
        if(toCheck)
        {
          e.isForOrder = true;  
        }
        else
        {
          e.isForOrder = false;
        }
      }
    })
    // console.log(cartProducts)
    let saved = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: cartProducts } })
    // console.log(saved)
    if(saved.modifiedCount>0)
    {
      res.send({status:1});
    }
    else
    {
      res.send({status:0});
    }
}

module.exports = {markForOrder}