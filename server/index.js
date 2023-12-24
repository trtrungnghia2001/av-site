import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import actorRoute from "./routes/actor.route.js";
import websiteRoute from "./routes/website.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static('public'))
app.listen(port, () => {
  console.log("server running port", port);
});


app.use('/actor', actorRoute)
app.use('/website', websiteRoute)