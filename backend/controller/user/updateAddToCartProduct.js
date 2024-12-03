const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async(req,res)=>{
    try{
        // lay user Id
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id
        // lay so ddem trong body
        const qty = req.body.quantity
        // tim san pham voi dieu kien va cap nhap lai san pham 
        const updateProduct = await addToCartModel.updateOne({
            _id : addToCartProductId}, {
            ...(qty && {quantity : qty}) // cap nhat truong 'quantity'
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct