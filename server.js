const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static("build"));

app.use("/build", express.static("build"));

app.get("/", (req, res) => { //Line 9
  res.sendFile("./build/index.html")
});

app.get("/express_backend", (req, res) => { //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
}); //Line 11