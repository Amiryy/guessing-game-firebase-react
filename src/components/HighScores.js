import React from 'react';
import { MD5 as md5 } from 'object-hash';

const HighScores = props => {
    const scores = props.scores.map(score => {
        const hashKey = md5(score);
        return (
            <tr key={hashKey}>
                <td>{score.name}</td>
                <td>{score.score}</td>
            </tr>
        )
    });
    return (
        <div className='highscores'>
            <h3>Live High-Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores}
                </tbody>
            </table>
        </div>
    )
};

export default HighScores;