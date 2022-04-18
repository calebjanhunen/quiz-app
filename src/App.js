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
        console.log("api fetch");
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results));
    }, []);
    // console.log(allQuestionsData);

    // function createAnsArray() {
    //     let answers = [];
    //     console.log(allQuestionsData);
    //     allQuestionsData.forEach(questionData => {
    //         console.log(questionData.correct_answer);
    //         answers.push(...questionData.incorrect_answers);
    //         answers.push(questionData.correct_answer);
    //         setAllAnswers([
    //             ...questionData.incorrect_answers,
    //             questionData.correct_answer,
    //         ]);
    //     });
    //     answers.forEach(answer => {
    //         ansArr.push({
    //             value: answer,
    //             isSelected: false,
    //             id: nanoid(),
    //         });
    //     });
    //     return answers;
    // }
    // if (allQuestionsData) {
    // console.log("hey");

    // console.log(allAnswers);
    // }
    // console.log("Answer " + answers);

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
    React.useEffect(() => {
        if (allQuestionsData) {
            let answers = [];
            setQuestionObjects(
                allQuestionsData.map(questionData => {
                    // Shuffle order of answers
                    answers = [...questionData.incorrect_answers];
                    answers.push(questionData.correct_answer);

                    shuffleArray(answers);
                    const ansArr = answers.map(ans => {
                        return {
                            value: ans,
                            isSelected: false,
                            id: nanoid(),
                        };
                    });
                    // console.log(ansArr);

                    return {
                        answers: [...ansArr],
                        showAnswers: false,
                        correctAns: questionData.correct_answer,
                        qstn: questionData.question,
                    };
                })
            );
        }
    }, [allQuestionsData]);
    // console.log(questionObjects);
    let questionElements2;
    React.useEffect(() => {
        console.log(questionObjects);
        if (questionObjects) {
            // questionObjects.forEach(obj => {
            //     console.log(obj);
            //     setQuestionElements(<Question key={nanoid()} qstnInfo={obj} />);
            // });
            setQuestionElements(
                questionObjects.map(obj => {
                    // console.log(obj);
                    return <Question key={nanoid()} qstnInfo={obj} />;
                })
            );
        }
    }, [questionObjects]);
    // console.log(questionElements);
    // console.log(questionElements);
    // return (
    //     <Question
    //         key={nanoid()}
    //         qstn={questionData.question}
    //         answers={ansArr}
    //         correctAns={questionData.correct_answer}
    //         showAnswers={showAnswers}
    //     />
    // );

    function showCorrectAns(event) {
        console.log("clicked");
        // console.log(event);
        // event.preventDefault();
        // setShowAnswers(prev => !prev);
        setQuestionObjects(prevElements => {
            //TODO: Change showAnswers when button is clicked
            console.log(prevElements);
            return prevElements.map(el => {
                // console.log(el.showAnswers);
                return { ...el, showAnswers: true };
            });
            // return prevElements;
            // console.log(questionObjects);
            // return { ...prevElements, showAnswers: true };
        });
    }

    return (
        <main>
            <h1>TEST CODE</h1>
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
