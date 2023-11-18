const Commande = require("../models/commande");
const getAll = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("products.product");
    return res.status(200).json(commandes);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const commande = new Commande({
      firstName: req.body.firstName,

      tel: req.body.tel,
      email: req.body.email,
      adress: req.body.adress,
      status: req.body.status,
      products: req.body.products,
    });
    await commande.save();
    return res.status(200).json(commande);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const commandeId = req.body.commandeId;

    const deletedCommande = await Commande.deleteOne({
      _id: commandeId,
    });

    if (deletedCommande.deletedCount === 1) {
      const updatedData = await Commande.find({});

      return res.status(200).json({
        message: "commande deleted successfully",

        updatedData,
      });
    } else {
      return res.status(404).json({ message: "commande not found" });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    console.log(req.body);
    const CommandeId = req.body.CommandeId;

    const updatedCommande = await Commande.findOneAndUpdate(
      {
        _id: CommandeId,
      },
      {
        $set: {
          status: req.body.status,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ updatedCommande });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const valid = async (req, res) => {
  try {
    const commande = await Commande.findOne({
      _id: req.body._id,
    });
    if (!commande) return res.status(404).json("commande not found");
    commande.status = req.body.status;
    const updated = await commande.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getAll,
  add,
  valid,
  remove,
  edit,
};
