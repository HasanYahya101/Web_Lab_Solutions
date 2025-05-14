import Inventory from "../model/Inventory.js"
import Character from "../model/Character.js"

export const addItem = async (req, res) => {
  try {
    const { itemName, description, quantity, type } = req.body

    if (!itemName || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const item = await Inventory.create({
      itemName,
      description,
      quantity: quantity || 1,
      type,
      owner: req.character._id,
    })

    res.status(201).json({
      success: true,
      data: item,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getInventory = async (req, res) => {
  try {
    let query = Inventory.find({ owner: req.character._id })

    if (req.query.type) {
      query = query.find({ type: req.query.type })
    }

    if (req.query.isEquipped) {
      query = query.find({ isEquipped: req.query.isEquipped === "true" })
    }

    const items = await query

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      })
    }

    if (item.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this item",
      })
    }

    res.status(200).json({
      success: true,
      data: item,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      })
    }

    if (item.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item",
      })
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: updatedItem,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      })
    }

    if (item.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item",
      })
    }

    await item.deleteOne()

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const toggleEquip = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      })
    }

    if (item.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to equip this item",
      })
    }

    item.isEquipped = !item.isEquipped
    await item.save()

    res.status(200).json({
      success: true,
      data: item,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
} 