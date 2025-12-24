import mongoose from "mongoose";

export const connectDb = async()=>{
     try {
        const instances = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb connected ${instances.connection.host}`)
        
     } catch (error) {
         console.log(error)
     }
}