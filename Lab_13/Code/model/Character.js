import mongoose from "mongoose"
import { default as mongooseSequence } from "mongoose-sequence"
import bcrypt from "bcrypt"

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
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
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

characterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

characterSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

characterSchema.plugin(AutoIncrement, { inc_field: "id" })

const Character = mongoose.model("Character", characterSchema)

export default Character
