const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Request = mongoose.model("Request");

router.get("/:id", async (req, res, next) => {
  try {
    let request = await Request.findOneAndUpdate(
      { _id: req.params.id },
      { status: "Waitlisted" }
    );

    return res.status(200).json({ msg: "Successfully waitlisted the request" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request Failed" });
  }
});

module.exports = router;
