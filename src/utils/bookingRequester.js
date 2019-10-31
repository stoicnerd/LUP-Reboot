const axios = require("axios");
const _ = require("underscore");
const moment = require("moment");

let sendBookingRequest = (bookingReqData, callback) => {
  let date = bookingReqData.date;
  let year = date && date.getYear();
  let month = date && date.getMonth();
  let dow = date && date.getDate();
  let start = moment(bookingReqData.start);
  start.set("year", year);
  start.set("month", month);
  start.set("date", dow);
  start.subtract(1, "s");
  let end = moment(bookingReqData.end);
  end.set("year", year);
  end.set("month", month);
  end.set("date", dow);
  if (start.valueOf() > end.valueOf()) {
    callback(true, null);
    return;
  }
  let apiUrl = encodeURI(
    "https://www.googleapis.com/calendar/v3/calendars/jcfou0m3vvss5hummvkne70d70@group.calendar.google.com/events?singleEvents=true&orderBy=startTime&key=AIzaSyDIHuFkitKN5-CzNR-hVsLG4yM9CuYRg4I&timeMin=" +
      start.toISOString() +
      "&timeMax=" +
      end.toISOString()
  );
  console.log(apiUrl);
  axios.get(apiUrl).then(response => {
    if (response.status === 200) {
      let events = response.data.items;
      if (events.length === 0) {
        console.log("This booking request is valid");
        callback(null, events.length);
      } else {
        console.log("This booking request is invalid");
        callback(null, events.length);
      }
    } else {
      callback(true, null);
    }
  });
  // .catch(error => {
  //   callback(error, null);
  // });
};

module.exports = { sendBookingRequest };
