var nodemailer = require("nodemailer");
require("dotenv").config();

const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Request = mongoose.model("Request");

router.post("/", async (req, res, next) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    var mailOptions = {
      from: process.env.user,
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

module.exports = router;
