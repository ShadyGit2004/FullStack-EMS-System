import Employee from "../models/empModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get Employees
// Get / api/employees
export const getEmployees = async (req, res) => {
    try {
        const {department} = req.query;
        const where = {}
        if(department) where.department = department;

        const employees = await Employee.find(where).sort({createdAt: -1}).populate("userId", "email role").lean();
        
        const result = employees.map((emp)=>({
            ...emp,
            id: emp._id.toString(),
            user : emp.userId ? {email: emp.userId.email, role : emp.userId.role} : null,
        }));
        return res.json(result);
    } catch (e) {
        console.log("Get emp err ->", e.message);        
        return res.status(500).json({error: "Failed to fetch employees"})
    }
};

// Create Employees
// Post / api/employees
export const createEmployee = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, position, basicSalary, allowances, deductions, password, joinDate, bio, department, role} = req.body;
        
        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({error: "Missing required fields"});
        };

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashed,
            role: role || "EMPLOYEE",
        });

        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            bio: bio || "",
            joinDate : new Date(joinDate),
        });

        return res.status(201).json({success: true, employee});
    } catch (e) {
        if(e.code === 11000){
            return res.status(400).json({error: "Email already exists"});
        }
        console.log("Create Emp err -", e)
        return res.status(500).json({error: "Failed to create employee"})
    }
};

// Update Employees
// Put / api/employees/:id
export const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, email, phone, position,basicSalary, allowances, deductions, password, employmentStatus, bio, department, role} = req.body;
 
        const employee = await Employee.findById(id);
        if(!employee) return res.status(400).json({error: "Employee not found"});

        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            position,
            employmentStatus: employmentStatus || "ACTIVE",
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            bio: bio || "",
        });
        
        // update user data
        const userUpdate = {email};
        if(role) userUpdate.role = role;
        if(password) userUpdate.password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(employee.userId, userUpdate);

        return res.json({success: true});
    } catch (e) {
        if(e.code === 11000){
            return res.status(400).json({error: "Email already exists"});
        }
        console.log("update Emp err -", e)
        return res.status(500).json({error: "Failed to update employee"})
    }
};

// Delete Employees
// Delete / api/employees/:id
export const deleteEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({error: "Employee not found"});

        employee.isDeleted = true;
        employee.employmentStatus = "INACTIVE";
        await employee.save();

        return res.json({success: true});
    } catch (e) {
        console.log("delete Emp err -", e)
        return res.status(500).json({error: "Failed to delete employee"})
    }
};