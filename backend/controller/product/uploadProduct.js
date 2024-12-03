const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");


const UploadProductController = async (req, res) => {
    try {
        // Lay userID tu req
        const sessionUserId = req.userId;
        // Ham kiem tra quyen
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Lưu sản phẩm vào cơ sở dữ liệu
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        // Lấy _id của sản phẩm vừa lưu
        const productId = saveProduct._id;

        
        res.status(200).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });

    } catch (err) {
        res.status(401).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = UploadProductController;
