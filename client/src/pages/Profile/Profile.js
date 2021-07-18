import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios'

function Profile() {

    const [goToSlide, setGoToSlide] = useState(0);

    const [{image1, data1}, setImage1] = useState({image1: process.env.PUBLIC_URL + "/img/No_image.png", data1:null});
    const [{image2, data2}, setImage2] = useState({image2: process.env.PUBLIC_URL + "/img/No_image.png", data2:null});
    const [{image3, data3}, setImage3] = useState({image3: process.env.PUBLIC_URL + "/img/No_image.png", data3:null});

    const [gender, setGender] = useState("Undefined");
    const [orientation, setOrientation] = useState("Undefined");
    const [size, setSize] = useState("Undefined");
    const [inspiration, setInspiration] = useState("Undefined");
    const [technique, setTechnique] = useState("Undefined");
    const [surname, setSurname] = useState("Undefined");
    const [popularity, setPopularity] = useState("Undefined");
    const [age, setAge] = useState("Undefined");
    const [lastConnexion, setlastConnexion] = useState("Undefined");
    const [city, setCity] = useState("Undefined");
    const [hTags, setHTags] = useState("Undefined");
    const [name, setName] = useState("Undefined");
    const [editMod, setEditMod] = useState(false);
    const [currentDescription, setCurrentDescription] = useState("");

    function setImage(index, file)
    {
        const userId = 292;
        // console.log(file.name.split('.').pop());
        if(index === 1)
        {
            const newFile1 = new File([file], userId + "_image1." + file.name.split('.').pop(), {type: file.type});
            setImage1({image1:URL.createObjectURL(newFile1),data1:newFile1});
        }
        else if(index === 2)
        {
            const newFile2 = new File([file], userId + "_image2." + file.name.split('.').pop(), {type: file.type});
            setImage2({image2:URL.createObjectURL(newFile2), data2:newFile2});
        }
        else if(index === 3)
        {
            const newFile3 = new File([file], userId + "_image3." + file.name.split('.').pop(), {type: file.type});
            setImage3({image3:URL.createObjectURL(newFile3),data3:newFile3})
        }
    }

    const imageFldr = process.env.PUBLIC_URL + "/img/";
    const slides = [
        {
            key:0,
            content: 
                <div className="flapImage" id="idHot">                        
                    <img src={image1}  alt="image1" style={{overflow:"hidden", minWidth: "100%", minHeight: "100%", resizeMode: 'contain'}}/>
                    {goToSlide === 0 && editMod ? 
                    <label htmlFor="icon-button-file"> 
                        <input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} onChange={(e) =>  setImage(1, e.target.files[0])}/>
                        <img style={{overflow:"hidden"}} src={imageFldr + "unnamed.png"} width="75%" style={{position:"absolute", top:"50%", left: "50%", transform: "translate(-50%, -50%)"}} alt="Click to add Image1" />
                    </label>: null 
                    }
                </div>
        },
        {
            key:1,
            content:    
            <div className="flapImage" id="idHot">                        
            <img src={image2}  alt="image2" style={{overflow:"hidden", minWidth: "100%", minHeight: "100%", resizeMode: 'contain'}}/>
            {goToSlide === 1 && editMod ?
            <label htmlFor="icon-button-file"> 
                <input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} onChange={(e) => setImage(2, e.target.files[0])}/> 
                <img style={{overflow:"hidden"}} src={imageFldr + "unnamed.png"} width="75%" style={{position:"absolute", top:"50%", left: "50%", transform: "translate(-50%, -50%)"}} alt="Click to add Image2" />
            </label>: null 
            }
        </div>
        },
        {
            key:2,
            content: 
            <div className="flapImage" id="idHot">                        
            <img src={image3}  alt="image3" style={{overflow:"hidden", minWidth: "100%", minHeight: "100%", resizeMode: 'contain'}}/>
            {goToSlide === 2 && editMod ?
            <label htmlFor="icon-button-file"> 
                <input accept="*.png *.jpg *.jpeg" id="icon-button-file" type="file" style={{display: "none"}} onChange={(e) => setImage(3, e.target.files[0])}/>
                <img style={{overflow:"hidden"}} src={imageFldr + "unnamed.png"} width="75%" style={{position:"absolute", top:"50%", left: "50%", transform: "translate(-50%, -50%)"}} alt="Click to add Image3"/>
            </label>: null 
            }
        </div>
        },
    ].map((slide, index) => {
        return { ...slide, onClick: () => {setGoToSlide(index); console.log(index)} };
    });


    function upload_image()
    {
        
        var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
        const data = new FormData();
        if(data1)
        {
            data.append('file', data1);
            setImage1({image1: urlPrefix + "/" + data1.name, data1:data1})
        }
        if(data2)
        {
            data.append('file', data2);
            setImage2({image2: urlPrefix + "/" + data2.name, data2:data2});
        }
        if(data3)
        {
            data.append('file', data3);
            setImage3({image3: urlPrefix + "/" + data3.name, data3:data3});
        }
        Axios.post(urlPrefix + "/user/upload", data)
      .then(res => { // then print response status
        console.log(res.statusText)
      })
    }

    function refreshPage()
    {
        var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
        Axios.post(urlPrefix + "/user/get_profile", { userId: 292 })
            .then((response) => {
                setGender(response.data.gender);
                setOrientation(response.data.orientation);
                setSize(response.data.size);
                setInspiration(response.data.inspiration);
                setTechnique(response.data.technique);
                setSurname(response.data.surname);
                setPopularity(response.data.popularity);
                setAge(response.data.age);
                setlastConnexion(response.data.lastConnexion);
                setName(response.data.name);
                setCity(response.data.city);
                setCurrentDescription(response.data.description);
                setImage1({image1:response.data.image1, data1: data1})
                setImage2({image2:response.data.image2, data2: data2})
                setImage3({image3:response.data.image3, data3: data3})
        }, (error) => {
            console.log(error);
          }
        )
    }

    function update_profile()
    {
        //console.log(image2);
        var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
        upload_image();
        var name1 = image1;
        var name2 = image2;
        var name3 = image3;
        if(data1)
            name1 = urlPrefix + "/" + data1.name;
        if(data2)
            name2 = urlPrefix + "/" + data2.name;
        if(data3)
            name3 = urlPrefix + "/" + data3.name;
        Axios.post(urlPrefix + "/user/update_profile", { userId: 292, gender: gender, orientation:orientation, size:size, inspiration: inspiration, technique:technique, surname: surname, age:age, lastConnexion:lastConnexion, name:name, city:city, image1:name1, image2:name2, image3:name3, description:currentDescription}).then((response) => {
            refreshPage();
        })
        refreshPage();
    }

    useEffect(() => {
            refreshPage();
        }, [])

    return (
        <div className="backgroundProfile">
        <div style={{backgroundColor:"red", width:"50px", height:"50px", right:"0", position: "absolute" }}></div>
        <button onClick={() => {
            setEditMod(!editMod);
            refreshPage();
            }} style={{backgroundColor:"red", width:"50px", height:"50px", right:"0", position: "absolute" }}>
           {
            !editMod ? <EditIcon style={{width:"80%", height:"80%"}}/> : <ArrowBackIcon style={{width:"80%", height:"80%"}}/>
           }
        </button>
            <div className="PhotoZone">
                <Carousel
                    slides={slides}
                    goToSlide={goToSlide}
                    offsetRadius={2}
                    showNavigation={true}
                    animationConfig={config.gentle}
                />
            </div>
            <div className="AboutZone">
                <div className="appName" style={{ fontSize: "36px" }}>{name}</div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Gender : {gender}</div> : <div style={{ fontSize: "30px"}}>Gender : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setGender(event.target.value)}
                        value={gender}/></div>
                    }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Orientation : {orientation}</div> : <div style={{ fontSize: "30px"}}>Orientation : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setOrientation(event.target.value)}
                        value={orientation}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Sex Size : {size}</div> : <div style={{ fontSize: "30px"}}>Sex Size : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setSize(event.target.value)}
                        value={size}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Inspiration : {orientation}</div> : <div style={{ fontSize: "30px"}}>Inspiration : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setInspiration(event.target.value)}
                        value={inspiration}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Secret Technique : {technique}</div> : <div style={{ fontSize: "30px"}}>Secret Technique : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setTechnique(event.target.value)}
                        value={technique}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Surname : {surname}</div> : <div style={{ fontSize: "30px"}}>Surname : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setSurname(event.target.value)}
                        value={surname}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Popularity : {popularity}</div> : null
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Age : {age}</div> : <div style={{ fontSize: "30px"}}>Age : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setAge(event.target.value)}
                        value={age}/></div>
                }
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Last Connexion : {lastConnexion}</div> : null
                } 
                </div>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>City : {city}</div> : <div style={{ fontSize: "30px"}}>City : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setCity(event.target.value)}
                        value={city}/></div>
                }
                </div>
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>{currentDescription}</div> : <textarea className="AboutForm" style={{ backgroundColor:"white", color:"black", fontSize:"30px", height:"200px"}}
                        onChange={event => setCurrentDescription(event.target.value)}
                        value={currentDescription} />
                }
                <br/>
                <div className="AboutForm">
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>Tags : {hTags}</div> : <div style={{ fontSize: "30px"}}>Tags : <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={event => setHTags(event.target.value)}
                        value={hTags}/></div>
                }
                </div >
                {
                    <button onClick={() => {
                    setEditMod(!editMod);
                    update_profile();
                    refreshPage();
                    }} style={{backgroundColor:"green", width:"100%", height:"100px", position: "relative", fontSize: "30px" }}>
                        Save Modification
                    </button>
                }
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Profile