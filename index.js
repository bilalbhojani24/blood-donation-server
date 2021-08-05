import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js";
import DonorRoutes from "./routes/donor.js";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extented: true }));
app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes);
app.use("/donor", DonorRoutes);
// Test route
app.get("/test", (req, res) => {
  res.send("Hello to Blood Donation!!");
});

mongoose
  .connect(process.env.MOONGOOSE_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("CONNECTION ERROR =>", error);
  });

mongoose.set("useFindAndModify", false);
