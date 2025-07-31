import express from "express"; 
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { coursesRouter } from "./routes/courses.js";
import dotenv from "dotenv"
dotenv.config()// Yeh ek hi baar karna padta hai no need to do baar baar.

mongoose.connect(process.env.MONGO_URL)

const app = express();

// Enable CORS for frontend communication
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(express.json());

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/",coursesRouter)

app.get("/",(req,res) => {
  res.json({ message: "Course Selling App API is running!" });
})

app.listen(3000,() => {
  console.log(`Backend server running at http://localhost:3000/`)
})