const Prixchoix = require("../models/choix");

const getAll = async (req, res) => {
  try {
    const PrixchoixList = await Prixchoix.find();
    console.log(PrixchoixList);
    return res.status(200).json(PrixchoixList);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const filter = {}; // You might want to define a specific filter based on your use case
    const update = {
      $set: {
        prixJet: req.body.prixJet,
        prixLaser: req.body.prixLaser,
        prixSperal: req.body.prixSperal,
        prixachaud: req.body.prixachaud,
        prixRegistre: req.body.prixRegistre,
        oldprixJet: req.body.oldprixJet,
        oldprixLaser: req.body.oldprixLaser,
        oldprixSperal: req.body.oldprixSperal,
        oldprixachaud: req.body.oldprixachaud,
        oldprixRegistre: req.body.oldprixRegistre,
      },
    };

    const options = {
      new: true, // Return the updated document
      upsert: true, // Create a new document if it doesn't exist
    };

    const updatedImpression = await Prixchoix.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(200).json(updatedImpression);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  edit,
};
