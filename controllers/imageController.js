const images = require("../models/image");
const uploadf = require("../Middleware/UploadFireBase");

const getAll = async (req, res) => {
  try {
    const image = await images.find();
    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const image = new images({
      img: req.body.img,
    });

    // Save the new image
    await image.save();

    // Fetch all images after adding the new one
    const allImages = await images.find({});

    return res.status(200).json({
      allImages: allImages,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    let gallery = [];
    console.log(req);
    if (req.files == null || req.files.images == null) {
    } else {
      const files = req.files.images;
      files.forEach(async (file) => {
        let newFileName = `Feed/${file.originalname + "-" + Date.now()}$/ `;
        let publicURL = `https://storage.googleapis.com/miketekdev.appspot.com/${encodeURI(
          newFileName
        )}`;

        await gallery.push(publicURL);
        await uploadf.uploadFile(file, newFileName).catch((reject) => {
          console.log(reject);
        });
      });
    }
    if (req.body._id) {
      const layoutConf = await LayoutConf.findOne({
        _id: req.body._id,
      });
      layoutConf.small = req.body.small;
      layoutConf.medium = req.body.medium;
      layoutConf.large = req.body.large;
      layoutConf.description = req.body.description;
      layoutConf.slogon = req.body.slogon;
      layoutConf.img = gallery[0] ?? req.body.img;
      const updated = await layoutConf.save();
      return res.status(200).json(updated);
    } else {
      const layoutConf = new LayoutConf({
        small: req.body.small,
        medium: req.body.medium,
        large: req.body.large,
        description: req.body.description,
        slogon: req.body.slogon,
        img: gallery[0],
      });
      await layoutConf.save();
      return res.status(200).json(layoutConf);
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const imageId = req.body.imageId;

    // Delete the image
    const deletedImage = await images.deleteOne({
      _id: imageId,
    });

    if (deletedImage.deletedCount === 1) {
      const allImages = await images.find({});

      return res.status(200).json({
        message: "Image deleted successfully",
        remainingImages: allImages,
      });
    } else {
      return res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getAll,
  edit,
  add,
  remove,
};
