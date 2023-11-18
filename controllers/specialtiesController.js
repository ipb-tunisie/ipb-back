const specialties = require("../models/specialties");
const getAll = async (req, res) => {
  try {
    const specialtiesMedicaux = await specialties.find();
    return res.status(200).json(specialtiesMedicaux);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
const initializeSpecialties = async () => {
  const defaultSpecialtiesData = [
    {
      Spécialités_médicales: [
        "Cardiologie",
        "Dermatologie",
        "Endocrinologie",
        "Gériatrie",
        "Hématologie",
        "Médecine interne",
        "Néphrologie",
        "Neurologie",
        "Pédiatrie",
        "Pneumologie",
        "Radiologie",
        "Rhumatologie",
        "Santé publique",
        "Gastro -entérologie",
        "Médecine générale",
        "Maladie infectieuse",
        "Psychiatrie",
        "Urgences-Réa",
        "Médecine de famille",
        "Médecine légale",
        "Médecine de travail",
        "Médecine physique",
        "Oncologie",
      ],
      Spécialités_chirurgicales: [
        "Chirurgie",
        "Chirurgie plastique",
        "CCVT",
        "Gynéco -obstétrique",
        "Neurochirurgicale",
        "Ophtalmologie",
        "Orthopédie",
        "Oto-RhinoLaryngologie (ORL)",
        " Chirurgie pédiatrique",
        "Traumatologie",
        "Urologie",
      ],
      Spécialités_fondamentales: [
        "Anapath",
        "Anatomie",
        "Pharmacologie",
        "Sémiologie",
        "Biologie",
        "Physiologie",
        "Histo-embryologie",
      ],
    },
    // Add more specialties if needed
  ];

  try {
    for (const specialtyData of defaultSpecialtiesData) {
      const existingSpecialty = await specialties.findOne({
        Spécialités_médicales: specialtyData.Spécialités_médicales[0],
      });
      if (!existingSpecialty) {
        const newSpecialty = new specialties(specialtyData);
        await newSpecialty.save();
      }
    }
    console.log("Specialties initialized successfully!");
  } catch (error) {
    console.error("Error initializing specialties:", error.message);
  }
};

const add = async (req, res) => {
  try {
    const ajoutspecialties = new specialties({
      Spécialités_médicales: req.body.Spécialités_médicales,
      Spécialités_chirurgicales: req.body.Spécialités_chirurgicales,
      Spécialités_fondamentales: req.body.Spécialités_fondamentales,
    });
    console.log(ajoutspecialties);
    await ajoutspecialties.save();
    return res.status(200).json(ajoutspecialties);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const edit = async (req, res) => {
  try {
    on;
    const existingspecialties = await specialties.findOne();

    if (!existingspecialties) {
      const newIPBPACK = new specialties({
        Spécialités_médicales: req.body.Spécialités_médicales,
        Spécialités_chirurgicales: req.body.Spécialités_chirurgicales,
        Spécialités_fondamentales: req.body.Spécialités_fondamentales,
      });

      const savedIPBPACK = await newIPBPACK.save();
      return res.status(200).json(savedIPBPACK);
    }

    (existingspecialties.Spécialités_médicales =
      req.body.Spécialités_médicales),
      (existingspecialties.Spécialités_chirurgicales =
        req.body.Spécialités_chirurgicales),
      (existingspecialties.Spécialités_fondamentales =
        req.body.Spécialités_fondamentales);

    const updated = await existingspecialties.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

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
  edit,
  initializeSpecialties,
  //   remove,
};
