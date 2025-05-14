import Team from "../model/Team.js"
import Character from "../model/Character.js"

export const createTeam = async (req, res) => {
  try {
    const { name, description, maxMembers, isPrivate } = req.body

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide team name and description",
      })
    }

    const existingTeam = await Team.findOne({ name })
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team name already exists",
      })
    }

    const team = await Team.create({
      name,
      description,
      leader: req.character._id,
      members: [req.character._id],
      maxMembers: maxMembers || 5,
      isPrivate: isPrivate || false,
    })

    res.status(201).json({
      success: true,
      data: team,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getTeams = async (req, res) => {
  try {
    let query = Team.find()

    if (req.query.isPrivate) {
      query = query.find({ isPrivate: req.query.isPrivate === "true" })
    }

    const teams = await query
      .populate("leader", "charactername role")
      .populate("members", "charactername role")

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("leader", "charactername role")
      .populate("members", "charactername role")
      .populate("joinRequests.character", "charactername role")

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.isPrivate && !team.members.includes(req.character._id)) {
      return res.status(403).json({
        success: false,
        message: "This team is private",
      })
    }

    res.status(200).json({
      success: true,
      data: team,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.leader.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can update team details",
      })
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: updatedTeam,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.leader.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can delete the team",
      })
    }

    await team.deleteOne()

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const requestJoinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.members.includes(req.character._id)) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this team",
      })
    }

    if (team.members.length >= team.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "Team is already at maximum capacity",
      })
    }

    const existingRequest = team.joinRequests.find(
      (request) =>
        request.character.toString() === req.character._id.toString() &&
        request.status === "pending"
    )

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending join request",
      })
    }

    team.joinRequests.push({
      character: req.character._id,
      status: "pending",
    })

    await team.save()

    res.status(200).json({
      success: true,
      message: "Join request sent successfully",
      data: team,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const handleJoinRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.leader.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can handle join requests",
      })
    }

    const request = team.joinRequests.id(requestId)
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      })
    }

    if (action === "accept") {
      if (team.members.length >= team.maxMembers) {
        return res.status(400).json({
          success: false,
          message: "Team is already at maximum capacity",
        })
      }

      request.status = "accepted"
      team.members.push(request.character)
    } else if (action === "reject") {
      request.status = "rejected"
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      })
    }

    await team.save()

    res.status(200).json({
      success: true,
      message: `Join request ${action}ed successfully`,
      data: team,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (!team.members.includes(req.character._id)) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this team",
      })
    }

    if (team.leader.toString() === req.character._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Team leader cannot leave the team. Transfer leadership or delete the team instead.",
      })
    }

    team.members = team.members.filter(
      (member) => member.toString() !== req.character._id.toString()
    )

    await team.save()

    res.status(200).json({
      success: true,
      message: "Left team successfully",
      data: team,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const transferLeadership = async (req, res) => {
  try {
    const { newLeaderId } = req.body
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      })
    }

    if (team.leader.toString() !== req.character._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can transfer leadership",
      })
    }

    if (!team.members.includes(newLeaderId)) {
      return res.status(400).json({
        success: false,
        message: "New leader must be a team member",
      })
    }

    team.leader = newLeaderId
    await team.save()

    res.status(200).json({
      success: true,
      message: "Leadership transferred successfully",
      data: team,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
} 