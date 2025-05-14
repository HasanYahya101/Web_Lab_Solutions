import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const gadgetSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Gadget name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Character reference is required"],
    },
  },
  {
    timestamps: true,
  },
)

gadgetSchema.plugin(AutoIncrement, {
    inc_field: "id",
    id: "gadget_id_counter",
  })
  

const Gadget = mongoose.model("Gadget", gadgetSchema)

export default Gadget
