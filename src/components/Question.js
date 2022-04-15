import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
    //function to decode HTML entities (https://www.delftstack.com/howto/javascript/javascript-decode-html-entities/)
    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }

    //Fischer-Yates Array Shuffle Alogrithm
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const ranEl = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[ranEl];
            arr[ranEl] = temp;
        }
    }

    //Shuffle order of answers
    const answers = [...props.incorrectAns];
    answers.push(props.correctAns);
    shuffleArray(answers);

    //Create list of buttons
    const btnAnswers = answers.map(ans => (
        <button className="qstn--answers" key={nanoid()}>
            {decodeEntity(ans)}
        </button>
    ));

    return (
        <div className="qstn">
            <h1 className="qstn--question">{decodeEntity(props.qstn)}</h1>
            <div className="qstn--btn-container">{btnAnswers}</div>
            <hr className="solid"></hr>
        </div>
    );
}
