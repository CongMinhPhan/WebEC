const productModel = require("../../models/productModel")

const filterProductController = async(req,res)=>{
 try{
        // lay danh sach danh muc
        const categoryList = req?.body?.category || []
        // tim danh muc tu danh sach danh muc
        const product = await productModel.find({
            category :  {
                "$in" : categoryList
            }
        })

        res.json({
            data : product,
            message : "product",
            error : false,
            success : true
        })
 }catch(err){
    res.json({
        message : err.message || err,
        error : true,
        success : false
    })
 }
}


module.exports = filterProductController