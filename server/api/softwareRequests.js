const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
require("dotenv").config();
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const SoftwareRequest = mongoose.model("SoftwareRequest");

router.get("/", checkToken("admin"), async (req, res, next) => {
  try {
    let requests = [];
    requests = await SoftwareRequest.find({ status: "Requested" });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

router.post("/", checkToken(["notAdmin"]), async (req, res, next) => {
  if (!req.body.requesterName)
    return res
      .status(400)
      .json({ msg: "Supply a requesterName in request body" });
  if (!req.body.requesterEmail)
    return res
      .status(400)
      .json({ msg: "Supply a requesterEmail in request body" });
  if (!req.body.softwareName)
    return res
      .status(400)
      .json({ msg: "Supply a softwareName in request body" });
  if (!req.body.softwareLink)
    return res
      .status(400)
      .json({ msg: "Supply a softwareLink in request body" });
  if (!req.body.status)
    return res.status(400).json({ msg: "Supply a status in request body" });
  if (!req.body.description)
    return res
      .status(400)
      .json({ msg: "Supply a description in request body" });
  try {
    let newSoftwareRequestData = {
      requesterName: req.body.requesterName,
      requesterEmail: req.body.requesterEmail,
      softwareName: req.body.softwareName,
      softwareLink: req.body.softwareLink,
      status: req.body.status,
      description: req.body.description
    };
    await SoftwareRequest.create(newSoftwareRequestData);
    return res.status(200).json({
      msg: "Successfully inserted the request",
      newSoftwareRequestData
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request Failed" });
  }
});

router.post(
  "/:id/:newStatus",
  checkToken(["admin"]),
  async (req, res, next) => {
    try {
      let request = await SoftwareRequest.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.params.newStatus }
      );
      var mailOptions = {
        from: process.env.user,
        to: request.requesterEmail,
        subject: "Regarding your software installation request",
        text: `your software installation request for ${
          request.softwareName
        } has been ${req.params.newStatus}`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.status(200).json({
        msg: "Successfully " + req.params.newStatus + " the software request"
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Request Failed" });
    }
  }
);

module.exports = router;
