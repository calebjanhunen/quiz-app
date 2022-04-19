import React from "react";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

export default function App() {
    const [showQuestions, setShowQuestions] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);
    const [allQuestionsData, setQuestionsData] = React.useState([]);
    const [questionObjects, setQuestionObjects] = React.useState();
    const [questionElements, setQuestionElements] = React.useState();
    // let questionObjects;

    let ansArr = [];

    //API call
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
            .then((res) => res.json())
            .then((data) => setQuestionsData(data.results));
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

    //Loops through each answer in questionObjects and sets isSelected to true for the answer selected
    function changeIsSelected(answerId, qstnObjectId) {
        //Updates questionObjects state
        setQuestionObjects((prevObj) => {
            return prevObj.map((obj) => {
                //if question object id = id of object containing answer selected ->
                //loops through answer array in object and sets isSelected of the answer selected to true
                if (obj.id === qstnObjectId) {
                    const newAns = obj.answers.map((ans) =>
                        ans.id === answerId ? { ...ans, isSelected: true } : ans
                    );
                    return { ...obj, answers: newAns };
                } else {
                    return obj;
                }
            });
        });
    }

    //Create an array of objects for each question (runs once during first render)
    React.useEffect(() => {
        if (allQuestionsData) {
            let answers = [];
            setQuestionObjects(
                allQuestionsData.map((questionData) => {
                    // Shuffle order of answers
                    answers = [...questionData.incorrect_answers];
                    answers.push(questionData.correct_answer);

                    //Shuffle Array
                    shuffleArray(answers);

                    //Create array of objects for each answer
                    const ansArr = answers.map((ans) => {
                        return {
                            value: ans,
                            isSelected: false,
                            id: nanoid(),
                        };
                    });

                    return {
                        answers: [...ansArr],
                        showAnswers: false,
                        correctAns: questionData.correct_answer,
                        qstn: questionData.question,
                        id: nanoid(),
                    };
                })
            );
        }
    }, [allQuestionsData]);

    //Create a component element for each question (runs everytime the array of question objects changes)
    React.useEffect(() => {
        if (questionObjects) {
            setQuestionElements(
                questionObjects.map((obj) => {
                    return (
                        <Question
                            key={nanoid()}
                            qstnInfo={obj}
                            changeIsSelected={changeIsSelected}
                        />
                    );
                })
            );
        }
    }, [questionObjects]);

    //Displays correct answer when "Check Answer" button is clicked
    function showCorrectAns() {
        // console.log(questionElements);
        setQuestionObjects((prevElements) => {
            // console.log(prevElements);
            return prevElements.map((el) => {
                return { ...el, showAnswers: true };
            });
        });
    }

    return (
        <main>
            <div className="question-container">
                {showQuestions && <StartPage />}
                {questionElements && (
                    <div className="all-questions">{questionElements}</div>
                )}
                <button className="submitBtn" onClick={showCorrectAns}>
                    Check Answers
                </button>
            </div>
        </main>
    );
}
