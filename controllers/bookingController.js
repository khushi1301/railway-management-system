const db = require("../db");
const { check, validationResult } = require("express-validator");

exports.bookSeat = [
  check("train_id", "Train ID is required").notEmpty(),
  check("user_id", "User ID is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { train_id, user_id } = req.body;
    db.query(
      "INSERT INTO bookings (train_id, user_id) VALUES (?, ?)",
      [train_id, user_id],
      (err, result) => {
        if (err) {
          console.error("Error booking seat:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Seat booked successfully" });
      }
    );
  },
];

exports.getSeatAvailability = [
  check("source", "Source is required").notEmpty(),
  check("destination", "Destination is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { source, destination } = req.query;
    db.query(
      "SELECT * FROM trains WHERE source = ? AND destination = ?",
      [source, destination],
      (err, trains) => {
        if (err) {
          console.error("Error fetching trains:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (trains.length === 0) {
          return res
            .status(404)
            .json({ message: "No trains found for the given route" });
        }

        const trainIds = trains.map((train) => train.id);
        db.query(
          "SELECT train_id, COUNT(*) as booked_seats FROM bookings WHERE train_id IN (?) GROUP BY train_id",
          [trainIds],
          (err, results) => {
            if (err) {
              console.error("Error fetching booked seats:", err);
              return res.status(500).json({ message: "Internal server error" });
            }

            const seatAvailability = trains.map((train) => {
              const bookedSeats =
                results.find((result) => result.train_id === train.id)
                  ?.booked_seats || 0;
              const availableSeats = train.total_seats - bookedSeats;
              return {
                train_id: train.id,
                source: train.source,
                destination: train.destination,
                available_seats: availableSeats,
              };
            });

            res.json(seatAvailability);
          }
        );
      }
    );
  },
];

exports.getBookingDetails = (req, res) => {
  const bookingId = req.params.bookingId;

  db.query(
    "SELECT * FROM bookings WHERE id = ?",
    [bookingId],
    (err, booking) => {
      if (err) {
        console.error("Error fetching booking details:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (booking.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking[0]);
    }
  );
};
