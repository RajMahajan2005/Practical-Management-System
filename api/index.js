import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/database.js";
import router from "../routes/daw.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/", router);

dbConnect();
  
app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

app.get("/",(req,res)=>{
  res.json({
    success:true,
    message:"Server Running Successfully"
  })
});
