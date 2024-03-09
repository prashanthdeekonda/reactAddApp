const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
