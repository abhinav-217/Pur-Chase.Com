const CartSchemaModel = require('../Schema/Cart')
const getProduct = require('../Services/getProduct')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function increase(req,res){
    if (req.session.isLogIn) {
        let pId = req.params.pId;
        let chk = req.params.chk;
        let tofind = await getUser(req);
        let cartPresent = await getCartProducts(tofind)
        let products = await getProduct(pId);
        console.log("yes")
        let currentCount;
        let totalcount = products[0].quantity;
        if (cartPresent.length > 0) {
          let prevCartItems = cartPresent[0].cartItems;
          prevCartItems.forEach((p) => {
            if (p.pId == pId) {
              if (chk == 1) {
                p.quantity++;
                totalcount--;
                currentCount = p.quantity;
              }
              else if (chk == 2) {
                if (p.quantity > 1) {
                  p.quantity--;
                  totalcount++;
                  currentCount = p.quantity;
                }
              }
            }
          })
          let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
        }
        res.redirect('/cart')
      }
      else {
        res.redirect('/login');
      }
}


module.exports = {increase}