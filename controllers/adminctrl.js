const userModel = require("../models/userModel");
const leaveModel = require("../models/leaveModel")

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAlleavesController = async (req, res) => {
  try {
    const students = await leaveModel.find({});
    res.status(200).send({
      success: true,
      message: "leave  data list",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching leaves",
      error,
    });
  }
  
};


const updateStatusController =async(req,res) =>{

  try{
    const {leaveId ,status}=req.body
    const leave = await leaveModel.findByIdAndUpdate(leaveId,{status})
    const user = await userModel.findOne({ _id: leave.userId});
    const notification=user.notification;
    notification.push({
      type:"status updated ",
      message :`Your leave has been approved   ${status}`,
      onClickPath :"/user/leavelist",
    });
    await user.save();
    res.status(200).send({
      success:true,
      message :"leave updated"
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success :false,
      error,
      message :'Error in update status'
    })
  }

}






module.exports ={getAllUsersController,getAlleavesController ,updateStatusController}