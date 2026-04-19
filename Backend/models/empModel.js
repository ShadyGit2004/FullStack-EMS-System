import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/department.js";

const empSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref:"User" , required: true, unique: true},
    firstName : {type: String, required : true},
    lastName : {type: String, required : true},
    email : {type: String, required : true},    
    phone : {type: String, required : true},    
    position : {type: String, required : true},    
    basicSalary : {type: Number, default:0},    
    allowances : {type: Number, default:0},    
    deductions : {type: Number, default:0},    
    employmentStatus : {type : String, enum : ["ACTIVE", "INACTIVE"], default : "ACTIVE", },   
    joinDate : {type: Date, required : true},        
    isDeleted : {type: Boolean, default: false},   
    bio : {type: String, default: ""},   
    department: {type: String, enum: DEPARTMENTS}

}, {timestamps : true});

const Employee = mongoose.model.Employee || mongoose.models("Employee", empSchema);

export default Employee;