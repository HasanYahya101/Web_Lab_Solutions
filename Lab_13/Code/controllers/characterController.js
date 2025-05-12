import Character from "../model/Character.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

export const createCharacter = async (req, res) => {
  try {
    const { charactername, role, password } = req.body

    if (!charactername || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide character name, role and password",
      })
    }

    const character = await Character.create({
      charactername,
      role,
      password,
    })

    res.status(201).json({
      success: true,
      data: {
        _id: character._id,
        charactername: character.charactername,
        role: character.role,
        token: generateToken(character._id),
      },
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const loginCharacter = async (req, res) => {
  try {
    const { charactername, password } = req.body

    if (!charactername || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide character name and password",
      })
    }

    const character = await Character.findOne({ charactername })

    if (character && (await character.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: character._id,
          charactername: character.charactername,
          role: character.role,
          token: generateToken(character._id),
        },
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid character name or password",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find().select("-password")

    res.status(200).json({
      success: true,
      count: characters.length,
      data: characters,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

export const getCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).select("-password")

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      })
    }

    res.status(200).json({
      success: true,
      data: character,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}
