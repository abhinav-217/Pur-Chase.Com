const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function searchCart(req,res){
    let tofind = await getUser(req);
    let cartPresent = await getCartProducts(tofind)
    let cartProducts = cartPresent[0].cartItems;
    let result = [];
    cartProducts.forEach((p)=>{
      if(p.pname==req.body.value)
      {
        result.push(p);
      }
    })
    
    res.send(result)
}

module.exports = {searchCart}