const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Software = mongoose.model("Software");

router.get("/", async (req, res, next) => {
  try {
    let softwares = [];
    softwares = await Software.find();
    return res.status(200).json(softwares);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Software failed" });
  }
});

module.exports = router;
