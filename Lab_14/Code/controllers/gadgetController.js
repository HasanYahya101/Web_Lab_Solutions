import Gadget from "../model/Gadget.js"
import Character from "../model/Character.js"

export const createGadget = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and description",
      })
    }

    const gadget = await Gadget.create({
      name,
      description,
      addedBy: req.character._id,
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
    let query = Gadget.find()

    if (req.query.name) {
      query = query.find({
        name: { $regex: req.query.name, $options: "i" },
      })
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

    // Check if the gadget belongs to the logged-in robot
    if (gadget.addedBy.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this gadget",
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
    const gadget = await Gadget.findById(req.params.id);

    if (!gadget || typeof gadget.deleteOne !== 'function') {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      });
    }

    // Check if the gadget belongs to the logged-in robot
    if (gadget.addedBy.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this gadget",
      });
    }

    const deletedGadget = gadget.toObject(); // Capture gadget data before deletion
    await gadget.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Gadget deleted successfully",
      data: deletedGadget, // Return deleted gadget info
    });
  } catch (error) {
    console.error("Delete Gadget Error:", error.message);
    return res.status(500).json({ 
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
