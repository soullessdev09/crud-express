const express = require("express");
const mongoose = require("mongoose");
const Catalogue = require("./models/catalogueModel");
const Banner = require("./models/bannerModel");
const Common = require("./models/commonDataModel");
const Article = require("./models/articleModel");
const cors = require("cors");
const formidable = require("formidable");
const ftp = require("ftp");
const app = express();
const port = 8000;
const mongo_url =
  "mongodb+srv://kreduit:XDMgV9rww96wiKSH@cluster0.adkgvov.mongodb.net/?retryWrites=true&w=majority"; //url kreduit
// const mongo_url =
//   "mongodb+srv://nerogama93:2ifA2s7NusdBmc9k@cluster0.xkuwbhh.mongodb.net/Node-API?retryWrites=true&w=majority"; //url nabil

// FTP server credentials
const ftpConfig = {
  host: "katalog.kreduit.com", // Replace with the FTP server host
  port: 21, // Replace with the FTP server port
  user: "userftp", // Replace with your FTP username
  password: "F!nt3chit2020!@#$", // Replace with your FTP password
};

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({extended: false})) //to use form data

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/guthib", (req, res) => {
  res.send("Hello Word, you splelled it worng");
});

// POST IMG
app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      res.status(500).send("Error parsing form");
      return;
    }

    const ftpClient = new ftp();

    // Connect to the FTP server
    ftpClient.connect(ftpConfig);

    // FTP client event handlers
    ftpClient.on("ready", () => {
      console.log("FTP client connected");

      // Upload the file to the FTP server
      const sourcePath = files.image[0].filepath;
      const destinationPath =
        "/home/userftp/" + files.image[0].originalFilename;

      ftpClient.put(sourcePath, destinationPath, (uploadErr) => {
        if (uploadErr) {
          console.error("Error uploading file:", uploadErr);
          res.status(500).send("Error uploading file");
        } else {
          console.log("File uploaded successfully");
          res.status(200).json({
            url_img: `https://katalog.kreduit.com${destinationPath}`,
          });
        }

        // Close the FTP connection
        ftpClient.end();
      });
    });

    ftpClient.on("error", (err) => {
      console.error("FTP client error:", err);
      res.status(500).send("FTP client error");
    });
  });
});

// Define an Express route to upload an image to the FTP server
// app.post("/upload", (req, res) => {
//   const ftpClient = new ftp();

//   // FTP server credentials
//   const ftpConfig = {
//     host: "katalog.kreduit.com", // Replace with the FTP server host
//     port: 21, // Replace with the FTP server port
//     user: "userftp", // Replace with your FTP username
//     password: "F!nt3chit2020!@#$", // Replace with your FTP password
//   };

//   // Path to the local image file
//   const localFilePath =
//     "D:/experiment/backendtest/crud-cyclic/opt/download2.jpg";

//   // Destination path on the FTP server
//   const remoteFilePath = "/home/userftp/download2.jpg";

//   // Connect to the FTP server
//   ftpClient.connect(ftpConfig);

//   // FTP client event handlers
//   ftpClient.on("ready", () => {
//     console.log("FTP client connected");

//     // Read the image file
//     fs.readFile(localFilePath, (err, data) => {
//       if (err) {
//         console.error("Error reading local image file:", err);
//         res.status(500).send("Error reading local image file");
//         ftpClient.end(); // Close the FTP connection
//         return;
//       }

//       // Upload the image file to the FTP server
//       ftpClient.put(data, remoteFilePath, (uploadErr) => {
//         if (uploadErr) {
//           console.error("Error uploading image file to FTP server:", uploadErr);
//           res.status(500).send("Error uploading image file to FTP server");
//         } else {
//           console.log("Image file uploaded to FTP server");
//           res.status(200).send("Image file uploaded successfully");
//         }

//         // Close the FTP connection
//         ftpClient.end();
//       });
//     });
//   });

//   ftpClient.on("error", (err) => {
//     console.error("FTP client error:", err);
//     res.status(500).send("FTP client error");
//   });
// });

// POST IMG TEST

// Catalogue API

// app.get("/catalogues", async (req, res) => {
//   try {
//     let data;
//     const page = req.query.page;
//     const limit = req.query.limit;
//     const filter = req.query.category;
//     const search = req.query.search;
//     if (filter) {
//       data = await Catalogue.find({ category: filter });
//     } else {
//       data = await Catalogue.find({});
//     }
//     const categoryOrder = [
//       "Electronic",
//       "HP",
//       "Home Appliance",
//       "Furniture",
//       "Laptop",
//       "Tablet",
//       "Smart Watch",
//       "Earbuds",
//       "",
//     ];
//     const sortedData = data.sort((a, b) => {
//       const categoryA = categoryOrder.indexOf(a.category);
//       const categoryB = categoryOrder.indexOf(b.category);
//       return categoryA - categoryB;
//     });
//     const searchResult =
//       search &&
//       sortedData.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const pagedData = search
//       ? searchResult.slice(startIndex, endIndex)
//       : sortedData.slice(startIndex, endIndex);
//     const usedData =
//       page && limit ? pagedData : search ? searchResult : sortedData;
//     res.status(200).json(usedData);
//     // res.status(200).json({ data_length: usedData.length, data: usedData });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.get("/catalogues", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const data = await Catalogue.find({});
    const categoryOrder = [
      "Electronic",
      "HP",
      "Home Appliance",
      "Furniture",
      "Laptop",
      "Tablet",
      "Smart Watch",
      "Earbuds",
      "",
    ];
    const sortedData = data.sort((a, b) => {
      const categoryA = categoryOrder.indexOf(a.category);
      const categoryB = categoryOrder.indexOf(b.category);
      return categoryA - categoryB;
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagedData = sortedData.slice(startIndex, endIndex);
    const usedData = page && limit ? pagedData : sortedData;
    res.status(200).json(usedData);
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

app.post("/catalogue/search", async (req, res) => {
  try {
    const data = await Catalogue.find({});
    const categoryOrder = [
      "Electronic",
      "HP",
      "Home Appliance",
      "Furniture",
      "Laptop",
      "Tablet",
      "Smart Watch",
      "Earbuds",
      "",
    ];
    const sortedData = data.sort((a, b) => {
      const categoryA = categoryOrder.indexOf(a.category);
      const categoryB = categoryOrder.indexOf(b.category);
      return categoryA - categoryB;
    });
    const searchResult = sortedData.filter((item) =>
      item.name.toLowerCase().includes(req.body.search.toLowerCase())
    );
    res.status(200).json(searchResult);
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
    // const data = await Catalogue.deleteMany({ category: null });
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

//Article API

app.get("articles", async (req, res) => {
  try {
    const data = await Article.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("article", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Article.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("article", async (req, res) => {
  try {
    const data = await Article.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("article", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Article.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Article with ${id}, not found in database` });
    }
    const updatedData = await Article.findById(id);
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("article", async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Article.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to mongo db");
    app.listen(port, () => {
      console.log(`Node api is running, on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
