import React from "react";

export const ShowOnline = ({
  messageList,
  setMessage,
  sendMessage,
  userName,
  users,
  handleIn,
  choosen,
  me
}) => {

  console.log(window.screen.height)

// console.log('me',me)
  // console.log(choosen.id)
  // console.log(messageList)
  return (
    <div className="popular_container">
      <div className="users">
        {users.filter(e=>e.name!==userName).map((user,key) => {
          const elements=JSON.stringify(user)
          return (
            <div onClick={handleIn} data-id={elements}  key={key}>
              <span style={{backgroundColor:user.status?`#5ff064`:'#798079'}}></span>
              <div>{user.name}</div>
            </div>
          );
        })}
      </div>

      <div className="chatContainer">
        <div>{choosen.name}</div>
        <div className="messages" style={{maxHeight:window.screen.availHeight-50}}>
          {messageList[0]?messageList.filter(e=>(e.to===me&&e.from===choosen.id)||(e.to===choosen.id&&e.from===me)).map((val, key) => {
            // console.log('hii',val)
            return (
              <div
              key={key}
                className="messageContainer"
                id={val.content.author == userName ?"Other": "You"}
              >
                <div className="messageIndividual">
                  {val.content.author}: {val.content.message}
                </div>
              </div>
            );
          }):''}
        </div>

        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
