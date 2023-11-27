const express = require("express");
const {
  getAllUsersController,getAlleavesController,updateStatusController
 
} = require("../controllers/adminctrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUser", authMiddleware, getAllUsersController);
router.get("/getLeaves", authMiddleware, getAlleavesController);

router.post('/updatestatus',authMiddleware,updateStatusController);



module.exports = router;