const Discount = require("../schemas/Discount");

// Generierung und Speicherung eines neuen Rabattcodes

const createDiscount = async (req, res) => {
  try {
    const { code, expirationDate, discountValue } = req.body;
    console.log("req.body:", req.body);
    const discount = await Discount.create({
      code,
      expirationDate,
      discountValue,
    });
    res.status(201).json({
      success: true,
      discount,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//Überprüfung eines Rabattcodes je nachdem, ober er bereits verwendet wurde oder nicht sowie ob er bereits abeglaufen ist

const getDiscount = async (req, res) => {
  try {
    const { code } = req.params;
    const discount = await Discount.findOne({ code });

    if (!discount) {
      return res.status(404).json({
        error: "Discount not found",
      });
    }

    const currentDate = new Date();

    if (discount.expirationDate < currentDate) {
      return res.status(400).json({
        error: "Discount has expired",
      });
    }

    if (discount.used) {
      return res.status(400).json({
        error: "Discount has already been used",
      });
    }

    res.status(200).json({
      discount,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//Ändern und Löschen von Rabattcodes

const updateDiscount = async (req, res) => {
  try {
    const { code } = req.params;
    const { expirationDate, discountValue, used } = req.body;

    const updatedDiscount = await Discount.findOneAndUpdate(
      { code },
      { expirationDate, discountValue, used },
      { new: true }
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        error: "Discount not found",
      });
    }

    res.status(200).json({
      success: true,
      discount: updatedDiscount,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json({
      discounts,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteAllDiscounts = async (req, res) => {
  try {
    const discount = await Discount.deleteMany({});
    res.status(200).json({
      response: "All discounts deleted.",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const { code } = req.params;

    const deletedDiscount = await Discount.findOneAndDelete({ code });

    if (!deletedDiscount) {
      return res.status(404).json({
        error: "Discount not found",
      });
    }

    res.status(200).json({
      success: true,
      discount: deletedDiscount,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  createDiscount,
  getDiscount,
  updateDiscount,
  getAllDiscounts,
  deleteAllDiscounts,
  deleteDiscount,
};
