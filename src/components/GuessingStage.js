import React from 'react';

const GuessingStage = props => {
    return (
        <div className='guessing_stage'>
            <p>
                Is this your number?
            </p>
            <p>{props.guess}</p>
            <button className='confirm'
                    onClick={props.confirmGuess}>
                Yes! :O
            </button><br/>
            <button onClick={() => props.getFeedback('higher')}>
                too low...
            </button>
            <button onClick={() => props.getFeedback('lower')}>
                too high!
            </button><br/>
            <button onClick={props.resetGame}>
                Restart
            </button>
        </div>
    )
};

export default GuessingStage;