import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Instructions = () => {
    return(
    <>
         <div className="Instruct-container">
             <h1>Quiz Instructions</h1>
             <h3>How to play the game</h3>
             <p>Ensure to read all the instructions before starting the game</p>
             <div className="browser-default">
             <ul id="main-list">
                  <li>The game has duration of 5 minutes</li>
                  <li>Each game consists of 5 questions</li>
                  <li>Every question has 4 options</li>
                  <li>Feel free to quit the game at any time</li>
                  <li>The timer starts as soon as the game loads</li>
             </ul>
             </div>
             <div className="btn-link">
                 <span className="left"><Link to="/">Back</Link></span>
                 <span className="right"><Link to="/play/Quiz">Proceed</Link></span>
             </div>
         </div>
    </>        

    )
    
}

export default Instructions
