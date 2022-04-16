import React from "react";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

export default function App() {
    const [showQuestions, setShowQuestions] = React.useState(false);
    const [allQuestionsData, setQuestionsData] = React.useState([]);
    let answers;

    //API call
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results));
    }, []);

    //Fischer-Yates Array Shuffle Alogrithm
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const ranEl = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[ranEl];
            arr[ranEl] = temp;
        }
    }

    //Create list of questions and answers from pulled data
    const questionElements = allQuestionsData.map(questionData => {
        //Shuffle order of answers
        answers = [...questionData.incorrect_answers];
        answers.push(questionData.correct_answer);
        shuffleArray(answers);

        return (
            <Question
                key={nanoid()}
                qstn={questionData.question}
                answers={answers}
                correctAns={questionData.correct_answer}
            />
        );
    });

    return (
        <main>
            <div className="question-container">
                {/* {showQuestions && <StartPage />} */}
                <div className="all-questions">{questionElements}</div>
            </div>
        </main>
    );
}
