import express from 'express'
import {
  createMission,
  getAllMissions,
  getMission,
  updateMissionStatus,
  getRobotMissions,
} from '../controllers/missionController.js'
import { protect, robotOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/")
  .post(protect, createMission)
  .get(protect, getAllMissions)

router.route("/:id")
  .get(protect, getMission)
  .patch(protect, robotOnly, updateMissionStatus)

router.route("/robot-missions/:id")
  .get(protect, getRobotMissions)

export default router 