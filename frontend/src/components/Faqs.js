import { Question } from "./Question"
import "./faqs.css"

export function Faqs() {
    const questions = {
        question1: "How much does this app cost?",
        question2: "Are the extracted templates accurate?",
        question3: "How do I use this app?",
        question4: "Can I extract any template on the internet?"
    }

    const answers = {
        answer1: "This app is completely free.",
        answer2: "Not all of them. Some are accurate, some need slight modifications. We are still collecting data.",
        answer3: "Go to the website you wish to extract a section from and right click on the page. select \"inspect element\". Take the tag, id and classes (if any) of your section and fill the form and click on \"Scrape\"",
        answer4: "No. some websites do not allow web scrapers to scrape their website."
    }

    return (
        <div className="faqs main-wrapper mx-auto">
            <Question
                question={questions.question1}
                answer={answers.answer1}
            />
            <Question
                question={questions.question2}
                answer={answers.answer2}
            />
            <Question
                question={questions.question3}
                answer={answers.answer3}
            />
            <Question
                question={questions.question4}
                answer={answers.answer4}
            />
        </div>
        
    )
}