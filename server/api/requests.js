// import { transporter } from "./email.js";
// import { axiosPOST } from "../../src/utils/axiosClient";
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
  checkToken(["notAdmin", "admin"]),
  async (req, res, next) => {
    try {
      let request = await Request.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.params.newStatus }
      );
      console.log(process.env.user);
      console.log(process.env.pass);
      console.log(request);

      var data = {
        email: request.email,
        subject: "Regarding your lab booking",
        text: `your request for ${request.startTime} has been ${
          req.params.newStatus
        }`
      };
      // await axios.post("api/email/", data).then(res => {
      //   console.log(res);
      // });

      var mailOptions = {
        from: process.env.user,
        to: request.email,
        subject: "Regarding your lab booking",
        text: `your request for ${request.startTime} has been ${
          req.params.newStatus
        }`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      if (req.params.newStatus === "Cancelled") {
        let approvedRequests = await Request.find({ status: "Approved" });
        let waitlistedRequests = await Request.find({ status: "Waitlisted" });
        for (var i = 0; i < waitlistedRequests.length; i++) {
          var waitstart = new Date(waitlistedRequests[i].startTime);
          var waitend = new Date(waitlistedRequests[i].endTime);
          var x = 0;
          for (var j = 0; j < approvedRequests.length; j++) {
            var approvestart = new Date(approvedRequests[j].startTime);
            var approveend = new Date(approvedRequests[j].endTime);
            if (
              (approvestart.getTime() >= waitstart.getTime() &&
                approvestart.getTime() < waitend.getTime()) ||
              (waitstart.getTime() > approvestart.getTime() &&
                waitstart.getTime() <= approveend.getTime())
            ) {
              x = 1;
            }
          }
          if (x === 0) {
            await Request.findOneAndUpdate(
              { _id: waitlistedRequests[i]._id },
              { status: "Requested" }
            );
          }
        }
      }
      if (req.params.newStatus === "Approved") {
        let request = await Request.find({ _id: req.params.id });
        let requests = await Request.find();
        console.log("request", request);
        console.log("requests", requests);
        var i;
        var requeststart = new Date(request[0].startTime);
        var requestend = new Date(request[0].endTime);
        let ids = [];
        for (i = 0; i < requests.length; i++) {
          var requestsstartDate = new Date(requests[i].startTime);
          var requestsendDate = new Date(requests[i].endTime);
          if (
            (requestsstartDate.getTime() >= requeststart.getTime() &&
              requestsstartDate.getTime() < requestend.getTime()) ||
            (requeststart.getTime() > requestsstartDate.getTime() &&
              requeststart.getTime() <= requestsendDate.getTime())
          ) {
            if (requests[i].status === "Requested") {
              ids.push(requests[i]._id);
            }
          }
        }
        console.log("ids", ids);
        for (i = 0; i < ids.length; i++) {
          console.log("ids[i]", ids[i]);
          console.log("request[0]._id", request[0]._id);
          if (ids[i] !== request[0]._id) {
            let tmp = await Request.findOneAndUpdate(
              { _id: ids[i] },
              { status: "Rejected" }
            );
            mailOptions = {
              from: process.env.user,
              to: tmp.email,
              subject: "Regarding your lab booking",
              html:
                "<p>your request for Lab booking from " +
                tmp.startTime +
                " to " +
                tmp.endTime +
                ' has been rejected and the slot has been alloted to someone else. If you wish to be enlisted in the waitlist please click the following link :- Click <a href="http://localhost:4000/api/waitlist/' +
                tmp._id +
                '">here</a> to be added to the waitlist</p>'
            };
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
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
