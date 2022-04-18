import React from "react";
import AnswerBtn from "./AnswerBtn";
import { nanoid } from "nanoid";

export default function Question(props) {
    const [allAnswers, setAllAnswers] = React.useState(props.qstnInfo.answers);
    // console.log(props.qstnInfo.answers);
    // React.useEffect(() => {
    //     setAllAnswers(createAnsArray());
    // }, []);

    //function to decode HTML entities (https://www.delftstack.com/howto/javascript/javascript-decode-html-entities/)
    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }
    // function createAnsArray() {
    //     let ansArr = [];
    //     for (let i = 0; i < props.answers.length; i++) {
    //         ansArr.push({
    //             value: props.answers[i],
    //             isSelected: false,
    //             id: nanoid(),
    //         });
    //     }
    //     return ansArr;
    // }

    // console.log(React.useEffect());
    function selectAns(id) {
        setAllAnswers(oldAns => {
            return oldAns.map(ans => {
                ans.isSelected = false;
                return ans.id === id ? { ...ans, isSelected: true } : ans;
            });
        });
    }

    //creating Answer component
    let answerElements;
    if (allAnswers) {
        answerElements = allAnswers.map(ans => {
            return (
                <AnswerBtn
                    key={ans.id}
                    value={ans.value}
                    id={ans.id}
                    isSelected={ans.isSelected}
                    selectAns={selectAns}
                    showAns={props.qstnInfo.showAnswers}
                    correctAns={props.qstnInfo.correctAns}
                    decodeEntity={decodeEntity}
                />
            );
        });
    }
    // console.log(props);
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
