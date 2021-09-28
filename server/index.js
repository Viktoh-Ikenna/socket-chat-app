const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});

io = socket(server);
let user=[];
let messages=[];
io.on("connection", (socket) => {
  // console.log(socket.id);
  socket.on("online", (data) => {
    // console.log(data)
    socket.join('online');
    socket.join(socket.id);
    user.push({name:data,status:true,id:socket.id})
    socket.to('online').emit('online_users',user)
    socket.emit('me',socket.id)
    // console.log("User Joined Room: " + data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    messages.push(data)
  
    socket.to(data.to).emit("receive_message", messages);
  });

  socket.on("disconnect", () => {
    // console.log("USER DISCONNECTED",socket.id);
    if(user[0]!==undefined){
      let filtered=user.filter(d=>d.id===socket.id)[0];
      if(filtered.name){
        const offline={...filtered,status:false}
        let current=user.filter(d=>d.id!==socket.id);
        user=[...current,offline];
        socket.to('online').emit('online_users',user);
        console.log(user)
      }
     
    }
    
  });
});
