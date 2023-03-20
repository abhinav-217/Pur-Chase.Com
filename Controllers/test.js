const testingFunction1 = async(req,res)=>{
    res.send("Hey this is testing function 1")
}


const testingFunction2 = async(req,res)=>{
    res.send("Hey this is testing function 2")
}


module.exports = {testingFunction1,testingFunction2}