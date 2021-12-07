import React from "react";
import './style.css'
import questions from '../Ques.json'
import isEmpty from "./IsEmpty";
import M from 'materialize-css';
import classNames from 'classnames';

class PlayQuiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
           /* Hints:5,
            fiftyfifty:2,
            usedfiftyfifty:false,*/
            time: {}
        }
        this.interval = null;
    }

    componentDidMount (){
        const {questions,currentQuestion,nextQuestion,previousQuestion} = this.state;
       this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion)
       this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    displayQuestions =(questions=this.state.questions, currentQuestion, nextQuestion, previousQuestion) =>{
        let{ currentQuestionIndex } = this.state;
        if(!isEmpty(this.state.questions)){
           questions=this.state.questions;
           currentQuestion=questions[currentQuestionIndex];
           nextQuestion=questions[currentQuestionIndex+1];
           previousQuestion=questions[currentQuestionIndex-1];
           const answer =currentQuestion.answer;
           this.setState({
               currentQuestion,
               nextQuestion,
               previousQuestion,
               answer
           },()=>{
               this.handleDisableButton();
           })
        }
    };
    handleOptionClick = (e) =>{
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer();
        }
        else{
            this.wrongAnswer();
        }
    }
    handleNextButtonClick =()=>{
        if(this.state.nextQuestion !==undefined){
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex+1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            })
        }
    }
    handlePreviousButtonClick =()=>{
        if(this.state.previousQuestion !==undefined){
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex-1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            })
        }
    }
    handleQuitButtonClick =()=>{
        //window.confirm('Are you sure you want to quit?');
       if(window.confirm('Are you sure you want to quit?')){
           this.props.history.push('/');
       } 
    }
    handleButtonClick=(e)=>{
        switch(e.target.id){
            case 'next-btn':
                this.handleNextButtonClick();
                break;
            case 'previous-btn':
                this.handlePreviousButtonClick();
                break;
            case 'quit-btn':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    }
    correctAnswer= () =>{
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        })
        this.setState(prevState => ({
            score: prevState.score+1,
            correctAnswers: prevState.correctAnswers+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }
            else{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            }
        })
    }
    wrongAnswer= () =>{
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        })
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }
            else{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            }
        })
    }
    startTimer = () =>{
        const countDownTime =Date.now()+ 180000;
        this.interval =setInterval(()=>{
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor(distance%(1000*60*60)/(1000*60))
            const seconds = Math.floor(distance%(1000*60)/1000)

            if(distance<0){
                clearInterval(this.interval)
                this.setState({
                    time:{
                        minutes: 0,
                        seconds:0
                    }
                },()=>{
                    /*alert('Quiz has ended!');
                    this.props.history.push('/');*/
                    this.endGame();
                });
            }else{
                this.setState({
                    time:{
                        minutes,
                        seconds
                    }
                })
            }
        },1000)
    }
    
    handleDisableButton = () =>{
          if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){
              this.setState({
                  previousButtonDisabled: true
              })
          }else{
              this.setState({
                  previousButtonDisabled: false
              })
          }

          if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex+1 === this.state.numberOfQuestions){
            this.setState({
                nextButtonDisabled:true
            })
        }else{
            this.setState({
                nextButtonDisabled:false
            })
        }
    }
    endGame = () =>{
        alert('Quiz has ended!');
        const { state } = this;
        const playerStats ={
           score:state.score,
           numberOfQuestions:state.numberOfQuestions,
           numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
           correctAnswers:state.correctAnswer,
           wrongAnswer:this.wrongAnswers
        }
        console.log(playerStats);
        setTimeout(()=>{
            this.props.history.push('/play/summary',playerStats);
        },1000)
    }
    render() {
        const {currentQuestion,time} =this.state;
        return (
            <>
                <div className="questions">
                    <div className="timer">
                        <p><span>Timer:</span>{time.minutes}:{time.seconds}</p>
                    </div>
                    {/*<div>
                    <p>
                        <span>1 of 15</span></p>
                </div>*/}
                    <h4>{currentQuestion.question}</h4>
                    <div className="option-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="option-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>

                    <div className="button-container">
                        <button 
                            className={classNames('',{'disable':this.state.previousButtonDisabled})}
                            id="previous-btn" onClick={this.handleButtonClick}>
                            Previous
                        </button>
                        <button 
                            className={classNames('',{'disable':this.state.nextButtonDisabled})}
                            id="next-btn" onClick={this.handleButtonClick}>
                            Next
                        </button>
                        <button id="quit-btn" onClick={this.handleButtonClick}>Quit</button>

                    </div>
                </div>
                {/*<p>counter:{this.state.counter}</p>
            <button onClick={this.increaseCount}>Click Me</button>*/}
            </>
        )

    };
}

export default PlayQuiz;