import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;
