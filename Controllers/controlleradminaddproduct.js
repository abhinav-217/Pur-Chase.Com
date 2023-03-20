const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../Services/getAllProducts')
const multer = require('multer')
const maxSize = 0.25 * 1000 * 1000;
const path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + Date.now());
    }
  });
  var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    },
    limits: { fileSize: maxSize }
  })
async function get_addProd(req,res){
    if (req.session.isAdmin) {
        let user = {
          name: req.session.name,
          username: req.session.username,
          email: req.session.email,
          phone: req.session.phone,
          isAdmin:req.session.isAdmin
        }
        res.render('addproduct', { name: JSON.stringify(user), err: "" })
      }
      else if (req.session.isLogIn) {
        res.redirect('/');
      }
      else {
        res.redirect('/login');
      }
}

async function post_addProd(req,res){
    upload.single('photo')(req, res, async function (err) {
        if (err) {
          let user = {
            name: req.session.name,
            username: req.session.username,
            email: req.session.email,
            phone: req.session.phone,
          }
          return res.render('addproduct', { name: JSON.stringify(user), err: "Product Cannot be added check the size of image" })
        
        }
        let data = await getProductDb();
        let products = await getAllProducts();
        let mx = -1;
        products.forEach((p) => {
          if (p.id > mx) {
            mx = p.id;
          }
        })
        let newProduct = {
          id: mx + 1,
          name: req.body.Pname,
          details: req.body.Pdescription,
          image: req.file.filename,
          price: req.body.Pprice,
          quantity: req.body.Pquantity
        }
        let result = await data.insertOne(newProduct);
        res.redirect('/admin')
      });
}
module.exports = {get_addProd,post_addProd}