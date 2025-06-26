const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleName: String,
  price: Number,
  image: String,
  desc: String,
  brand: String,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
