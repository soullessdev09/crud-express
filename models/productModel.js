const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter product name"],
    },
    quantity: {
      type: Number,
      require: [true, "Please enter product quantity"],
      default: 0,
    },
    price: {
      type: Number,
      require: [true, "Please enter product price"],
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
