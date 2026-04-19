import {Router} from "express";
import { protect } from "../middleware/auth.js";
import { clockInOut, getAttendance } from "../controllers/attendanceController.js";


const attendanceRouter = Router();

attendanceRouter.get("/", protect, clockInOut);
attendanceRouter.post("/", protect, getAttendance);

// attendanceRouter.route("/").get(protect, clockInOut)
// .post(protect, getAttendance);

export default attendanceRouter;