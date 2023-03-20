const getProductDb = require('../DbConnect/getProductDb')

async function loadmore(req,res){
    const sze = parseInt(req.params.size);
    let finalSize = 0;
    if (sze > 14) {
      finalSize = 20
    }
    else {
      finalSize = sze;
    }
    let data = await getProductDb();
    let products = await data.find().toArray();
    if (req.session.isLogIn) {
      let user = {
        name: req.session.name,
        username: req.session.username,
        phone: req.session.phone,
        email: req.session.email,
        password: req.session.password,
      }
      res.render('root', { name: JSON.stringify(user), products: products, size: finalSize + 4 })
    }
    else {
      res.render('root', { name: JSON.stringify({}), products: products, size: finalSize + 4 })
    }
}

module.exports = {loadmore}