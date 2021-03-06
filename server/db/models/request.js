const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      index: true
    },
    status: {
      type: String,
      required: true
    }, // ['Approved', 'Rejected', 'Waiting', 'Requested', 'Cancelled']
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

mongoose.model("Request", requestSchema);
