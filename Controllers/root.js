const getProductDb = require('../DbConnect/getProductDb')


// const root_render = async (req,res)=>{
async function root_render(req,res){
    let data = await getProductDb();
    let products = await data.find().toArray();
    if (req.session.isLogIn) {
      let user = {
        name: req.session.name,
        username: req.session.username,
        email: req.session.email,
        phone: req.session.phone,
        isAdmin: req.session.isAdmin
      }
      res.render('root', { name: JSON.stringify(user), products: products, size: 4 })
    }
    else {
      res.render('root', { name: JSON.stringify({}), products: products, size: 4 })
    }
}

module.exports = root_render;