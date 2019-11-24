const express = require("express");
const router = express.Router();

const auth = require("./auth");
const requests = require("./requests");
const events = require("./events");
const email = require("./email");
const checkToken = require("./authMiddleware");
const softwareRequests = require("./softwareRequests");
const waitlist = require("./waitlist");
router.all("/", (req, res, next) => {
  console.log(`${req.method} for ${req.url}`);
  next();
});

router.use("/auth", auth);
router.use("/requests", requests);
router.use("/events", events);
router.use("/softwareRequests", softwareRequests);
router.use("/email", email);
router.use("/waitlist", waitlist);
module.exports = router;
