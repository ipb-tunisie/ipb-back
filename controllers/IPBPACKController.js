const IPBPACK = require("../models/ipbpack");
const getAll = async (req, res) => {
  try {
    const Pc = await IPBPACK.find();
    return res.status(200).json(Pc);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const ipbPromo = new IPBPACK({
      imgUrl: req.body.imgUrl,
      imgAlt: req.body.imgAlt,
      title: req.body.title,
      specialite: req.body.specialite,
      desc: req.body.desc,
      Quantity: req.body.Quantity,
    });
    console.log(ipbPromo);
    await ipbPromo.save();
    return res.status(200).json(ipbPromo);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const edit = async (req, res) => {
  try {
    on;
    const existingIPBPACK = await IPBPACK.findOne();

    if (!existingIPBPACK) {
      const newIPBPACK = new IPBPACK({
        imgUrl: req.body.imgUrl,
        imgAlt: req.body.imgAlt,
        title: req.body.title,
        specialite: req.body.specialite,
        desc: req.body.desc,
        Quantity: req.body.Quantity,
      });

      const savedIPBPACK = await newIPBPACK.save();
      return res.status(200).json(savedIPBPACK);
    }

    (existingIPBPACK.imgUrl = req.body.imgUrl),
      (existingIPBPACK.imgAlt = req.body.imgAlt),
      (existingIPBPACK.title = req.body.title),
      (existingIPBPACK.specialite = req.body.specialite),
      (existingIPBPACK.desc = req.body.desc),
      (existingIPBPACK.Quantity = req.body.Quantity);

    const updated = await existingIPBPACK.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const productDetailId = req.body.productDetailId;

    const updatedProduct = await IPBPACK.findOneAndUpdate(
      {
        _id: courseId,
        productDetails: {
          $elemMatch: { _id: productDetailId },
        },
      },
      { $pull: { productDetails: { _id: productDetailId } } },
      { new: true }
    );

    return res.status(200).json(updatedProduct);
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
