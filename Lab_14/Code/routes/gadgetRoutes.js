import express from 'express'
import {
  createGadget,
  getAllGadgets,
  getGadget,
  getGadgetsByCharacter,
  updateGadget,
  deleteGadget,
} from '../controllers/gadgetController.js'
import { protect, robotOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/").post(protect, robotOnly, createGadget).get(protect, getAllGadgets)

router
  .route("/:id")
  .get(protect, getGadget)
  .patch(protect, robotOnly, updateGadget)
  .delete(protect, robotOnly, deleteGadget)

router.route("/character-gadgets/:id").get(protect, getGadgetsByCharacter)

export default router