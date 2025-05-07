import Character from "../model/Character.js"

export const createCharacter = async (req, res) => {
  try {
    const { charactername, role } = req.body

    if (!charactername || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide character name and role",
      })
    }

    const character = await Character.create({
      charactername,
      role,
    })

    res.status(201).json({
      success: true,
      data: character,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find()

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
    const character = await Character.findById(req.params.id)

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
