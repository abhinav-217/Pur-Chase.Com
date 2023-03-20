const CartSchemaModel = require('../Schema/Cart')
const getAllProducts = require('../Services/getAllProducts')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function showcart(req, res) {
  if (req.session.isLogIn) {
    let user = {
      name: req.session.name,
      email: req.session.email,
      username: req.session.username,
      phone: req.session.phone,
      isAdmin: req.session.isAdmin
    }

    let tofind = await getUser(req);
    let cartPresent = await getCartProducts(tofind)
    let products = await getAllProducts();
    let updateCartProducts = [];
    if (cartPresent.length > 0) {
      let cartProducts = cartPresent[0].cartItems;
      cartProducts.forEach((p) => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id == p.pId) {
            let newProduct = {
              pId: products[i].id,
              pname: products[i].name,
              price: products[i].price,
              image: products[i].image,
              image: products[i].image,
              quantity: p.quantity,
              isForOrder: p.isForOrder
            }
            updateCartProducts.push(newProduct);
          }
        }
      })
    }
    let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: updateCartProducts } })
    if (cartPresent.length) {
      res.render('cart', { name: JSON.stringify(user), products: updateCartProducts })
    }
    else {
      res.render('cart', { name: JSON.stringify(user), products: [] })
    }
  }
  else {
    res.redirect('/login');
  }
}


module.exports = { showcart }