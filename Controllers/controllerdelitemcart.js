const UserSchemaModel = require('../Schema/User')
const CartSchemaModel = require('../Schema/Cart')
const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../Services/getAllProducts')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function deleteCartItem(req,res){
    if (req.session.isLogIn) {
        let pId = req.params.Id; // type is string
        let tofind = await getUser(req);
        let cartPresent = await getCartProducts(tofind)
        let products = await getAllProducts();
    
        let totalcount = products[0].quantity;
        if (cartPresent.length) {
          let prevCartItems = cartPresent[0].cartItems;
          prevCartItems.forEach((c) => {
            if (c.pId == pId) {
              totalcount = totalcount + c.quantity;
              return;
            }
          })
          let result = prevCartItems.filter(pro => pro.pId != pId);
          let saved = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: result } })
        }
        res.redirect('/cart');
      }
      else {
        res.redirect('/login');
      }
}


module.exports = {deleteCartItem}