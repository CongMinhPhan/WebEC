const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function updateProductController(req,res){
    try{
        // Kiem tra quyen cua nguoi dung
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
        // Lay id va du lieu moi resbody
        const { _id, ...resBody} = req.body
        // tim san pham bang id va cap nhap voi du lieu resBody
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        
        res.status(200).json({
            message : "Product update successfully",
            data : updateProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.status(401).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateProductController