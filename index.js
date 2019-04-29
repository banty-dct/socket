const express = require("express")
const socket = require("socket.io")

const app = express()
const port = 3005

//static files
app.use(express.static("public"))

//run server
const server = app.listen(port, function(){
    console.log("Listening on port " + port)
})

//socket
const io = socket(server)
io.on("connection", function(socket){
    console.log("Socket connected", socket.id)

    //get client msg
    socket.on("chat", function(data){
        io.sockets.emit("chat", data)
    })

    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data)
    })
})