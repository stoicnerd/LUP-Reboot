const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Request = mongoose.model("Request");

router.get("/", checkToken("notAdmin"), async (req, res, next) => {
  try {
    let requests = [];
    requests = await Request.find({ status: "Requested" });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

module.exports = router;
