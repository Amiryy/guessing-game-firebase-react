import React from 'react';

const HighScores = props => {
    const sortedScores = props.scores
        .sort((a, b) => (a.score > b.score));
    const scores = sortedScores.map((score, i) => {
        return (
            <tr key={i}>
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