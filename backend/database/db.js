import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"pinterest"
        });
        console.log('Connection to DB successful');
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;