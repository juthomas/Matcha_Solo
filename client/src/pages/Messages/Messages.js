import React, { useEffect, useState } from 'react'
import "./Messages.css"
import Axios from 'axios'

function Messages() {
    const [, setRelationList] = useState([]);


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
                    </div>

        )
    }

    export default Messages