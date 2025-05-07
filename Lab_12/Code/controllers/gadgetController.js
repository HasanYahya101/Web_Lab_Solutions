import Gadget from "../model/Gadget.js"
import Character from "../model/Character.js"

export const createGadget = async (req, res) => {
  try {
    const { name, description, addedBy } = req.body

    if (!name || !description || !addedBy) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description and character ID",
      })
    }

    const character = await Character.findById(addedBy)
    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      })
    }

    const gadget = await Gadget.create({
      name,
      description,
      addedBy,
    })

    res.status(201).json({
      success: true,
      data: gadget,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllGadgets = async (req, res) => {
  try {
    let query

    const reqQuery = { ...req.query }

    if (req.query.name) {
      query = Gadget.find({
        name: { $regex: req.query.name, $options: "i" },
      })
    } else {
      query = Gadget.find()
    }

    const gadgets = await query.populate({
      path: "addedBy",
      select: "charactername role",
    })

    res.status(200).json({
      success: true,
      count: gadgets.length,
      data: gadgets,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.id).populate({
      path: "addedBy",
      select: "charactername role",
    })

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    res.status(200).json({
      success: true,
      data: gadget,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getGadgetsByCharacter = async (req, res) => {
  try {
    const characterId = req.params.id

    const character = await Character.findById(characterId)
    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      })
    }

    if (character.role === "human") {
      return res.status(400).json({
        success: false,
        message: "Humans don't own gadgets",
      })
    }

    const gadgets = await Gadget.find({ addedBy: characterId })

    res.status(200).json({
      success: true,
      count: gadgets.length,
      data: gadgets,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateGadget = async (req, res) => {
  try {
    let gadget = await Gadget.findById(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    gadget = await Gadget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: gadget,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    await gadget.deleteOne()

    res.status(204).json({
      success: true,
      data: {},
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}