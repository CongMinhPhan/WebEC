const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
// xây dựng URL động cho API tải lên hình ảnh của Cloudinary
const uploadImage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")
    // them anh

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })
    // Hàm này fetchgửi POSTyêu cầu đến API Cloudinary với nội dung

    return dataResponse.json()

}

export default uploadImage 