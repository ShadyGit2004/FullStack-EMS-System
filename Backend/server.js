import express from "express";
import cors from "cors";
import "dotenv/config";
import multer  from "multer";

import connectDB from "./config/db.js"
import employeesRouter from "./routes/empRoutes.js"
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(multer().none());

// Routes
app.get("/",(req, res)=>{res.send("Welcome home")});
app.use("/api/auth", authRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/dashboard", dashboardRouter);
// app.use("/api/payslips", payslipRouter);

// app.get('*', (req, res) => {
//     res.redirect("/api/dashboard");
// });

connectDB();

app.listen(PORT, ()=>{
    console.log("Server is listening to port", PORT);
});