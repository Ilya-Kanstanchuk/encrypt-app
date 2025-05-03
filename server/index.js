import express from "express";
import connectToDB from "./db/EncryptDB.js";
import cors from "cors";
import auth from "./routes/auth.js";
import encrypt from "./routes/encrypt.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/encrypt", encrypt);

app.listen(port, () => {
  connectToDB();
  console.log(`Server running on port ${port}`);
});
