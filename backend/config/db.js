import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log("👉 Host:", conn.connection.host);
    console.log("👉 DB Name:", conn.connection.name); // ⭐ IMPORTANT
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;