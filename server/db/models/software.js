const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const softwareSchema = new Schema(
  {
    name: { type: String, required: true },
    systemNo: {
      type: [Number],
      required: true
    }
  },
  {
    timestamps: true
  }
);

mongoose.model("Software", softwareSchema);
