const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes 
app.use("/api/v1/user", require("./routes/userroutes"));
app.use("/api/v1/admin", require("./routes/adminroutes"));


// const attendanceRoutes = require('./routes/attendanceRoutes');
// app.use("/api/v1/attendance", require("./routes/attendanceroutes"));

//port
const port = process.env.PORT || 8080

//listen 
app.listen(port,()=>{
    console.log( 

       ` Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
    );
});
