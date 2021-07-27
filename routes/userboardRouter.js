const express = require('express')
const router = express.Router()

//const UserBoard = require('../models/userBoardModel')

router.get('/', (req, res) => {
  if (!req.headers['x-user-id']) {
    return res.status(401).json({ message: "x-user-id missing" })
  }

  res.status(200).json({ message: "HELLO WORLD" })
})


module.exports = router