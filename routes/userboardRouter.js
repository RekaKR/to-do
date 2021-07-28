const express = require('express')
const router = express.Router()
const UserBoard = require('../models/userBoardModel')

//const UserBoard = require('../models/userBoardModel')

router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id']

  if (!userId) return res.status(401).json({ message: "x-user-id missing" })

  const userBoards = await UserBoard.findOne({ user_id: userId })

  if (userBoards) return res.json(userBoards)

  const userB = new UserBoard({
    user_id: userId,
    dashboards: []
  })

  //try {
  const savedUserB = await userB.save()
  res.status(200).json(savedUserB)
  /*
  } catch (err) {
    res.json({ message: "HIBA VAN A SAVE-NÉL" })
  }
  */

  //  res.status(200).json(userBoards)
})


module.exports = router