const {User} = require("../models")
const { Op } = require("sequelize");
const ApiError = require('../utils/ApiError')
const register = async(data)=>{
    const found = await findOne({ where: { email: data.email } })
    if(found.length!=0){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');
    }
    const result = await User.create(data);
    return result
}

const login = async(data)=>{
    const result = await User.findOne({where: { email: data.email }})
if(result.length==0){
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
}
if(result.role!=data.role){
    throw new ApiError(httpStatus.BAD_REQUEST, 'unauthorized user');
}
    var passwordIsValid = bcrypt.compareSync(
        data.password,
        result.password
    );
    if (!passwordIsValid) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect Password');
    }
    var token = jwt.sign({ email: result.email,uid:result.uid }, "jwtsecret", {
        expiresIn: 2592000 // 30 days
    });
    // console.log(token)
    return {result,token} 
}

const allUsers = async()=>{
    const result = await User.findAll({},{attributes: ["name", "email", "mobile", "status", "role"],})
    return result
}
module.exports = {
    register,
    login,
    allUsers
}