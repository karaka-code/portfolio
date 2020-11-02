import React, {useState} from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import "./HomePage.css"
import LiveChat from "../components/LiveChat";


const HomePage = () => {
    const [selected, setSelected] = useState(true)

    return (
        <div className="container home">
            <div className="container-left">
                <h2 style={{marginBottom: 20}}>Vladyslav Yaromiy</h2>
                <p>Hello , im a full stack web developer from Ukraine</p>
                <ul>
                    <div className="tabs">
                        <li className="one" onClick={() => setSelected(true)}>Skills</li>
                        <li className="two" onClick={() => setSelected(false)}>Projects</li>
                    </div>
                </ul>
                {selected
                    ? <div style={{height: 250}}>
                        <p style={{fontSize: 16, fontWeight: "bold"}}>My tech skills: </p>
                        <div className="skill-tables" >
                            <div className="skill-list">
                                <p>Frontend stack:</p>
                                <p>-- Main: React/Redux,</p>
                                <p>JavaScript HTML & CSS,</p>
                                <p>-- Additional: MaterialUI, Bootstrap</p>
                            </div>
                            <div className="skill-list">
                                <p>Backend stack:</p>
                                <p>-- NodeJS, Express</p>
                                <p>Database layer:</p>
                                <p>-- MongoDB</p>
                            </div>
                        </div>
                    </div>
                    : <div style={{height: 250}}>
                        <p>Online shop website: <a rel="noopener noreferrer" href="https://yva.com.ua/" target="_blank">yva.com.ua</a></p>
                        <p>More on my github: <a rel="noopener noreferrer" href="https://github.com/asce-del" target="_blank"><GitHubIcon
                            style={{fontSize: 28}}/></a></p>
                    </div>
                }
            </div>
            <div className="container-right">
                <div className="medias">
                    <h4>My media: </h4>
                    <div className="links">
                        <a  rel="noopener noreferrer" href="https://www.instagram.com/ulceora/?hl=en" target="_blank"><InstagramIcon
                            style={{fontSize: 28}}/></a>
                        <a  rel="noopener noreferrer" href="https://www.linkedin.com/in/vladyslav-yaromiy-48b4b7198/" target="_blank"><LinkedInIcon
                            style={{fontSize: 28}}/></a>
                    </div>
                </div>
                <div className="contact">
                    <h4>Contact me: </h4>
                    <span style={{marginLeft: 5}}> vlad.yaromiy@gmail.com</span>
                </div>
                <LiveChat />
            </div>
        </div>
    )
}

export default HomePage