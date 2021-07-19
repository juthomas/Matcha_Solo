import React, { useEffect, useState } from 'react'
import "./Messages.css"
import Axios from 'axios'

function Messages() {
    const [relationList, setRelationList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChatId, setCurrentChatId] = useState(-1);
    const [currentChatName, setCurrentChatName] = useState("");
    const [currentChatLastConnexion, setCurrentChatLastConnexion] = useState("");
    const [lastKey, setLastKey] = useState(-1);
    const [nameBegin, setNameBegin] = useState("");

    function DisplayConnection(timestamp)
    {
        const time = Math.floor((Date.now() - new Date(timestamp)) / 1000 / 60 / 60);
        if(time < 24)
            return ("< 24h");
        else if(time < 48)
            return ("Yesterday");
        else if(time < 168)
            return ("This week");
        return ("More than a week");
    }


    useEffect(() => {
            var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                Axios.post(urlPrefix + "/user/get_previews", { userId: 292, nameBegin:{nameBegin} })
                    .then((response) => {
                        var tmpRelationList = response.data.map((item, key) => {
                                return (
                                <div key={key} className="person" data-chat="person1" onClick={() => {
                                    setCurrentChatId(item.id);
                                    setCurrentChatName(item.name);
                                    setCurrentChatLastConnexion(DisplayConnection(item.lastConnexion));
                                    console.log("Clicked");
                                    }}>
                                <img src={item.src ? item.src : process.env.PUBLIC_URL + "/img/No_image.png"} alt={item.name + " photo"} />
                                <span className="name">{item.name}</span>
                                <span className="time">{DisplayConnection(item.lastConnexion)}</span>
                                <span className="preview">{item.message}</span>
                                </div>)
                                ;
                                });
                                setRelationList(tmpRelationList);
                                if(tmpRelationList[0])
                                    setCurrentChatId(tmpRelationList[0].id);
                        });
                }
                , [nameBegin])

        useEffect(() => {
            console.log(currentChatId);
            var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                Axios.post(urlPrefix + "/user/get_messages", { userId: 292, friendId:currentChatId})
                    .then((response) => {                         
                        var tmpMessageList = response.data.map((item, key) => {
                            return (
                                <div key = {key} className={item.id === 292 ? "bubble me" : "bubble you"}>
                                    {item.message}
                                </div>
                            );
                        }); setMessageList(tmpMessageList);
                        setLastKey(tmpMessageList.length);
                    });
        } ,[currentChatId])
    
                return (
                        <div className="wrapper">
                        <div className="container">
                            <div className="left">
                                <div className="top">
                                    <input type="text" placeholder="Search" value={nameBegin} onChange={event => setNameBegin(event.target.value)} />
                                </div>
                                <div className="people">
                                    {relationList}
                                </div>
                            </div>
                            <div className="right">
                            <div className="top"><span><span className="name">{currentChatName}       {currentChatLastConnexion}</span></span></div>
                                <div className="chatWrap">
                                <div className="chat active-chat" data-chat="person4">
                                {messageList}
                                </div>
                                </div>
                                {
                                    currentChatName ?
                                <div className="write">
                                    <input type="text" placeholder="Press Enter to send" value={newMessage} onChange={event => setNewMessage(event.target.value)}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
                                                Axios.post(urlPrefix + "/user/send_message", { userId: 292, friendId: {currentChatId}, message:{newMessage} }).then((response) => {
                                                });
                                                const newElement = <div key={lastKey + 1} className= {"bubble me"}> {newMessage} </div>;
                                                setMessageList(messageList => [...messageList, newElement]);
                                                setNewMessage("");
                                                setLastKey(lastKey + 1);
                                            }
                                     }} />
                                </div>
                                :null
                                }
                            </div>
                        </div>
                        </div>
        )
    }

    export default Messages