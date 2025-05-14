import Achievement from "../model/Achievement.js"
import Character from "../model/Character.js"

export const createAchievement = async (req, res) => {
  try {
    const { title, description, category, points, requirements, isSecret } = req.body

    if (!title || !description || !category || !points) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const achievement = await Achievement.create({
      title,
      description,
      category,
      points,
      requirements: requirements || {},
      isSecret: isSecret || false,
    })

    res.status(201).json({
      success: true,
      data: achievement,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAchievements = async (req, res) => {
  try {
    let query = Achievement.find()

    if (req.query.category) {
      query = query.find({ category: req.query.category })
    }

    if (req.query.points) {
      query = query.find({ points: req.query.points })
    }

    // Don't show secret achievements unless they're unlocked
    if (!req.query.showSecret) {
      query = query.find({
        $or: [
          { isSecret: false },
          { unlockedBy: req.character._id }
        ]
      })
    }

    const achievements = await query.populate({
      path: "unlockedBy",
      select: "charactername role",
    })

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id).populate({
      path: "unlockedBy",
      select: "charactername role",
    })

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      })
    }

    // Don't show secret achievements unless they're unlocked
    if (achievement.isSecret && !achievement.unlockedBy.includes(req.character._id)) {
      return res.status(403).json({
        success: false,
        message: "This achievement is secret",
      })
    }

    res.status(200).json({
      success: true,
      data: achievement,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      })
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: updatedAchievement,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      })
    }

    await achievement.deleteOne()

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const unlockAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      })
    }

    if (achievement.unlockedBy.includes(req.character._id)) {
      return res.status(400).json({
        success: false,
        message: "Achievement already unlocked",
      })
    }

    achievement.unlockedBy.push(req.character._id)
    await achievement.save()

    res.status(200).json({
      success: true,
      message: "Achievement unlocked successfully",
      data: achievement,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getCharacterAchievements = async (req, res) => {
  try {
    const characterId = req.params.id

    const character = await Character.findById(characterId)
    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      })
    }

    const achievements = await Achievement.find({
      unlockedBy: characterId,
    })

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
} 