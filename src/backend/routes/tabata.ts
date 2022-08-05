import { NextFunction, RequestHandler, Response } from "express";
import tabata, { defaultTabataSettings } from "../data/tabata";

const
  express = require("express"),
  router = express.Router();

router.use(function timeLog(req: RequestHandler, res: Response, next: NextFunction) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req: RequestHandler, res: Response) => {
  res.send({
    data: tabata
  });
});

router.get("/default", (req: RequestHandler, res: Response) => {
  res.send({
    data: defaultTabataSettings
  });
});

module.exports = router;