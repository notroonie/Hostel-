const { loginController, 
    
    registerController ,authController,applyLeaveController,getAllNotificationController,deleteAllNotificationController} =
     require("../controllers/userctrl");

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router()
//routes : login post 

router.post("/login",loginController);

//routes : register post 
router.post("/register",registerController);

router.post("/getUserData",authMiddleware,authController)

router.post("/applyleave",authMiddleware,applyLeaveController);

router.post("/getallnotification",authMiddleware,getAllNotificationController);

router.post("/deleteallnotification",authMiddleware,deleteAllNotificationController);





module.exports = router