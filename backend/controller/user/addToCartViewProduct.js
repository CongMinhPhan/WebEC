const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async(req,res)=>{
    try{
        // lay userId tu req
        const currentUser = req.userId
        // tim cac san pham trong gio voi dieu kien userid  
        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  addToCartViewProduct
