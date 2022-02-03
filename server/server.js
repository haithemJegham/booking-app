import express from "express";
// import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
import path from "path";

require("dotenv").config();

const app = express();



// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false, // not supported
    useUnifiedTopology: true,
    // useCreateIndex: true, // not supported
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const stripeRoutes = require("./routes/stripe");
app.use("/api", authRoutes);
app.use("/api", hotelRoutes);
app.use("/api", stripeRoutes);

// deployment

app.use(express.static(path.join(__dirname, "../", "client", "build")));

app.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
});

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
