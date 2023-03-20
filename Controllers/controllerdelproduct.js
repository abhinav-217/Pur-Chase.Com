const getProductDb = require('../DbConnect/getProductDb')
async function delProd(req,res){
    let pId = req.params.pId;
    let data = await getProductDb();
    let result = data.deleteOne({ id: parseInt(pId) });
    res.redirect('/admin')
}

module.exports = {delProd}