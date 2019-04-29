//make connection
const socket = io.connect("http://localhost:3005")

//query dom
const message   = document.getElementById("message"),
      handle    = document.getElementById("handle"),
      btn       = document.getElementById("send"),
      output    = document.getElementById("output")
      typing  = document.getElementById("feedback")

//emit event
btn.addEventListener("click", function(){
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    })
    message.value = ""
})
message.addEventListener("keypress", function(){
    socket.emit("typing",{
        handle: handle.value
    })
})

//listen events
socket.on("chat", function(data){
    typing.innerHTML = ""
    output.innerHTML += `<p><b>${data.handle}</b> : ${data.message}</p>`
})
socket.on("typing", function(data){
    typing.innerHTML = `<p>${data.handle} is typing...</p>`
})