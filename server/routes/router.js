const express = require('express')

const { getRooms } = require('../controllers/users')


const router = express.Router()

router.get('/', (req, res) => {
    res.send("Server is up and running")
})


router.post('/', (req, res) => {
    const rooms = getRooms()
    res.status(200).json(rooms)
})


module.exports = router