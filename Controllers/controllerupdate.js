const UserSchemaModel = require('../Schema/User')
const getProductDb = require('../DbConnect/getProductDb')
async function update(req,res){
    let pId = req.body.id;
    let details = req.body.details;
    let name = req.body.name;
    let price = req.body.price;
    let data = await getProductDb();
    let products = await data.find({ id: parseInt(pId) }).toArray();
    let update = await data.updateOne(
      { id: parseInt(pId) },
      {
        $set: {
          name: name,
          price: parseFloat(price),
          details: details
        }
      }
    )
    if (update.modifiedCount) {
      let myStatus = {
        value: 1
      }
      res.json(myStatus)
    }
    else {
      res.send({})
      return;
    }
}

module.exports = {update}