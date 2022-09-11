const httpstatus = require('http-status')
const  userService  = require('../service/user.service')
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const {User} = require("../models")
const register = catchAsync(async(req,res)=>{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(re.test(req.body.password)==false){
        res.status(501).send("Password must be 1 capital letter, special char and number")
        return
    }
    const data = {
        uid:req.body.uid,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:bcrypt.hashSync(req.body.password),
        role:req.body.role,
        status:req.body.status
    }
    const result = await userService.register(data)
    res.status(200).send({message:"Account Successfully Created", data:result})
})

const login= catchAsync(async(req,res)=>{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(re.test(req.body.password)==false){
        res.status(501).send("Password must be 1 capital letter, special char and number")
        return
    }
    const data = {
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    }
    const result = await userService.login(data);
    res.status(200).send({message:"User Login Successfully", data:result.result, token:result.token})
})

const getUser = catchAsync(async(req,res)=>{
    req.params.uid=req.user.uid
    // req.params.uid=uId
    const result = await User.findOne({where:{uid:req.params.uid}})
    res.status(200).send(result)
})
const allUsers = catchAsync(async(req,res)=>{
    const result = await userService.allUsers();
    res.status(200).send(result)
})
module.exports = {
    register,
    login,
    getUser,
    allUsers
}