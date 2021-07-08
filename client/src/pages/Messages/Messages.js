import React, { useEffect, useState } from 'react'
import "./Messages.css"
import Axios from 'axios'

function Messages() {
    const [relationList, setRelationList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChatId, setCurrentChatId] = useState(-1);

    function handleChange(currentMessage) {
        setNewMessage(currentMessage);
      }


    useEffect(() => {
            var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                Axios.post(urlPrefix + "/user/get_previews", { userId: 292 })
                    .then((response) => {
                        var tmpRelationList = response.data.map((item, key) => {
                                return (
                                // <p key = { key } > { item.id }, { item.name }, { item.old } </p>)
                                <div className="person" data-chat="person1" onClick={() => {
                                    setCurrentChatId(item.id);
                                    console.log("Clicked");
                                    }}>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                                <span className="name">{item.name}</span>
                                <span className="time">{item.timestamp}</span>
                                <span className="preview">{item.message}</span>
                                </div>)
                                ;
                                }); 
                                setRelationList(tmpRelationList);
                                setCurrentChatId(tmpRelationList[0].id);
                                //refreshMessage(urlPrefix, tmpRelationList[0].id);
                        });
                        //refreshMessage(urlPrefix, currentChat.id);
                }
                , [])

        useEffect(() => {
            console.log("Coucou");
            console.log(currentChatId);
            var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                Axios.post(urlPrefix + "/user/get_messages", { userId: 292, friendId:currentChatId})
                    .then((response) => {                         
                        var tmpMessageList = response.data.map((item, key) => {
                            return (
                                <div className={item.id == 292 ? "bubble me" : "bubble you"}>
                                    {item.message}
                                </div>
                            );
                        }); setMessageList(tmpMessageList);
                    });
        } ,[currentChatId])
    
                return (
                        <div className="wrapper">
                        <div className="container">
                            <div className="left">
                                <div className="top">
                                    <input type="text" placeholder="Search" />
                                </div>
                                <div className="people">
                                    {relationList}
                                </div>
                            </div>
                            <div className="right">
                                <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
                                <div className="chatWrap">
                                <div className="chat active-chat" data-chat="person4">
                                {messageList}
                                    {/* <div className="bubble me">
                                        Hey human!
                                    </div>
                                    <div className="bubble me">
                                        Umm... Someone took a shit in the hallway.
                                    </div>
                                
                                    <div className="bubble me">
                                        Hey human!
                                    </div>
                                    <div className="bubble me">
                                        Umm... Someone took a shit in the hallway.
                                    </div>
                                    <div className="bubble you">
                                        ... what.
                                    </div>
                                    <div className="bubble you">
                                        Are you serious?
                                    </div>
                                    <div className="bubble me">
                                        I mean...
                                    </div>
                                
                                    <div className="bubble me">
                                        It’s not that bad...
                                    </div> */}
                                </div>
                                </div>
                                <div className="write">
                                    <input type="text" value={newMessage} onChange={event => setNewMessage(event.target.value)}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                                                Axios.post(urlPrefix + "/user/send_message", { userId: 292, friendId: {currentChatId}, message:{newMessage} }).then((response) => {
                                                });
                                                const newElement = <div className= {"bubble me"}> {newMessage} </div>;
                                                setMessageList(messageList => [...messageList, newElement]);
                                                setNewMessage("");
                                            }
                                     }} />
                                    <a href="javascript:;" className="write-link send"></a>
                                </div>
                            </div>
                        </div>
                        </div>
        )
    }

    export default Messages