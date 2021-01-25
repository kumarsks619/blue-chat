const users = []            // to collect all the user objects
const rooms = []            // to collect all the active rooms

// function to add a new room
const createRoom = (roomName) => rooms.push(roomName)

// function to delete a room
const deleteRoom = (roomName) => {
    const roomIndex = rooms.findIndex(room => room === roomName)
    if (roomIndex !== -1)
        rooms.splice(roomIndex, 1)
}

// function to add a new user
const addUser = ({ ID, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // checking for any existing room with the same room name
    const roomIndex = rooms.findIndex(r => r === room)
    if (roomIndex === -1)
        createRoom(room)

    // checking for any existing user with same username in the same room
    const existingUser = users.find((user) => user.room === room && user.name === name)

    if (existingUser)
        return {
            error: "Username is already taken!!!"
        }
    
    // create a new user if no existing user is found
    const newUser = {
        ID,
        name,
        room
    }

    users.push(newUser)         

    return { user: newUser }          // return the new user
}

// function to remove an existing user
const removeUser = (ID) => {
    // checking if the user that is just leaving is the last user in the room
    const leavingUser = getUser(ID)
    if (leavingUser) {
        const numOfUsers = getUsersInRoom(leavingUser.room)
        if (numOfUsers.length === 1)
            deleteRoom(leavingUser.room)
    }
    

    // finding the index of the user to be removed
    const index = users.findIndex((user) => user.ID === ID)

    // if user with the provided ID is found 
    if (index !== -1)
        return users.splice(index, 1)[0]        // remove the user and return the removed user
}


// function to get a specific user
const getUser = (ID) => users.find((user) => user.ID === ID)


// function to get all the users in a specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room)

// function to get all the active rooms
const getRooms = () => rooms


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getRooms
}