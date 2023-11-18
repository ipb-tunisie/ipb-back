const ProductCours = require("../models/produitCours");

const getAll = async (req, res) => {
  try {
    const Pc = await ProductCours.find();
    return res.status(200).json(Pc);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const existingProduct = await ProductCours.findOne({
      service: req.body.service,
    });

    if (existingProduct) {
      existingProduct.productDetails = [
        ...existingProduct.productDetails,
        ...req.body.productDetails.map((detail) => {
          return {
            imgUrl: detail.imgUrl,
            imgAlt: detail.imgAlt,
            specialite: detail.specialite,
            title: detail.title,
            desc: detail.desc,
            Quantity: detail.Quantity,
            page: detail.page,
            Laser: detail.Laser,
            oldLaser: detail.oldLaser,
            Jet: detail.Jet,
            oldJet: detail.oldJet,
            achaud: detail.achaud,
            oldachaud: detail.oldachaud,
            Registre: detail.Registre,
            oldRegistre: detail.oldRegistre,
            exempleurl: detail.exempleurl || [], // Set exempleurl if provided, or default to an empty array
          };
        }),
      ];

      await existingProduct.save();
      return res.status(200).send({ entity: existingProduct });
    }

    const productDetails = req.body.productDetails.map((detail) => {
      return {
        imgUrl: detail.imgUrl,
        imgAlt: detail.imgAlt,
        specialite: detail.specialite,
        title: detail.title,
        desc: detail.desc,
        Quantity: detail.Quantity,
        page: detail.page,
        price: detail.oldprice,
        oldprice: detail.oldprice,
        exempleurl: detail.exempleurl || [], // Set exempleurl if provided, or default to an empty array
      };
    });

    const product = new ProductCours({
      service: req.body.service,
      productDetails: productDetails,
    });

    if (req.body.oldPrice && req.body.oldPrice > 0) {
      product.oldPrice = req.body.oldPrice;
    }

    await product.save();
    return res.status(200).send({ entity: product });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const edit = async (req, res) => {
  try {
    console.log(req.body);
    const courseId = req.body.courseId;
    const productDetailId = req.body.productDetailId;

    const updatedProduct = await ProductCours.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        $set: {
          "productDetails.$[elem].imgUrl": req.body.imgUrl,
          "productDetails.$[elem].imgAlt": req.body.imgAlt,
          "productDetails.$[elem].specialite": req.body.specialite,
          "productDetails.$[elem].title": req.body.title,
          "productDetails.$[elem].desc": req.body.desc,
          "productDetails.$[elem].Quantity": req.body.Quantity,
          "productDetails.$[elem].page": req.body.page,
          "productDetails.$[elem].Laser": req.body.Laser,
          "productDetails.$[elem].oldLaser": req.body.oldLaser,
          "productDetails.$[elem].Jet": req.body.Jet,
          "productDetails.$[elem].oldJet": req.body.oldJet,
          "productDetails.$[elem].Speral": req.body.Speral,
          "productDetails.$[elem].oldSperal": req.body.oldSperal,
          "productDetails.$[elem].achaud": req.body.achaud,
          "productDetails.$[elem].oldachaud": req.body.oldachaud,
          "productDetails.$[elem].Registre": req.body.Registre,
          "productDetails.$[elem].oldRegistre": req.body.oldRegistre,
          "productDetails.$[elem].exempleurl": req.body.exempleurl,
        },
      },
      {
        arrayFilters: [{ "elem._id": productDetailId }],
        new: true,
      }
    );

    return res.status(200).json({ updatedProduct });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const productDetailId = req.body.productDetailId;

    const updatedProduct = await ProductCours.findOneAndUpdate(
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

const makeTop = async (req, res) => {
  try {
    const product = await ProductCours.findOne({ _id: req.body._id });
    if (!product) return res.status(404).json("product not found");
    product.isTop = product.isTop === true ? false : true;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const getOne = async (req, res) => {
  try {
    const product = await ProductCours.findOne({ _id: req.body._id });
    if (!product) return res.status(404).json("not found");
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const similaire = async (req, res) => {
  try {
    const ProductCours = await ProductCours.find({
      category: req.body.category,
    });
    return res.status(200).json(ProductCours);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const top = async (req, res) => {
  try {
    const ProductCours = await ProductCours.find({ isTop: true });
    return res.status(200).json(ProductCours);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getAll,
  add,
  edit,
  remove,
  makeTop,
  getOne,
  similaire,
  top,
};
