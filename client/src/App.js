import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {ShowOnline} from './showOnline'
import "./App.css";

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [me, setme] = useState("");
  const [choosen,setchosen]=useState({})

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userList,setUsers]=useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(data);
      // console.log(data)
    });
  },[]);
  useEffect(() => {
    socket.on("online_users", (data) => {
      // setMessageList([...messageList, data]);
      setUsers(data)
      // console.log(data)
    });
  },[loggedIn]);
  useEffect(() => {
    socket.on("me", (data) => {
      // setMessageList([...messageList, data]);
      setme(data)
      // console.log(data)
    });
  },[]);


  const connectToRoom = async() => {
    
   await socket.emit("online", userName);
   
    setLoggedIn(true);
  };
  const sendMessage = async () => {
    if(choosen.id){
      let messageContent = {
        to: choosen.id,
        from:me,
        content: {
          author: userName,
          message: message,
        },
      };
  
      await socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent]);
      setMessage("");
    }
   
  };

  const handlechats=(e)=>{
const elements =JSON.parse(e.target.dataset.id);
setchosen(elements)
  }
  // console.log(messageList)
  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : <ShowOnline me={me} choosen={choosen} handleIn={handlechats} messageList={messageList} users={userList} setMessage={setMessage} sendMessage={sendMessage} userName={userName}/>}
  </div>
  )}

export default App;
