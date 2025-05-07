import express from "express"
import {createCharacter, getAllCharacters, getCharacter} from '../controllers/characterController.js'

const router = express.Router()

router.route("/").post(createCharacter).get(getAllCharacters)

router.route("/:id").get(getCharacter)

export default router
