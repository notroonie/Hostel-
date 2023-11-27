const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
        },
        firstName: {
            type:String,
            required :[true,"first name required"],
        },
        lastName: {
            type:String,
            required :[true,"last name required"],
        },
        phone: {
            type:String,
            required :[true,"phone is required"],
        },
        email: {
            type:String,
            required :[true,"email is required"],
        }
     
        // yearStudying: {
        //     type:String,
        //     required :[true,"year  is required"],
        // }
        ,
        hostelType: {
            type:String,
            required :[true,"hostel type  is required"],
        },
        
        roomNo: {
            type:String,
            required :[true,"room no  is required"],
        },
        address: {
            type:String,
            // required :[" address  is required"],
        },

        stayAddress: {
            type:String,
            required :[true," address  is required"],
        },

        leaveDate: {
            type:String,
            required :[true," date  is required"],
        },
        backDate: {
            type:String,
            required :[true," date  is required"],
        },
        gardianPhone: {
            type:String,
            required :[true," phone  is required"],
        },
        status:{
            type: String,
            default:'pending'
        }

    }
    ,
    {
        timestamps : true
    }

    
);

const studentModel = mongoose.model("students",studentSchema);
module.exports = studentModel;