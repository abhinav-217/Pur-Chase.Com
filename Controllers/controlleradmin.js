const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../Services/getAllProducts')
async function openAdmin(req, res) {
  let products = await getAllProducts();
  if (req.session.isAdmin) {
    let user = {
      name: req.session.name,
      username: req.session.username,
      email: req.session.email,
      phone: req.session.phone,
      isAdmin: req.session.isAdmin
    }
    res.render('admin', { name: JSON.stringify(user), products: products, size: 4 })
  }
  else {
    res.redirect('/login')
  }
}


module.exports = { openAdmin }