import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Start = () => {
    return (
        <>
            <div className="Home">
                        <h1>Take the Quiz</h1>
                        {/*<button className="Play-button-container">Play</button>
                        <div className="Play-button-container">
                            <Link to="/questions">Play</Link>
                        </div>*/}
                        
                        
                        <Link to="/play/instructions" className="auth-button">Play</Link>
                        
            </div>
        </>
    )
}

export default Start
