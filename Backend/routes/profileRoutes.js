import {Router} from "express";
import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";


const profileRouter = Router();

profileRouter.get("/", protect, getProfile);
profileRouter.post("/", protect, updateProfile);

// profileRouter.route("/").get(protect, getProfile)
// .post(protect, updateProfile);

export default profileRouter;