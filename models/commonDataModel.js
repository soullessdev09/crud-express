const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommonDataSchema = new Schema(
  {
    tutorial_link: {
      type: String,
      require: false,
      default: "https://bit.ly/FAQ_Kredisome",
    },
    form_link: {
      type: String,
      require: false,
      default:
        "https://docs.google.com/forms/d/1Wahe_jwDqhwkqcm7_kz-XfcWvpMrz5UaPRacUFZS2cQ/edit",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CommonData", CommonDataSchema);
