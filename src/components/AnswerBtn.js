import React from "react";
import { nanoid } from "nanoid";

export default function AnswerBtn(props) {
    return (
        <button
            className={
                props.isSelected ? "qstn--answers-selected" : "qstn--answers"
            }
            onClick={() => props.selectAns(props.id)}
        >
            {props.value}
        </button>
    );
}
