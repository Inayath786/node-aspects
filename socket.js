//creating web sockets

const express = require("express")
const http = require("http")
const path = require("path")
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve("./public")))
const io = new Server(server)

//io connection

io.on("connection", (socket) => {
   socket.on("new-message",(message)=>{
    io.emit("message",message)
   })
})

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html")
})
server.listen(3000, () => console.log("server started.."))