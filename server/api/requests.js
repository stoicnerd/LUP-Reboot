//import { transporter } from "./email.js";
//import { axiosPOST } from "../../src/utils/axiosClient";
const axios = require("axios");
// var nodemailer = require("nodemailer");
// require("dotenv").config();
// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.user,
//     pass: process.env.pass
//   }
// });

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

router.post(
  "/:id/:newStatus",
  checkToken(["admin"]),
  async (req, res, next) => {
    try {
      let request = await Request.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.params.newStatus }
      );

      var data = {
        email: request.email,
        subject: "Regarding your lab booking",
        text: `your request for ${request.startTime} has been ${
          req.params.newStatus
        }`
      };
      await axios.post("api/email/", data).then(res => {
        console.log(res);
      });

      // var mailOptions = {
      //   from: process.env.user,
      //   to: request.email,
      //   subject: "Regarding your lab booking",
      //   text: `your request for ${request.startTime} has been ${req.params.newStatus}`
      // };
      //
      // transporter.sendMail(mailOptions, function(error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //   }
      // });

      if (req.params.newStatus === "Approved") {
        console.log("Sourav");
        let request = await Request.find({ _id: req.params.id });
        let requests = await Request.find();
        console.log(request);
        console.log(requests);
        var i;
        var requeststart = new Date(request[0].startTime);
        var requestend = new Date(request[0].endTime);
        let ids = [];
        for (i = 0; i < requests.length; i++) {
          var requestsstartDate = new Date(requests[i].startTime);
          var requestsendDate = new Date(requests[i].endTime);
          console.log(requeststart.getTime());
          console.log(requestend.getTime());
          console.log(requestsstartDate.getTime());
          console.log(requestsendDate.getTime());
          if (
            (requestsstartDate.getTime() >= requeststart.getTime() &&
              requestsstartDate.getTime() < requestend.getTime()) ||
            (requestsendDate.getTime() > requeststart.getTime() &&
              requestsendDate.getTime() <= requestend.getTime())
          ) {
            ids.push(requests[i]._id);
          }
        }
        console.log("ids", ids);
        for (i = 0; i < ids.length; i++) {
          if (ids[i] !== request[0]._id) {
            await Request.findOneAndUpdate(
              { _id: ids[i] },
              { status: "Rejected" }
            );
          }
        }
      }

      return res
        .status(200)
        .json({ msg: "Successfully " + req.params.newStatus + " the request" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Request Failed" });
    }
  }
);

module.exports = router;
