const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const softwareRequestSchema = new Schema(
  {
    requesterName: String,
    requesterEmail: {
      type: String,
      index: true
    },
    softwareName: {
      type: String,
      index: true
    },
    softwareLink: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }, // ['Approved', 'Rejected', Requested']
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

mongoose.model("SoftwareRequest", softwareRequestSchema);
