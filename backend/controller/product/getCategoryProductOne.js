const productModel = require("../../models/productModel")


const getCategoryProduct = async(req,res)=>{
    try{
        // lay danh sach danh muc voi gia tri duy nhat
        const productCategory = await productModel.distinct("category")
        // hien thi danh sach
        console.log("category",productCategory)

        // Mang de luu mot san pham tu moi danh muc
        const productByCategory = []
        // Lap qua cac danh muc va tim mot san pham
        for(const category of productCategory) {
            const product = await productModel.findOne({category })

            if (product) {
                productByCategory.push(product)
                // Them san pham vao mang
            }
        }


        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryProduct