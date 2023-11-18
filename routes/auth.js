const express = require('express')
const {
  login,
  register,
  connectedUser,
  logout
} = require('../services/auth/index')

const router = express.Router()
router.get("/user", connectedUser);
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', connectedUser)
module.exports = router
