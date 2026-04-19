import {Router} from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createLeave, getLeaves, updateLeaveStatus  } from "../controllers/leaveController.js";

const leaveRouter = Router();

leaveRouter.get("/", protect, getLeaves);
leaveRouter.post("/", protect, createLeave);
leaveRouter.patch("/:id", protect, protectAdmin, updateLeaveStatus);

export default leaveRouter;