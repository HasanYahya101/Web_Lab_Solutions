import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const teamSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Team leader is required"],
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    }],
    maxMembers: {
      type: Number,
      required: [true, "Maximum members is required"],
      min: [2, "Team must have at least 2 members"],
      max: [10, "Team cannot have more than 10 members"],
      default: 5,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    joinRequests: [{
      character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      requestedAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
)

teamSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "team_id_counter",
})

const Team = mongoose.model("Team", teamSchema)

export default Team 