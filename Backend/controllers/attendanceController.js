
import Employee from "../models/empModel.js";
import Attendance from "../models/attendanceModel.js";



// clock in/out for emp
// post /api/attendance
export const clockInOut = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId : session.userId});

        if(!employee)  return res.status(404).json({error : "Employee not found"});

        if(employee.isDeleted) return res.status(403).json({error : "Your account is deactivated. you cannot clock in/out."});

        const today = new Date();
        today.setHours(0,0,0,0);

        const existing = await Attendance.findOne({
            employeeId: employee._id,
            date : today,
        })

        const now = new Date();

        if(!existing){
            const isLate = now.getHours() >= 9  && now.getMinutes() > 0;
            const attendance = await Attendance.create({
                employeeId: employee._id,
                date : today,
                checkIn : now,
                status : isLate ? "LATE" : "PRESENT",
            });

            return res.json({success : true, type : "CHECK_IN", data : attendance});
        } else if(!existing.checkOut){
            const checkInTime = new Date(existing.checkIn).getTime();
            const diffMs = now.getTime() - checkInTime;
            const diffHours = diffMs / (1000 * 60 * 60);

            existing.checkOut = now;

            // compute working hours and day type
            const workingHours = parseFloat(diffHours.toFixed(2));
            let dayType = "Half Day";
            if(workingHours >= 8) dayType = "Full Day";
            else if(workingHours >= 6) dayType = "Three Quater Day";
            else if(workingHours >= 4) dayType = "Half Day";
            else dayType = "Short Day";

            existing.workingHours = workingHours;
            existing.dayType = dayType;

            await existing.save();
            return res.json({success : true, type : "CHECK_OUT", data : existing});
        } else {
            return res.json({success : true, type : "CHECK_OUT", data : existing});
        }
    } catch (e) {
        console.log("Attendance err ->", e);        
        return res.status(500).json({error : "Operation Failed"});
    }
};


// get attendance for emp
// get /api/attendance
export const getAttendance = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId : session.userId});

        if(!employee)  return res.status(404).json({error : "Employee not found"});

        const limit = parseInt(req.query.limit || 30);
        const history = await Attendance.find({
            employeeId: employee._id,
           }).sort({date: -1}).limit(limit);

        return res.json({
            data : history,
            employee : {isDeleted : employee.isDeleted}
        });   

    } catch (e) {
        return res.status(500).json({error : "Failed to fetch attendance"});
    }
};