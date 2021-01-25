const express =  require('express')
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = require('./routes/router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./controllers/users')


const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        // origin: 'http://localhost:3000',
        origin: 'https://blue-chat.netlify.app/',
        methods: ['GET', 'POST']
    }
})

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(router)


// SOCKET.IO terminology:-
// .on() - wait for the event to happen on the client-side and the handle it on server-side
// .emit() - trigger a event from the server-side that is to be handled on the client-side


// WAITING for the CONNECTION event to happen --- doing all the stuffs to handle a new user in order
io.on('connection', (socket) => {
    console.log("New Connection!!!")

    // WAITING for the JOIN event to happen --- adding the new user
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ ID: socket.id, name, room })      // adding the new user

        // if an error is encountered while adding the new user
        if (error)
            return callback(error)

        if (user) {
            // EMIT event called MESSAGE --- sending a welcome message to the new user ONLY
            socket.emit('message', {
                user: "admin",
                text: `${user.name}, welcome to the ${user.room} room.`
            })

            // EMIT event called MESSAGE --- sending a notification to all the other users in the same room about the new joining (EXCEPT the new user)
            socket.broadcast.to(user.room).emit('message', {
                user: "admin",
                text: `${user.name} has joined the room!`
            })

            socket.join(user.room)              // adding the user to the specific room

            // EMIT an event called ROOM_DATA --- to get all the active users in the current room
            io.to(user.room).emit('roomData', { 
                room: user.room, 
                users: getUsersInRoom(user.room) 
            })
        }

        callback()                          // triggering callback on the client-side
    })

    // WAITING for the SEND_MESSAGE event to happen --- doing the message sending stuffs
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)                 // getting the current instance of the user
        
        if (user) {
            // EMIT event called MESSAGE --- sending message to all the users in the same room
            io.to(user.room).emit('message', {
                user: user.name,
                text: message
            })
        }

        callback()                         // triggering callback on the client-side
    })

    // WAITING for the CONNECTION event to happen - disconnecting the user and doing all the clean stuffs
    socket.on('disconnect', () => {
        const removedUser = removeUser(socket.id)           // removing the user from the users array

        if (removedUser) {
            // EMIT event called MESSAGE --- to notify all the other users in the same room about the user that just left
            io.to(removedUser.room).emit('message', { 
                user: "admin",
                text: `${removedUser.name} has left.` 
            })

            // EMIT an event called ROOM_DATA --- to get all the NEW STATE of active users in the current room
            io.to(removedUser.room).emit('roomData', {
                room: removedUser.room,
                users: getUsersInRoom(removedUser.room)
            })
        }
    })
})



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))