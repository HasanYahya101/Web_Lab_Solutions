import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const characterSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    charactername: {
      type: String,
      required: [true, "Character name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["human", "robot"],
        message: "Role must be either human or robot",
      },
    },
  },
  {
    timestamps: true,
  },
)

characterSchema.plugin(AutoIncrement, { inc_field: "id" })

const Character = mongoose.model("Character", characterSchema)

export default Character
