import React from 'react'
import TeaImage from "../images/TeaBanner.jpg";

const About = () => {
    return (
        <div id="about">
            <div className="about-text">
                <h1> DEVELOPER </h1>
                <p style={{ fontSize:"50px" }}> CHIRAG DALE </p>
                <button>Read More</button>
            </div>
            <div className="about-image">
                <img src={TeaImage} alt="About"/>
            </div>
        </div>
    )
}

export default About
