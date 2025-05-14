import express from 'express'
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  requestJoinTeam,
  handleJoinRequest,
  leaveTeam,
  transferLeadership,
} from '../controllers/teamController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/")
  .post(protect, createTeam)
  .get(protect, getTeams)

router.route("/:id")
  .get(protect, getTeam)
  .patch(protect, updateTeam)
  .delete(protect, deleteTeam)

router.route("/:id/join")
  .post(protect, requestJoinTeam)

router.route("/:id/join-request")
  .post(protect, handleJoinRequest)

router.route("/:id/leave")
  .post(protect, leaveTeam)

router.route("/:id/transfer-leadership")
  .post(protect, transferLeadership)

export default router 