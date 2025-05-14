import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const inventorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 1,
    },
    type: {
      type: String,
      required: [true, "Item type is required"],
      enum: ["weapon", "tool", "consumable", "resource", "other"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Owner reference is required"],
    },
    isEquipped: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

inventorySchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "inventory_id_counter",
})

const Inventory = mongoose.model("Inventory", inventorySchema)

export default Inventory 