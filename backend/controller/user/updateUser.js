const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        // lay userId tu req
        const sessionUser = req.userId
        // lay userId, email, name, role tu req
        const { userId , email, name, role} = req.body
        // tao moi doi tuong
        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }
        // tim nguoi dung trong  sess
        const user = await userModel.findById(sessionUser)

        console.log("user.role",user.role)



        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "User Updated",
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


module.exports = updateUser