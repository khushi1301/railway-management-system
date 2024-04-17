const express = require("express");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const config = require("./config/config");
const db = require("./db");
const { createUserTable } = require("./models/user");
const { createTrainTable } = require("./models/train");
const { createBookingTable } = require("./models/booking");

const app = express();

createUserTable();
createTrainTable();
createBookingTable();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
