import React from "react";

export default function StartPage(props) {
    return (
        <div>
            <h1>Quiz</h1>
            <h2>5 multiple choice questions</h2>
            <button onClick={props.displayQuiz}>Start Quiz</button>
        </div>
    );
}
