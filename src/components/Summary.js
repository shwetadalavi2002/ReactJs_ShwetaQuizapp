import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
           /* wrongAnswers: 0,*/
            numberOfQuestions: 0,
        }
    }
    componentDidMount() {
        const { state } = this.props.location;
        this.setState({
            score: (state.score/state.numberOfAnsweredQuestions) * 100,
            
            /*numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            score:state.correctAnswers,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,score: state.correctAnswers,
            score: (state.correctAnswers/state.numberOfQuestions) * 100,
            wrongAnswers: state.wrongAnswers*/
        });
    }
    render() {
        const { state, score } = this.props.location;
        let stats, remark;
       
        if(score<=60){
            remark = 'Sorry you are not eligible to get best offer,Please try again!!!'
        }
        else if(score>60 && score<80){
            remark ='Very Good!!'
        }
        else{
            remark='Well Done!!!'
        }
        if (state !== undefined) {
            stats=(
            <>
                <div className="container-summary">
                    <h1>Quiz has ended</h1>
                    <h3>{remark}</h3>
                    <h2>Your Score:{this.state.score}/7</h2>
                </div>
                <section className="summary-btn">
                    
                        <Link to="/" id="summButton">Back to Home</Link>
                        <Link to="/play/Quiz" id="summButton1">Play Again</Link>
                    
                </section>
            </>
            )
        }
        else {
            stats = (
                <section>
                    <h1 className="no-stats">No statistics available</h1>
                    
                        <li><Link to="/" id="summButton">Back to Home</Link></li>
                        <li><Link to="/play/Quiz" id="summButton1">Take a Quiz</Link></li>
                    
                </section>

            )
        }
        return (
            <>
                {stats}
            </>
        )
    }
}

export default Summary