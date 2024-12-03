const productModel = require("../../models/productModel")

const getProductDetails = async(req,res)=>{
    try{
        // lay thon tin proID tu boy req
        const { productId } = req.body
        // tim San Pham qua ID
        const product = await productModel.findById(productId)

        res.json ({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })
    }
    catch(err) {
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails