import React, { useEffect, useState } from 'react'
import "./Messages.css"
import Axios from 'axios'

function Messages() {
    const [relationList, setRelationList] = useState([]);


    // document.querySelector('.chat[data-chat=person2]').classList.add('active-chat');
    // document.querySelector('.person[data-chat=person2]').classList.add('active');
    
    // let friends = {
    //   list: document.querySelector('ul.people'),
    //   all: document.querySelectorAll('.left .person'),
    //   name: '' },
    
    // chat = {
    //   container: document.querySelector('.container .right'),
    //   current: null,
    //   person: null,
    //   name: document.querySelector('.container .right .top .name') };
    
    
    // friends.all.forEach(f => {
    //   f.addEventListener('mousedown', () => {
    //     f.classList.contains('active') || setAciveChat(f);
    //   });
    // });
    
    // function setAciveChat(f) {
    //   friends.list.querySelector('.active').classList.remove('active');
    //   f.classList.add('active');
    //   chat.current = chat.container.querySelector('.active-chat');
    //   chat.person = f.getAttribute('data-chat');
    //   chat.current.classList.remove('active-chat');
    //   chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat');
    //   friends.name = f.querySelector('.name').innerText;
    //   chat.name.innerHTML = friends.name;
    // }

    useEffect(() => {
            var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";

            Axios.post(urlPrefix + "/user/get_relationships", { userId: 253 })
                .then((response) => {
                        console.log(response.data);

                        var tmpRelationList = response.data.map((item, key) => {
                                return (
                                // <p key = { key } > { item.id }, { item.name }, { item.old } </p>)
                                <li className="person" data-chat="person1">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                                <span className="name">{item.name}</span>
                                <span className="time">????</span>
                                <span className="preview"></span>
                                </li>)
                                
                                ;
                                }); setRelationList(tmpRelationList);

                        });
                }, [])
                return (
                        <div className="wrapper">
                        <div className="container">
                            <div className="left">
                                <div className="top">
                                    <input type="text" placeholder="Search" />
                                    <a href="javascript:;" className="search"></a>
                                </div>
                                <ul className="people">
                                    {relationList}
                                </ul>
                            </div>
                            <div className="right">
                                <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
    
                                <div className="chat active-chat" data-chat="person4">

                                    <div className="conversation-start">
                                        <span>Yesterday, 4:10 PM</span>
                                    </div>
                                    <div className="bubble me">
                                        Hey human!
                                    </div>
                                    <div className="bubble me">
                                        Umm... Someone took a shit in the hallway.
                                    </div>
                                    <div className="conversation-start">
                                        <span>Yesterday, 4:20 PM</span>
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
                                    <div className="conversation-start">
                                        <span>Yesterday, 4:30 PM</span>
                                    </div>
                                    <div className="bubble me">
                                        It’s not that bad...
                                    </div>
                                </div>
                              
                                <div className="write">
                                    <a href="javascript:;" className="write-link attach"></a>
                                    <input type="text" />
                                    <a href="javascript:;" className="write-link smiley"></a>
                                    <a href="javascript:;" className="write-link send"></a>
                                </div>
                            </div>
                        </div>
                    </div>

        )
    }

    export default Messages