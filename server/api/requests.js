const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Request = mongoose.model("Request");

router.get("/", checkToken("admin"), async (req, res, next) => {
  try {
    let requests = [];
    requests = await Request.find({ status: "Requested" });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

router.get("/:email", checkToken("notAdmin"), async (req, res, next) => {
  try {
    let requests = [];
    requests = await Request.find({ email: req.params.email });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

router.post("/", checkToken(["notAdmin", "admin"]), async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ msg: "Supply a name in request body" });
  if (!req.body.email)
    return res.status(400).json({ msg: "Supply a email in request body" });
  if (!req.body.status)
    return res.status(400).json({ msg: "Supply a status in request body" });
  if (!req.body.startTime)
    return res.status(400).json({ msg: "Supply a startTime in request body" });
  if (!req.body.endTime)
    return res.status(400).json({ msg: "Supply a endTime in request body" });
  if (!req.body.description)
    return res
      .status(400)
      .json({ msg: "Supply a description in request body" });
  try {
    let newRequestData = {
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description
    };
    await Request.create(newRequestData);
    return res
      .status(200)
      .json({ msg: "Successfully inserted the request", newRequestData });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request Failed" });
  }
});

module.exports = router;
