const express = require("express");
const router = express.Router();

// Load Inventory model
const User = require("../../models/User");

// @route GET api/inventory/test
// @description tests inventory route
// @access Public
router.get("/test", (req, res) => res.send("inventory route testing!"));

// @route GET api/inventory
// @description Get all inventory
// @access Public
router.get("/", (req, res) => {
    User.find()
    .then((items) => res.json(items))
    .catch((err) =>
      res.status(404).json({ noInventoryfound: "No Inventory found" })
    );
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  User.find()
  .findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ noitemfound: "No Inventory Item found" }));
});

// @route GET api/inventory
// @description add/save inventory item
// @access Public
router.post("/", (req, res) => {
  User.create(req.body)
    .then((item) => res.json({ msg: "Inventory item added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this inventory item" }));
});

// @route GET api/inventory/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: "Inventory item updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the inventory item in Database" })
    );
});

// @route GET api/inventory/:id
// @description Delete inventory item by id
// @access Public
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, req.body)
    .then((item) => res.json({ mgs: "Inventory item entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a inventory item" }));
});

module.exports = router;
