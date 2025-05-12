import jwt from "jsonwebtoken"
import Character from "../model/Character.js"

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.character = await Character.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      })
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    })
  }
}

export const robotOnly = (req, res, next) => {
  if (req.character && req.character.role === "robot") {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized as a robot",
    })
  }
} 