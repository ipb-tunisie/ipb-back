const Category = require("../models/category");
const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.body._id,
    });
    category.name = req.body.name;
    const updated = await category.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await Category.findOneAndDelete({
      _id: req.body._id,
    });

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
module.exports = {
  getAll,
  add,
  edit,
  remove,
};
