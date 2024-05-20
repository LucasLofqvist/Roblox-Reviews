import React from "react";
import imgRickard from '../img/Rickard.jpg'
import imgLucas from '../img/Lucas.jpg'
import imgFred from '../img/Fred.jpg'
import imgBeilan from '../img/Beilan.jpg'

const aboutUsPage = () => {

return (
    <div className="aboutUsInfo">
        <div className="person">
            <img src={imgRickard} alt="person 1"></img>
            <div className="personInfo">
                <h5>Rickard Sturesson</h5>
                <p><strong>Team-Leader, Back-end Development</strong></p>
                <p>Hey there, I'm Rickard! My role in this Fullstack project involves backend development and security/authentication. As the team leader, I also focus on project oversight and testing.
                    When I'm not coding, you'll find me spending quality time with my family, baking sourdough bread, playing volleyball, or going for runs
                    <br></br>
                    <br></br>
                    <strong>Favorite Show:</strong> Frank & Kastaniegaarden</p>
            </div>
        </div>
    
        <div className="person">
            <img src={imgLucas} alt="person 2"></img>
            <div className="personInfo">
                <h5>Lucas Löfqvist</h5>
                <p><strong>Back-end Development</strong></p>
                <p>Hi everyone, I'm Lucas! At the moment, I'm involved in crafting APIs, building models, and managing the backend for our Fullstack project. 
                    I also like to hang out with family and friends, enjoy good movies, cooking up some tasty dishes, or just taking it easy.
                    <br></br>
                    <br></br>
                    <strong>Favorite Show:</strong> The Office</p>
            </div>
        </div>

        <div className="person">
            <img src={imgFred}alt="person 3"></img>
            <div className="personInfo">
                <h5>Fredrik Ottenfelt</h5>
                <p><strong>Front-end Development</strong></p>
                <p>Hey there, I'm Fredrik! Currently knee-deep in front-end and React stuff for this Fullstack project.
                    When I'm not coding, you'll find me soaking up good times with friends, 
                    jamming out to music, hitting up concerts, or cruising on my skateboard.
                    <br></br>
                    <br></br>
                    <strong>Favorite Show:</strong> Supernatural</p>
            </div>
        </div>

        <div className="person">
            <img src={imgBeilan} alt="person 4"></img>
            <div className="personInfo">
                <h5>Beilan Guo</h5>
                <p><strong>Front-end Development</strong></p>
                <p>Hi, I'm Beilan! I led frontend development, creating React components and 
                    making updates from user testing to enhance security and usability. 
                    Outside of coding, I enjoy spending time with friends, savoring tasty food, 
                    golfing, and crafting DIY jewelry.
                    <br></br>
                    <br></br>
                    <strong>Favorite Show:</strong> Julia</p>
            </div>
        </div>
    </div>
)
}

export default aboutUsPage;