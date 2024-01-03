const Item = require("../schemas/Item");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      items,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(req.params.id);
    res.status(200).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, brand, price, discount, limited, img, amount, description } =
      req.body;
    console.log("req.body:", req.body);
    const item = await Item.create({
      name,
      brand,
      price,
      discount,
      limited,
      img,
      amount,
      description,
    });
    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteAllItems = async (req, res) => {
  try {
    const item = await Item.deleteMany({});
    res.status(200).json({
      response: "All items deleted.",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { code } = req.params;

    const deletedItem = await Item.findOneAndDelete({ code });

    if (!deletedItem) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, img, amount, description, limited, discount } =
      req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, brand, price, img, amount, description, limited, discount },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  deleteAllItems,
  getAllItems,
  getOneItem,
  createItem,
  deleteItem,
  updateItem,
};
