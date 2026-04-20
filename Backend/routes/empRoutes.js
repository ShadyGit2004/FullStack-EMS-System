import {Router} from "express";
import {getEmployees, createEmployee, updateEmployee, deleteEmployee} from "../controllers/empController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const employeesRouter = Router();

// employeesRouter.route("/").get(protect, protectAdmin, getEmployees)
// .post(protect, protectAdmin, createEmployee);

// employeesRouter.route("/:id").put(protect, protectAdmin ,updateEmployee)
// .delete(protect, protectAdmin, deleteEmployee)

employeesRouter.get("/", protect, protectAdmin, getEmployees);
employeesRouter.post("/", protect, protectAdmin, createEmployee);
employeesRouter.put("/:id", protect, protectAdmin, updateEmployee);
employeesRouter.delete("/:id", protect, protectAdmin, deleteEmployee);

export default employeesRouter;