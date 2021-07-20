import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios'
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay"
import AboutForm from "../../components/AboutForm/AboutForm"

function Profile() {

    const [goToSlide, setGoToSlide] = useState(0);

    const [{image1, data1}, setImage1] = useState({image1: process.env.PUBLIC_URL + "/img/No_image.png", data1:null});
    const [{image2, data2}, setImage2] = useState({image2: process.env.PUBLIC_URL + "/img/No_image.png", data2:null});
    const [{image3, data3}, setImage3] = useState({image3: process.env.PUBLIC_URL + "/img/No_image.png", data3:null});
    const [{image4, data4}, setImage4] = useState({image4: process.env.PUBLIC_URL + "/img/No_image.png", data4:null});
    const [{image5, data5}, setImage5] = useState({image5: process.env.PUBLIC_URL + "/img/No_image.png", data5:null});

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
    //const [slides, setSlides] = useState([]);

    function setImage(index, file)
    {
        const userId = 470;
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
        else if(index === 4)
        {
            const newFile4 = new File([file], userId + "_image4." + file.name.split('.').pop(), {type: file.type});
            setImage4({image4:URL.createObjectURL(newFile4),data4:newFile4})
        }
        else if(index === 5)
        {
            const newFile5 = new File([file], userId + "_image5." + file.name.split('.').pop(), {type: file.type});
            setImage5({image5:URL.createObjectURL(newFile5),data5:newFile5})
        }
    }

    const slides = [
        {
            key:0,
            content: 
            <ImageDisplay image={image1} onChange={(e) =>  setImage(1, e.target.files[0])} currentSlide={goToSlide === 0} editMod={editMod}/>
        },
        {
            key:1,
            content:    
            <ImageDisplay image={image2} onChange={(e) =>  setImage(2, e.target.files[0])} currentSlide={goToSlide === 1} editMod={editMod}/>
        },
        {
            key:2,
            content: 
            <ImageDisplay image={image3} onChange={(e) =>  setImage(3, e.target.files[0])} currentSlide={goToSlide === 2} editMod={editMod}/>
        },
        {
            key:3,
            content: 
            <ImageDisplay image={image4} onChange={(e) =>  setImage(4, e.target.files[0])} currentSlide={goToSlide === 3} editMod={editMod}/>
        },
        {
            key:4,
            content: 
            <ImageDisplay image={image5} onChange={(e) =>  setImage(5, e.target.files[0])} currentSlide={goToSlide === 4} editMod={editMod}/>
        },
    ].map((slide, index) => {
        return { ...slide, onClick: () => {setGoToSlide(index); console.log(image5)} };
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
        if(data4)
        {
            data.append('file', data4);
            setImage4({image4: urlPrefix + "/" + data4.name, data4:data4});
        }
        if(data5)
        {
            data.append('file', data5);
            setImage5({image5: urlPrefix + "/" + data5.name, data5:data5});
        }
        Axios.post(urlPrefix + "/user/upload", data)
      .then(res => { // then print response status
        console.log(res.statusText)
      })
    }

    function refreshPage(isInEdit)
    {
        console.log(editMod);
        var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
        Axios.post(urlPrefix + "/user/get_profile", { userId: 470 })
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
                setImage1({image1:response.data.images[0] ? response.data.images[0] : process.env.PUBLIC_URL + "/img/No_image.png", data1: null})
                setImage2({image2:response.data.images[1] ? response.data.images[1] : process.env.PUBLIC_URL + "/img/No_image.png", data2: null})
                setImage3({image3:response.data.images[2] ? response.data.images[2] : process.env.PUBLIC_URL + "/img/No_image.png", data3: null})
                if(response.data.images[3])
                    setImage4({image3:response.data.images[3], data4: null})
                if(response.data.images[4])
                    setImage5({image3:response.data.images[4], data5: null})
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
        var name4 = image4;
        var name5 = image5;
        if(data1)
            name1 = urlPrefix + "/" + data1.name;
        if(data2)
            name2 = urlPrefix + "/" + data2.name;
        if(data3)
            name3 = urlPrefix + "/" + data3.name;
        if(data4)
            name4 = urlPrefix + "/" + data4.name;
        if(data5)
            name5 = urlPrefix + "/" + data5.name;
        Axios.post(urlPrefix + "/user/update_profile", { userId: 470, gender: gender, orientation:orientation, size:size, inspiration: inspiration, technique:technique, surname: surname, age:age, lastConnexion:lastConnexion, name:name, city:city, image1:name1, image2:name2, image3:name3, image4:name4, image5:name5, description:currentDescription}).then((response) => {
            refreshPage(!editMod);
        })
    }

    useEffect(() => {
            refreshPage(false);
        }, [])

    return (
        <div className="backgroundProfile">
        <div style={{backgroundColor:"red", width:"50px", height:"50px", right:"0", position: "absolute" }}></div>
        <button onClick={() => {
            setEditMod(!editMod);
            console.log("Edit Mode : " + editMod);
            refreshPage(!editMod);
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
                <AboutForm subject="Gender :" value={gender} editMod={editMod} onChange={event => setGender(event.target.value)} canEdit={true} />
                <AboutForm subject="Orientation :" value={orientation} editMod={editMod} onChange={event => setOrientation(event.target.value)} canEdit={true} />
                <AboutForm subject="Sex Size :" value={size} editMod={editMod} onChange={event => setSize(event.target.value)} canEdit={true} />
                <AboutForm subject="Inspiration :" value={inspiration} editMod={editMod} onChange={event => setInspiration(event.target.value)} canEdit={true} />
                <AboutForm subject="Secret Technique :" value={technique} editMod={editMod} onChange={event => setTechnique(event.target.value)} canEdit={true} />
                <AboutForm subject="Surname :" value={surname} editMod={editMod} onChange={event => setSurname(event.target.value)} canEdit={true} />
                <AboutForm subject="Popularity :" value={popularity} editMod={editMod} canEdit={false} />
                <AboutForm subject="Age :" value={age} editMod={editMod} onChange={event => setAge(event.target.value)} canEdit={true}/>
                <AboutForm subject="Last Connexion :" value={lastConnexion} editMod={editMod} canEdit={false} />
                <AboutForm subject="City :" value={city} editMod={editMod} onChange={event => setCity(event.target.value)}/>
                <AboutForm subject="Orientation :" value={orientation} editMod={editMod} onChange={event => setOrientation(event.target.value)}/>
                { 
                        !editMod ? <div style={{ fontSize: "30px"}}>{currentDescription}</div> : <textarea className="AboutForm" style={{ backgroundColor:"white", color:"black", fontSize:"30px", height:"200px"}}
                        onChange={event => setCurrentDescription(event.target.value)}
                        value={currentDescription} />
                }
                <br/>
                <AboutForm subject="Tags :" value={hTags} editMod={editMod} onChange={event => setHTags(event.target.value)} canEdit={true}/>
                {
                    editMod ?
                    <button onClick={() => {
                    setEditMod(!editMod);
                    update_profile();
                    refreshPage(!editMod);
                    }} style={{backgroundColor:"green", width:"100%", height:"100px", position: "relative", fontSize: "30px" }}>
                        Save Modification
                    </button>
                    :null
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