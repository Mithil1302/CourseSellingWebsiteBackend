import express from "express"; 
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { coursesRouter } from "./routes/courses.js";
import dotenv from "dotenv"
dotenv.config()// Yeh ek hi baar karna padta hai no need to do baar baar.


mongoose.connect(process.env.MONGO_URL)

//  We are using it as a middleware in here,.use() hai yaad rakhna.

const app = express();

app.use(express.json());


app.use("/user",userRouter)

app.use("/admin",adminRouter)

app.use("/",coursesRouter)

// Add static file serving
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// Fallback to index.html for SPA routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/api",(req,res) => {
  res.send("hi user");
})



app.listen(3000,() => {
  console.log(`http://localhost:3000/`)
})