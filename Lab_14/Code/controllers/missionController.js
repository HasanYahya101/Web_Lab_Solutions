import Mission from "../model/Mission.js"
import Character from "../model/Character.js"

export const createMission = async (req, res) => {
  try {
    const { title, description, assignedTo, difficulty, reward } = req.body

    if (!title || !description || !assignedTo || !difficulty || !reward) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const assignedRobot = await Character.findById(assignedTo)
    if (!assignedRobot || assignedRobot.role !== "robot") {
      return res.status(400).json({
        success: false,
        message: "Assigned character must be a robot",
      })
    }

    const mission = await Mission.create({
      title,
      description,
      assignedTo,
      difficulty,
      reward,
    })

    res.status(201).json({
      success: true,
      data: mission,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllMissions = async (req, res) => {
  try {
    let query = Mission.find()

    if (req.query.status) {
      query = query.find({ status: req.query.status })
    }

    if (req.query.difficulty) {
      query = query.find({ difficulty: req.query.difficulty })
    }

    const missions = await query.populate({
      path: "assignedTo",
      select: "charactername role",
    })

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id).populate({
      path: "assignedTo",
      select: "charactername role",
    })

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found",
      })
    }

    res.status(200).json({
      success: true,
      data: mission,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateMissionStatus = async (req, res) => {
  try {
    const { status } = req.body
    const mission = await Mission.findById(req.params.id)

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found",
      })
    }

    if (mission.assignedTo.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this mission",
      })
    }

    mission.status = status
    await mission.save()

    res.status(200).json({
      success: true,
      data: mission,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getRobotMissions = async (req, res) => {
  try {
    const robotId = req.params.id

    const robot = await Character.findById(robotId)
    if (!robot || robot.role !== "robot") {
      return res.status(404).json({
        success: false,
        message: "Robot not found",
      })
    }

    const missions = await Mission.find({ assignedTo: robotId })

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
} 