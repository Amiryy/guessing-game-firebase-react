import React from 'react';

const ThinkingStage = props => {
    return (
        <div className='thinking_stage'>
            <span>
                I'm a nameless machine! how would you name me?
            </span><br/>
            <input type='text'
                   onChange={props.handleChange}
                   autoComplete='none'
                   value={props.name}
            />
            <h3>Think of a number between 1 and 100:</h3>
            <button onClick={() => props.guessNumber()}>
                Alright.
            </button>
        </div>
    )
};

export default ThinkingStage;