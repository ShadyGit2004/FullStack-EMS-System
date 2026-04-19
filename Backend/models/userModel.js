import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["ADMIN", "EMPLOYEE"],
        default : "EMPLOYEE",
    }
}, {timestamps : true});

const User = mongoose.model.User || mongoose.models("User", userSchema);

export default User;