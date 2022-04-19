import React from "react";
import classNames from "classnames";
export default function AnswerBtn(props) {
    function decode(inputStr) {
        return props.decodeEntity(inputStr);
    }

    return (
        <button
            className={classNames({
                "qstn--answers": true,
                "qstn--answers-selected": props.isSelected,
                "qstn--answers-wrong":
                    props.showAns &&
                    props.isSelected &&
                    props.value != props.correctAns,
                "qstn--answers-correct":
                    props.showAns && props.correctAns == props.value,
                "qstn--answers-inactive":
                    props.showAns && props.value != props.correctAns,
            })}
            onClick={() => props.selectAns(props.id)}
        >
            {decode(props.value)}
        </button>
    );
}
