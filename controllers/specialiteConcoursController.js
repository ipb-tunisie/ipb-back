const specialiteConcours = require("../models/specialiteConcours");
const getAll = async (req, res) => {
  try {
    const specialtiesMedicaux = await specialiteConcours.find();
    return res.status(200).json(specialtiesMedicaux);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const initializeSpecialties = async () => {
  const defaultSpecialtiesData = [
    {
      Spécialités: ["Cours", "Ex_Blanc", "Evalution", "Resume", "Pack_IPB"],
    },
  ];

  try {
    for (const specialtyData of defaultSpecialtiesData) {
      const existingSpecialty = await specialiteConcours.findOne({
        Spécialités: specialtyData.Spécialités,
      });
      if (!existingSpecialty) {
        const newSpecialty = new specialiteConcours(specialtyData);
        await newSpecialty.save();
      }
    }
    console.log("specialiteConcours initialized successfully!");
  } catch (error) {
    console.error("Error initializing specialiteConcours:", error.message);
  }
};

const add = async (req, res) => {
  try {
    const ajoutspecialties = new specialiteConcours({
      Spécialités: req.body.Spécialités,
    });
    console.log(ajoutspecialties);
    await ajoutspecialties.save();
    return res.status(200).json(ajoutspecialties);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

// const edit = async (req, res) => {
//   try {
//     on;
//     const existingspecialties = await specialiteConcours.findOne();

//     if (!existingspecialties) {
//       const newIPBPACK = new specialties({
//         Spécialités_médicales: req.body.Spécialités_médicales,
//         Spécialités_chirurgicales: req.body.Spécialités_chirurgicales,
//         Spécialités_fondamentales: req.body.Spécialités_fondamentales,
//       });

//       const savedIPBPACK = await newIPBPACK.save();
//       return res.status(200).json(savedIPBPACK);
//     }

//     (existingspecialties.Spécialités_médicales =
//       req.body.Spécialités_médicales),
//       (existingspecialties.Spécialités_chirurgicales =
//         req.body.Spécialités_chirurgicales),
//       (existingspecialties.Spécialités_fondamentales =
//         req.body.Spécialités_fondamentales);

//     const updated = await existingspecialties.save();

//     return res.status(200).json(updated);
//   } catch (error) {
//     return res.status(500).json({ err: error.message });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     const courseId = req.body.courseId;
//     const productDetailId = req.body.productDetailId;

//     const updatedProduct = await specialties.findOneAndUpdate(
//       {
//         _id: courseId,
//         productDetails: {
//           $elemMatch: { _id: productDetailId },
//         },
//       },
//       { $pull: { productDetails: { _id: productDetailId } } },
//       { new: true }
//     );

//     return res.status(200).json(updatedProduct);
//   } catch (error) {
//     return res.status(500).json({ err: error.message });
//   }
// };

module.exports = {
  getAll,
  add,
  //   edit,
  initializeSpecialties,
  //   remove,
};
