const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
exports.registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'Registration successful' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
