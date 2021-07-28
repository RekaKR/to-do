const express = require('express')
const router = express.Router()
const UserBoard = require('../models/userBoardModel')


router.get('/', async (req, res) => {
  const user_id = req.headers['x-user-id']

  if (!user_id) return res.status(401).json({ message: "x-user-id missing" })

  const userBoard = await UserBoard.findOneAndUpdate(
    { user_id },
    { user_id },
    { upsert: true, new: true }
  )

  res.status(200).json(userBoard)

  /*
    const userBoard = await UserBoard.findOne({ user_id: user_id })
  
    if (userBoard) return res.json(userBoard)
  
    const userB = new UserBoard({
      user_id: user_id,
      dashboards: []
    })
  
    //try {
    const savedUserB = await userB.save()
    res.status(200).json(savedUserB)
    //  } catch (err) {
    //    res.json({ message: "HIBA VAN A SAVE-NÉL" })
    //  }
  */
})


module.exports = router