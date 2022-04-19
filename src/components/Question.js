import React from "react";
import AnswerBtn from "./AnswerBtn";

export default function Question(props) {
    const [allAnswers, setAllAnswers] = React.useState(props.qstnInfo.answers);

    //function to decode HTML entities (https://www.delftstack.com/howto/javascript/javascript-decode-html-entities/)
    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }

    //Sends id of selected answer and id of question element containing slected answer to changeIsSelected in Question.js
    function selectAns(id) {
        props.changeIsSelected(id, props.qstnInfo.id);
    }

    //creating Answer component
    let answerElements;
    if (allAnswers) {
        answerElements = allAnswers.map((ans) => {
            return (
                <AnswerBtn
                    key={ans.id}
                    value={ans.value}
                    id={ans.id}
                    isSelected={ans.isSelected}
                    showAns={props.qstnInfo.showAnswers}
                    correctAns={props.qstnInfo.correctAns}
                    decodeEntity={decodeEntity}
                    selectAns={selectAns}
                />
            );
        });
    }

    return (
        <div className="qstn">
            <h1 className="qstn--question">
                {decodeEntity(props.qstnInfo.qstn)}
            </h1>
            <div className="qstn--btn-container">{answerElements}</div>
            <hr className="solid"></hr>
        </div>
    );
}
