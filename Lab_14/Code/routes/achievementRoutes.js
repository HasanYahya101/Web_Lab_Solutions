import express from 'express'
import {
  createAchievement,
  getAchievements,
  getAchievement,
  updateAchievement,
  deleteAchievement,
  unlockAchievement,
  getCharacterAchievements,
} from '../controllers/achievementController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/")
  .post(protect, createAchievement)
  .get(protect, getAchievements)

router.route("/:id")
  .get(protect, getAchievement)
  .patch(protect, updateAchievement)
  .delete(protect, deleteAchievement)

router.route("/:id/unlock")
  .post(protect, unlockAchievement)

router.route("/character-achievements/:id")
  .get(protect, getCharacterAchievements)

export default router 