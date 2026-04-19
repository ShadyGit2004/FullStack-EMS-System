import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import bcrypt from "bcrypt";

const tempPassword = "admin09";

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if(!ADMIN_EMAIL){
            console.error("Missing Admin Email env variable");
            process.exit(1);
        }

        connectDB();

        const existingAdmin = await User.findOne({email : process.env.ADMIN_EMAIL});

        if(existingAdmin){
            console.error("User alerady exists as role", existingAdmin.role);
            process.exit(0);
        }

        const hashedPass = await bcrypt.hash(tempPassword, 10);

        const admin = await User.create({
            email: process.env.ADMIN_EMAIL,
            password : hashedPass,
            role : "ADMIN",
        });

        console.log("Admin user created");
        console.log("\nemail:",admin.email);
        console.log("\npassword:", tempPassword);
        console.log("\nchange the password after login");

        process.exit(0);
    } catch (e) {
        console.error("Seed failed:", e);        
    }
};

registerAdmin();