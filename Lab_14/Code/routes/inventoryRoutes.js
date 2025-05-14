import express from 'express'
import {
  addItem,
  getInventory,
  getItem,
  updateItem,
  deleteItem,
  toggleEquip,
} from '../controllers/inventoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route("/")
  .post(protect, addItem)
  .get(protect, getInventory)

router.route("/:id")
  .get(protect, getItem)
  .patch(protect, updateItem)
  .delete(protect, deleteItem)

router.route("/:id/toggle-equip")
  .patch(protect, toggleEquip)

export default router 