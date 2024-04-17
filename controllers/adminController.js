const db = require("../db");

exports.addTrain = (req, res) => {
  const { source, destination, total_seats } = req.body;
  db.query(
    "INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)",
    [source, destination, total_seats],
    (err, result) => {
      if (err) {
        console.error("Error adding train:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json({ message: "Train added successfully" });
    }
  );
};
