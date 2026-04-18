import mongoose from "mongoose";

function connectDB() {
   mongoose.connect(process.env.MONGODB_CONN)
  .then(() => console.log('Connected to DB!'))
  .catch((e)=> console.log("Error -> ", e.message));
}
 
export default connectDB;
