import React, { useState, useEffect } from 'react';
import './chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user
    });

    setInput("");
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName}/>

      <div className="chat__placeholder" style={channelName ? {display: "none"} : {display: "flex"}}>
        <span>Select a channel to start chatting.</span>
      </div>

      <div className="chat__messages">
        {messages.map(message => ( 
          <Message 
            timestamp={message.timestamp}
            message={message.message}
            user={message.user} />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form onSubmit="return false;">
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`} />
          <button
            className="chat__inputButton"
            disabled={!channelId}
            type="submit"
            onClick={sendMessage}>
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <PhotoCameraOutlinedIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large"/>
        </div>

        <div className="chat__sendIcon">
          <SendRoundedIcon style={{display: "none"}}onClick={sendMessage}/>
        </div>
      </div>
    </div>
  )
}

export default Chat
