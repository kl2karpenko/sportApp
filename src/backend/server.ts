import { RequestHandler, Response } from "express";
const hiitRoutes = require("./routes/hiit");
const tabataRoutes = require("./routes/tabata");
const cardioRoutes = require("./routes/cardio");

const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static("build"));

app.use("/build", express.static("build"));

app.get("/", (req: RequestHandler, res: Response) => { //Line 9
  res.sendFile("./build/index.html")
});

app.use("/api/hiit", hiitRoutes);
app.use("/api/tabata", tabataRoutes);
app.use("/api/cardio", cardioRoutes);