
import Employee from "../models/empModel.js";

// get profile
// Get /api/profile
export const getProfile = async (req, res) => {

    try {
        const session = req.session;
        const employee = await Employee.findOne({userId : session.userId});

        if(!employee) {
            // Authenticated user is not an emp - return admin profile
            return res.json({
                firstName: "Admin",
                lastName: "",
                email: session.email,
            })
        }
        return res.json(employee);
    } catch (e) {
        return res.status(500).json({error : "Failed to fetch profile"});
    }
};


// Update profile
// put /api/profile
export const updateProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId : session.userId});

        if(!employee)  return res.status(404).json({error : "Employee not found"});

        if(employee.isDeleted) return res.status(403).json({error : "Your account is deactivated. you cannot update your profile."});

        await Employee.findByIdAndUpdate(employee._id, {bio : req.body.bio});

        return res.json({success : true});
    } catch (e) {
        return res.status(500).json({error : "Failed to update profile"});
    }
};
