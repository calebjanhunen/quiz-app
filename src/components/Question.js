import React from "react";
import Answers from "./AnswerBtn";
import { nanoid } from "nanoid";

export default function Question(props) {
    const [allAnswers, setAllAnswers] = React.useState(createAnswerArr());
    //function to decode HTML entities (https://www.delftstack.com/howto/javascript/javascript-decode-html-entities/)
    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }

    function createAnswerArr() {
        let ansArr = [];
        for (let i = 0; i < props.answers.length; i++) {
            ansArr.push({
                value: props.answers[i],
                isSelected: false,
                id: nanoid(),
            });
        }
        return ansArr;
    }

    function selectAns(id) {
        setAllAnswers(oldAns => {
            return oldAns.map(ans => {
                // console.log(ans.isSelected);
                ans.isSelected = false;
                return ans.id === id ? { ...ans, isSelected: true } : ans;
            });
        });
    }

    //creating Answer component
    const answerElements = allAnswers.map(ans => (
        <Answers
            key={ans.id}
            value={decodeEntity(ans.value)}
            id={ans.id}
            isSelected={ans.isSelected}
            selectAns={selectAns}
        />
    ));

    return (
        <div className="qstn">
            <h1 className="qstn--question">{decodeEntity(props.qstn)}</h1>
            <div className="qstn--btn-container">{answerElements}</div>
            <hr className="solid"></hr>
        </div>
    );
}
