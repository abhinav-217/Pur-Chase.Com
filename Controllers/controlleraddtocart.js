const CartSchemaModel = require('../Schema/Cart')
const getProduct = require('../Services/getProduct')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function addtocart(req,res){
    if (req.session.isLogIn) {
        const productId = req.params.pId;
        const email = req.session.email;
        let products = await getProduct(productId);
        let tofind = await getUser(req);
        const cartPresent = await getCartProducts(tofind);
        let item = {
          pId: products[0].id,
          pname: products[0].name,
          price: products[0].price,
          image: products[0].image,
          quantity: 1,
          isForOrder:false
        }
        if (cartPresent.length) {
          let prevCartItems = cartPresent[0].cartItems;
          let chk = false;
          prevCartItems.forEach((p) => {
            if (p.pId == item.pId) {
              p.quantity++;
              chk = true;
            }
          })
          if (chk) {
            let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
          }
          else {
            prevCartItems.push(item);
            let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
          }
        }
        else {
          let pro = [];
          pro.push(item);
          const cartUser = new CartSchemaModel();
          cartUser.userid = tofind;
          cartUser.cartItems = pro;
          let saveCartUser = cartUser.save();
        }
        res.redirect('/cart')
        return;
      }
      res.redirect('/login')
}

module.exports = {addtocart}