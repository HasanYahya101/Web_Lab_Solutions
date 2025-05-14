import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const achievementSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["combat", "exploration", "social", "collection", "special"],
    },
    points: {
      type: Number,
      required: [true, "Points are required"],
      min: [0, "Points cannot be negative"],
    },
    requirements: {
      type: Map,
      of: Number,
      default: {},
    },
    unlockedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    }],
    isSecret: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

achievementSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "achievement_id_counter",
})

const Achievement = mongoose.model("Achievement", achievementSchema)

export default Achievement 