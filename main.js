const express = require('express')
const app = express()
const port = 3000
const getUserDb = require('./DbConnect/getUserDb');
const session = require('express-session')
const ejs = require('ejs')
const root_render = require("./Router/root")
const login_route = require("./Router/routerlogin")
const signup_route = require("./Router/routersignup")
const reset_route = require("./Router/routerreset")
const verify_route = require("./Router/routerverify")
const forgot_route = require("./Router/routerforgot")
const forgotVerify_route = require("./Router/routerverifyforgot")
const loadmore_route = require("./Router/routerloadmore")
const addtocart_route = require("./Router/routeraddtocart")
const cart_route = require("./Router/routercart")
const increase_route = require("./Router/routerincrease")
const getProduct_route = require("./Router/routergetproduct")
const deleteCartItem_route = require("./Router/routerdelitem")
const admin_route = require("./Router/routeradmin")
const update_route = require("./Router/routerupdate")
const delProduct_route = require("./Router/routerdelproduct")
const admin_addproduct_route = require("./Router/routeradminaddproduct")
const sortProducts_route = require("./Router/routersortProduct")
const searchCart_route = require('./Router/routersearchCart')
const checkout_route = require("./Router/routercheckout")
const markForOrder_route = require("./Router/routermarkForOrder")
const logout_route = require("./Router/routerlogout")
const userAccount_route = require("./Router/routeruserAccount")
const openProduct_route = require("./Router/routeropenproduct")

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(session({secret: 'keyboard is a dog',resave: false,saveUninitialized: true}))

getUserDb();

app.use("/",root_render);
app.use("/login",login_route);
app.use("/signup",signup_route);
app.use("/reset",reset_route);
app.use("/verify",verify_route)
app.use("/forgot",forgot_route)
app.use("/verifyF",forgotVerify_route)
app.use("/loadMoreProducts/:size",loadmore_route)
app.use("/addtocart",addtocart_route)
app.use('/cart',cart_route)
app.use('/increase',increase_route)
app.use('/getproducts',getProduct_route)
app.use('/deleteitem',deleteCartItem_route)
app.use('/admin',admin_route)
app.use('/update',update_route)
app.use('/deleteProduct',delProduct_route)
app.use('/sortProducts',sortProducts_route)
app.use('/addproduct',admin_addproduct_route)
app.use('/sortProducts',sortProducts_route)
app.use('/searchCart',searchCart_route)
app.use('/checkout',checkout_route)
app.use('/markForOrder',markForOrder_route)
app.use('/logout',logout_route)
app.use('/userAccount',userAccount_route)
app.use('/openProduct',openProduct_route)

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})