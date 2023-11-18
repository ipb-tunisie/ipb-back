const Products = require("../models/products");
const uploadf = require("../Middleware/UploadFireBase");

const getAll = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const add = async (req, res) => {
  try {
    const existingProduct = await Products.findOne({
      Faculte: req.body.Faculte,
    });

    if (existingProduct) {
      existingProduct.productDetails = [
        ...existingProduct.productDetails,
        ...req.body.productDetails,
      ];
      await existingProduct.save();
      return res.status(200).send({ entity: existingProduct });
    }

    const productDetails = req.body.productDetails.map((detail) => {
      return {
        anne: detail.anne,
        imgUrl: detail.imgUrl,
        imgAlt: detail.imgAlt,
        title: detail.title,
        desc: detail.desc,
        page: detail.page,
        periode: detail.periode,
        Quantity: detail.Quantity,
        exempleurl: detail.exempleurl,
      };
    });

    const product = new Products({
      Faculte: req.body.Faculte,
      productDetails: productDetails,
    });

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

    const updatedProduct = await Products.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        $set: {
          "productDetails.$[elem].anne": req.body.anne,
          "productDetails.$[elem].imgUrl": req.body.imgUrl,
          "productDetails.$[elem].imgAlt": req.body.imgAlt,
          "productDetails.$[elem].title": req.body.title,
          "productDetails.$[elem].desc": req.body.desc,
          "productDetails.$[elem].Quantity": req.body.Quantity,
          "productDetails.$[elem].page": req.body.page,
          "productDetails.$[elem].periode": req.body.periode,
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

    const updatedProduct = await Products.findOneAndUpdate(
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
