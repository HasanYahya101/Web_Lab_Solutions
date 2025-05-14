import Skill from "../model/Skill.js"
import Character from "../model/Character.js"

export const createSkill = async (req, res) => {
  try {
    const { name, description, type, cooldown } = req.body

    if (!name || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const skill = await Skill.create({
      name,
      description,
      type,
      cooldown: cooldown || 0,
      owner: req.character._id,
    })

    res.status(201).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getSkills = async (req, res) => {
  try {
    let query = Skill.find({ owner: req.character._id })

    if (req.query.type) {
      query = query.find({ type: req.query.type })
    }

    if (req.query.level) {
      query = query.find({ level: req.query.level })
    }

    const skills = await query

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    if (skill.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this skill",
      })
    }

    res.status(200).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    if (skill.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this skill",
      })
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: updatedSkill,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    if (skill.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this skill",
      })
    }

    await skill.deleteOne()

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const useSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    if (skill.owner.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to use this skill",
      })
    }

    const now = new Date()
    if (skill.lastUsed && skill.cooldown > 0) {
      const timeSinceLastUse = (now - skill.lastUsed) / 1000 // Convert to seconds
      if (timeSinceLastUse < skill.cooldown) {
        return res.status(400).json({
          success: false,
          message: `Skill is on cooldown. Please wait ${Math.ceil(
            skill.cooldown - timeSinceLastUse
          )} seconds.`,
        })
      }
    }

    skill.lastUsed = now
    await skill.save()

    res.status(200).json({
      success: true,
      message: "Skill used successfully",
      data: skill,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
} 