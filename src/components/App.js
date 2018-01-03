import React, { Component } from 'react';
import '../styles/main.css';
import ThinkingStage from "./ThinkingStage";
import GuessingStage from "./GuessingStage";
import firebase from '../firebase';
import { MD5 as md5 } from 'object-hash';
import HighScores from "./HighScores";

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: 'Nameless Machine',
            numbers: [],
            guess: null,
            numberOfGuesses: 0,
            guessConfirmed: false,
            firstGuess: true,
            highScores: []
        };
        this.guessNumber = this.guessNumber.bind(this);
        this.getFeedback = this.getFeedback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.confirmGuess = this.confirmGuess.bind(this);
    }
    componentDidMount() {
        const guessesRef = firebase.database().ref('guesses');
        this.createNumbers();
        guessesRef.on('value', (snapshot) => {
            let scores = snapshot.val();
            let newScores = [];
            for (let score in scores) {
                newScores.push({
                    name: scores[score].name,
                    score: scores[score].numberOfGuesses
                })
            }
            this.setState({
                highScores: newScores
            })
        })
    }
    createNumbers(){
        let numbers = [];
        for(let i = 1; i < 101; i++) {
            numbers.push(i);
        }
        this.setState({numbers: numbers})
    }
    guessNumber(min = 0, max = this.state.numbers.length){
        const { numbers } = this.state;
        const mid = Math.floor((min + max) / 2);
        const guess = numbers[mid - 1];
        this.setState({
            guess: guess,
            firstGuess: false,
            numberOfGuesses: this.state.numberOfGuesses + 1
        });
    }
    getFeedback(feedback) {
        const middle = Math.floor(this.state.numbers.length / 2);
        const { numbers } = this.state;
        if(feedback === 'higher') {
            this.setState({
                numbers: numbers.slice(middle, numbers.length + 1)
            });
            this.guessNumber(middle, numbers.length + 1)
        } else {
            this.setState({
                numbers: numbers.slice(0, middle)
            });
            this.guessNumber(0, middle)
        }

    }
    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }
    resetGame() {
        this.setState({
            name: 'Nameless Machine',
            guess: null,
            firstGuess: true,
            numberOfGuesses: 0,
            guessConfirmed: false
        });
        this.createNumbers();
    }
    confirmGuess(){
        const hashId = md5(this.state.name);
        const guessesRef = firebase.database().ref('guesses');
        this.setState({
            guessConfirmed: true
        });
        guessesRef.push({
            id: hashId,
            name: this.state.name,
            numberOfGuesses: this.state.numberOfGuesses
        })
    }
    render() {
        return (
            <div className='app'>
                { this.state.firstGuess ?
                    <ThinkingStage guessNumber={this.guessNumber}
                                   handleChange={this.handleChange}
                                   name={this.state.name} /> :
                    <GuessingStage getFeedback={this.getFeedback}
                                   resetGame={this.resetGame}
                                   confirmGuess={this.confirmGuess}
                                   guess={this.state.guess} /> }
                { this.state.guessConfirmed ?
                    (<div>
                        <span>
                            I guessed your number in: {this.state.numberOfGuesses} guesses.
                        </span>
                    </div>) : null }
                    <HighScores scores={this.state.highScores} />
            </div>
        );
    }
}

export default App;
