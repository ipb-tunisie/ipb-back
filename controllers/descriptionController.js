const descriptions = require("../models/description");
const getAll = async (req, res) => {
  try {
    const description = await descriptions.find();
    return res.status(200).json(description);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const description = new descriptions({
      description: req.body.description,
    });
    await description.save();
    return res.status(200).json(description);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    // Check if any documents exist in the collection
    const existingDescription = await descriptions.findOne();

    if (!existingDescription) {
      // If no document is found, create a new one
      const newDescription = new descriptions({
        description: req.body.description,
      });

      const savedDescription = await newDescription.save();
      return res.status(200).json(savedDescription);
    }

    // If a document is found, update it
    existingDescription.description = req.body.description;
    const updated = await existingDescription.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await Marque.findOneAndDelete({
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
