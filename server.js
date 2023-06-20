const express = require("express");
const mongoose = require("mongoose");
const Catalogue = require("./models/catalogueModel");
const Banner = require("./models/bannerModel");
const Common = require("./models/commonDataModel");
const cors = require("cors");
const app = express();
const mongo_url =
  "mongodb+srv://kreduit:XDMgV9rww96wiKSH@cluster0.adkgvov.mongodb.net/?retryWrites=true&w=majority"; //url kreduit
// const mongo_url =
//   "mongodb+srv://nerogama93:2ifA2s7NusdBmc9k@cluster0.xkuwbhh.mongodb.net/Node-API?retryWrites=true&w=majority"; //url nabil

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({extended: false})) //to use form data

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/guthib", (req, res) => {
  res.send("Hello Word, you splelled it worng");
});

// Catalogue API

app.get("/catalogues", async (req, res) => {
  try {
    const dataget = await Catalogue.find({});
    // const categoryOrder = ["Electronic", "HP", "Home Appliance", "Furniture"];
    // const sortedData = data.sort((a, b) => {
    //   const categoryA = categoryOrder.indexOf(a.category);
    //   const categoryB = categoryOrder.indexOf(b.category);
    //   return categoryA - categoryB;
    // });
    res.status(200).json(dataget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Catalogue.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/catalogue/filter", async (req, res) => {
  try {
    const data = await Catalogue.find(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/catalogue", async (req, res) => {
  try {
    var data;
    if (req.body.length) {
      data = await Catalogue.insertMany(req.body);
    } else {
      data = await Catalogue.create(req.body);
    }
    // const data = await Catalogue.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Catalogue.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Catalogue with ID: ${id} not found in database` });
    }
    const updatedData = await Catalogue.findById(id);
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/catalogue", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Catalogue.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Catalogue with ID: ${id} not found in database` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Banner API

app.get("/banners", async (req, res) => {
  try {
    const data = await Banner.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Banner.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/banner", async (req, res) => {
  try {
    const data = await Banner.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Banner.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Banner with ID: ${id} not found in database` });
    }
    const updatedData = await Banner.findById(id);
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/banner", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Banner.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Banner with ID: ${id} not found in database` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Common Data API

app.get("/common", async (req, res) => {
  try {
    const id = "648c247ff1aef9ea4ef486c4";
    const data = await Common.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/common", async (req, res) => {
  try {
    const id = "648c247ff1aef9ea4ef486c4";
    const data = await Common.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Common with ID: ${id} not found in database` });
    }
    const updatedData = await Common.findById(id);
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to mongo db");
    app.listen(8000, () => {
      console.log("Node api is running, on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
