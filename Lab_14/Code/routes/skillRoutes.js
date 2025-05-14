import express from 'express'
import {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
  useSkill,
} from '../controllers/skillController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/")
  .post(protect, createSkill)
  .get(protect, getSkills)

router.route("/:id")
  .get(protect, getSkill)
  .patch(protect, updateSkill)
  .delete(protect, deleteSkill)

router.route("/:id/use")
  .post(protect, useSkill)

export default router 