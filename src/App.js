import React from "react";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

export default function App() {
    const [showQuestions, setShowQuestions] = React.useState(false);
    const [allQuestionsData, setQuestionsData] = React.useState([]);

    //API call
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results));
    }, []);

    //Create list of questions and answers from pulled data
    const questionElements = allQuestionsData.map(questionData => (
        <Question
            key={nanoid()}
            qstn={questionData.question}
            correctAns={questionData.correct_answer}
            incorrectAns={questionData.incorrect_answers}
        />
    ));

    return (
        <main>
            <div className="question-container">
                {/* {showQuestions && <StartPage />} */}
                <div className="all-questions">{questionElements}</div>
            </div>
        </main>
    );
}
