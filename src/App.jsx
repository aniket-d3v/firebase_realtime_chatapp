import { useState,useEffect } from 'react'
import getrdatabase from './firebase-config'
import { ref,push,get,set,onValue } from 'firebase/database'
import './App.css'

function App() {
  const [name,setName]=useState('')
  const [submitt,Setsubmitted]=useState(false);
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([])

  useEffect(() => {
    const dbref = ref(getrdatabase, "messages");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      const formattedData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setMessages(formattedData);
    });
  }, []);


const SendMessage=async(e)=>{
  e.preventDefault();
  const messageRef=ref(getrdatabase,"messages")
  const newMessage = {
    id: messages.length + 1,
    name: name,
    message: message,
  };
  push(messageRef, newMessage);

  // setMessages(prevMessages => [...prevMessages, newMessage]);
  
  console.log("message sent successfull")
  setMessage('')
}
console.log(messages)
  return (
    <>
  <div className='main'>
      <h1>A Chatapp</h1>
      {messages && messages.map((message) => (
  message.name === name ? 
    <div className='chatmessageButme' key={message.id}>
      <span>{message.message}</span>
      <p>{message.name}</p>
    </div>
  :
    <div className='chatmessage' key={message.id}>
      <p>{message.name}</p>
      <span>{message.message}</span>
    </div>
))}
      {submitt ? (
        <div className='floating'>
          <form onSubmit={SendMessage}>
            <input
              type="text"
              placeholder='Send Message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <br/>
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
       <center>
         <div className='floating'>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => Setsubmitted(true)}>Submit</button>
        </div>
       </center>
      )}
    </div>
    
    </>
  )
}

export default App
