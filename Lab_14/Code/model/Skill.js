import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const skillSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, "Skill level is required"],
      min: [1, "Level must be at least 1"],
      max: [10, "Level cannot exceed 10"],
      default: 1,
    },
    type: {
      type: String,
      required: [true, "Skill type is required"],
      enum: ["combat", "technical", "social", "special"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Owner reference is required"],
    },
    cooldown: {
      type: Number,
      default: 0,
      min: [0, "Cooldown cannot be negative"],
    },
    lastUsed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

skillSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "skill_id_counter",
})

const Skill = mongoose.model("Skill", skillSchema)

export default Skill 