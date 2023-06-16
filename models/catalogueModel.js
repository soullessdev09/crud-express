const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatalogueSchema = new Schema(
  {
    category: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: false,
    },
    pic: {
      type: String,
      require: false,
    },
    desc: {
      type: String,
      require: false,
    },
    url: {
      type: String,
      require: false,
    },
    x3: {
      type: String,
      require: false,
    },
    x6: {
      type: String,
      require: false,
    },
    x9: {
      type: String,
      require: false,
    },
    x12: {
      type: String,
      require: false,
    },
    x18: {
      type: String,
      require: false,
    },
    z1: {
      type: String,
      require: false,
    },
    z3: {
      type: String,
      require: false,
    },
    z4: {
      type: String,
      require: false,
    },
    z1x6: {
      type: String,
      require: false,
    },
    z1x9: {
      type: String,
      require: false,
    },
    z1x12: {
      type: String,
      require: false,
    },
    z1x18: {
      type: String,
      require: false,
    },
    z3x6: {
      type: String,
      require: false,
    },
    z3x9: {
      type: String,
      require: false,
    },
    z3x12: {
      type: String,
      require: false,
    },
    z3x18: {
      type: String,
      require: false,
    },
    z4x6: {
      type: String,
      require: false,
    },
    z4x9: {
      type: String,
      require: false,
    },
    z4x12: {
      type: String,
      require: false,
    },
    z4x18: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catalogue", CatalogueSchema);
