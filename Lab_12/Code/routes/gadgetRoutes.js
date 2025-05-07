import express from 'express'
import {
  createGadget,
  getAllGadgets,
  getGadget,
  getGadgetsByCharacter,
  updateGadget,
  deleteGadget,
} from '../controllers/gadgetController.js'

const router = express.Router()

router.route("/").post(createGadget).get(getAllGadgets)

router.route("/:id").get(getGadget).patch(updateGadget).delete(deleteGadget)

router.route("/character-gadgets/:id").get(getGadgetsByCharacter)

export default router