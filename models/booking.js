const db = require("../db");

const createBookingTable = () => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      train_id INT NOT NULL,
      booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (train_id) REFERENCES trains(id)
    )
  `,
    (err, result) => {
      if (err) {
        console.error("Error creating bookings table:", err);
      } else {
        console.log("Bookings table created successfully");
      }
    }
  );
};

module.exports = {
  createBookingTable,
};
