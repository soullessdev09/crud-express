const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    url: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", BannerSchema);
