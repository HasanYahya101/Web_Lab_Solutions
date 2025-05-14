import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const missionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Mission title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "failed"],
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Robot reference is required"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "extreme"],
      required: [true, "Difficulty level is required"],
    },
    reward: {
      type: Number,
      required: [true, "Reward points are required"],
      min: [0, "Reward cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
)

missionSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "mission_id_counter",
})

const Mission = mongoose.model("Mission", missionSchema)

export default Mission 