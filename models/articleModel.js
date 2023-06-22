const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      default: "",
    },
    body: {
      type: String,
      require: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
