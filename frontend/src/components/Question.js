import { useState } from "react"
import "./question.css"

export function Question({ question, answer }) {
    const [answerDisplay, setAnswerDisplay] = useState(false)

    return (
        <div className="faq overflow-hidden mt-3">
            <div className="d-flex justify-content-between align-items-center question-section pb-2"
                onClick={() => setAnswerDisplay(!answerDisplay)}>
                <div className="question">{question}</div>
                <div className={(answerDisplay ? "minus" : "plus") + "-icon icon"}>
                </div>
            </div>
            <div
                className="answer"
                style={{
                    maxHeight: answerDisplay ? "100px" : "0px",
                    paddingTop: answerDisplay ? "30px" : "0",
                    transition: "0.3s"
                }}>
                    {answer}
            </div>
        </div>
    )
}