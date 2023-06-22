class Catalogue {
  getCatalogue = async (req, res) => {
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
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

let catalogue = new Catalogue();

module.exports(catalogue);
