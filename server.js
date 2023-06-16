const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Catalogue = require("./models/catalogueModel");
const Banner = require("./models/bannerModel");
const Common = require("./models/commonDataModel");
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
    const data = await Product.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Product.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Product.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} not found in database` });
    }
    const updatedData = await Product.findById(id);
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/product", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} not found in database` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Catalogue API

app.get("/catalogues", async (req, res) => {
  try {
    const data = await Catalogue.find({});
    res.status(200).json(data);
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

app.post("/catalogue", async (req, res) => {
  try {
    const data = await Catalogue.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/catalogue-multi", async (req, res) => {
  try {
    const data = await Catalogue.insertMany(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/catalogue-test", async (req, res) => {
  try {
    if (req.body.length !== 0) {
      res.send("insert many");
    } else {
      res.send("satu doang");
    }
    // const data = await Catalogue.insertMany(req.body);
    // res.status(200).json(data);
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
    const id = "648bc201c6217f1d959e226f";
    const data = await Common.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.get("/commons", async (req, res) => {
//   try {
//     const data = await Common.find({});
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post("/common", async (req, res) => {
//   try {
//     const data = await Common.create(req.body);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.delete("/common", async (req, res) => {
//   try {
//     const id = req.query.id;
//     const data = await Common.findByIdAndDelete(id);
//     if (!data) {
//       return res
//         .status(404)
//         .json({ message: `Common with ID: ${id} not found in database` });
//     }
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.put("/common", async (req, res) => {
  try {
    const id = "648bc201c6217f1d959e226f";
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
    app.listen(3000, () => {
      console.log("Node api is running, on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
