const getProductDb = require('../DbConnect/getProductDb')
const UserSchemaModel = require('../Schema/User')
const CartSchemaModel = require('../Schema/Cart')
const getAllProducts = require('../Services/getAllProducts')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
async function checkout(req,res){
    if (req.session.isLogIn) {
        let finalOrderList = [];
        let user = {
          name: req.session.name,
          email: req.session.email,
          username: req.session.username,
          phone: req.session.phone,
          isAdmin:req.session.isAdmin
        }
        let tofind = await getUser(req);
        let cartPresent = await getCartProducts(tofind)
        let products = await getAllProducts();
        let cartProducts = cartPresent[0].cartItems;
        if(cartProducts.length>0)
        {
          cartProducts.forEach((e)=>{
            if(e.isForOrder)
            {
              for(let i = 0;i<products.length;i++)
              {
                if(products[i].id==e.pId)
                {
                  if(products[i].quantity-e.quantity>0)
                  {
                    let updatePro = {
                      name:products[i].name,
                      image:products[i].image,
                      quantity:e.quantity,
                      details:products[i].details,
                      price:products[i].price
    
                    }
                    finalOrderList.push(updatePro);
                  }
                  break;
                }
              }
            }
          })
        }
        if (finalOrderList.length) {
          res.render('checkout', { name: JSON.stringify(user), products: finalOrderList })
        }
        else {
          res.render('checkout', { name: JSON.stringify(user), products: [] })
        }
      }
      else {
        res.redirect('/login');
      }
}

module.exports = {checkout}