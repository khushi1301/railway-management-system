const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/trains", adminController.addTrain);

module.exports = router;
