const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Catalogue = require("./models/catalogueModel");
const Banner = require("./models/bannerModel");
const app = express();
const mongo_url =
  "mongodb+srv://nerogama93:2ifA2s7NusdBmc9k@cluster0.xkuwbhh.mongodb.net/Node-API?retryWrites=true&w=majority";

app.use(express.json());
// app.use(express.urlencoded({extended: false})) //to use form data

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/guthib", (req, res) => {
  res.send("Hello Word, you splelled it worng");
});

// Product API

app.get("/products", async (req, res) => {
  try {
    const allproduct = await Product.find({});
    res.status(200).json(allproduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} not found in database` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} not found in database` });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Catalogue API

app.get("/catalogues", async (req, res) => {
  try {
    const allcatalogue = await Catalogue.find({});
    res.status(200).json(allcatalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const catalogue = await Catalogue.findById(id);
    res.status(200).json(catalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/catalogue", async (req, res) => {
  try {
    const catalogue = await Catalogue.create(req.body);
    res.status(200).json(catalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const catalogue = await Catalogue.findByIdAndUpdate(id, req.body);
    if (!catalogue) {
      return res
        .status(404)
        .json({ message: `Catalogue with ID: ${id} not found in database` });
    }
    const updatedCatalogue = await Catalogue.findById(id);
    res.status(200).json(updatedCatalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const catalogue = await Catalogue.findByIdAndDelete(id);
    if (!catalogue) {
      return res
        .status(404)
        .json({ message: `Catalogue with ID: ${id} not found in database` });
    }
    res.status(200).json(catalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Banner API

app.get("/banners", async (req, res) => {
  try {
    const allbanner = await Banner.find({});
    res.status(200).json(allbanner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const banner = await Banner.findById(id);
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/banner", async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const banner = await Banner.findByIdAndUpdate(id, req.body);
    if (!banner) {
      return res
        .status(404)
        .json({ message: `Banner with ID: ${id} not found in database` });
    }
    const updatedBanner = await Banner.findById(id);
    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res
        .status(404)
        .json({ message: `Banner with ID: ${id} not found in database` });
    }
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to mongo db");
    app.listen(3000, () => {
      console.log("Node api is running, on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
