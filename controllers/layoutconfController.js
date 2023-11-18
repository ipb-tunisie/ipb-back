const LayoutConf = require("../models/layoutConf");
const uploadf = require("../Middleware/UploadFireBase");

const getAll = async (req, res) => {
  try {
    const layoutConf = await LayoutConf.find();
    return res.status(200).json(layoutConf);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const layout = new LayoutConf({
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
      siteweb: req.body.siteweb,
    });
    await layout.save();
    return res.status(200).json(layout);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    on;
    const existingLayout = await LayoutConf.findOne();

    if (!existingLayout) {
      const newLayout = new LayoutConf({
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email,
        siteweb: req.body.siteweb,
      });

      const savedLayout = await newLayout.save();
      return res.status(200).json(savedLayout);
    }

    existingLayout.address = req.body.address;
    existingLayout.telephone = req.body.telephone;
    existingLayout.email = req.body.email;
    existingLayout.siteweb = req.body.siteweb;
    const updated = await existingLayout.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getAll,
  edit,
  add,
};
