import React, { useState, useEffect } from 'react';
import './MobileDropdown.css';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SidebarChannel from './SidebarChannel';
import db, { auth } from './firebase';

function MobileDropdown({ display }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot(snapshot => {
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        channel: doc.data()
      })))
    });
  }, [])

  const handleAddChannel = () => {
    const channelName = prompt('enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName
      })
    }
  }

  const displayHeader = () => {
    return display ? {display: "block"} : {display: "none"}
  }

  return (
    <div className="mobileDropdown" style={displayHeader()}>
      <div className="mobildDropdown__channels">

        <div className="mobildDropdown__logout" onClick={() => auth.signOut()}>
          <div className="mobildDropdown__header">
            <h4>Logout</h4>
          </div>
          <ExitToAppOutlinedIcon onClick={() => auth.signOut()} className="sidebar__addChannel"/>
        </div>

        <div className="mobildDropdown__addChannel">
          <div className="mobildDropdown__header" onClick={handleAddChannel}>
            <h4>Add Channel</h4>
          </div>
          <AddIcon className="sidebar__addChannel" onClick={handleAddChannel}/>
        </div>
       
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}/>
          ))} 
        </div>
      </div>
    </div>
  )
}

export default MobileDropdown
