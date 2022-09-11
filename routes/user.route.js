const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller')
const auth= require('../middleware/auth')

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get('/getUser/uid',auth, userController.getUser)
router.get('/allusers',userController.allUsers)


module.exports = router;
