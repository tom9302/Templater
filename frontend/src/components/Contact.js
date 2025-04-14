import { useState } from "react"
import emailjs from "@emailjs/browser"
import { CustomBtn } from "./sub-components/CustomBtn"
import "./contact.css"

export function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [messageSuccess, setMessageSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [inputErrors, setInputErrors] = useState({
        name: false,
        email: false,
        message: false
    })

    async function sendEmail(e) {
        e.preventDefault()

        setInputErrors({
            name: !name ? true : false,
            email: !email ? true : false,
            message: !message ? true : false
        })

        try {
            if (!name || !email) {
                throw Error("Please enter all your details")
            }

            if (!message) {
                throw Error("Message cannot be empty")
            }

            const sendMessage = await emailjs.sendForm(
                "service_btrrltq", "template_yc2sufc", e.target, "DS9lQ5iASyGd-zc-2"
            )

            if (sendMessage) {
                setMessageSuccess(true)
                console.log(sendMessage)
            }
        } catch (error) {
            if (error.hasOwnProperty("status") && error.status === 412) {
                setMessageSuccess(false)
                setErrorMessage("Error : could not send message.")
            }
        }

        e.target.reset()
    }

    return (
        <div id="contact" className="contact">
            <div className="heading text-center mx-auto pt-5">
                We appreciate your feedback
            </div>
            <div className="main-wrapper mx-auto d-flex justify-content-between py-5">

                <div className="general-description d-flex flex-column justify-content-center">

                    <div className="d-flex align-items-center gap-4 improve p-4 mt-5">
                        <div className="image"></div>
                        <div className="description">
                            <div className="fw-bold mb-3">Feedback based</div>
                            <div>
                                We always work on improving the accuracy of the extracted templates. we would love to hear your thoughts and experience with Templater.
                            </div>
                        </div>

                    </div>
                    <div className="d-flex align-items-center gap-4 align-items-center support p-4 mt-3">
                        <div className="image"></div>
                        <div className="description">
                            <div className="fw-bold mb-3">Support</div>
                            <div>
                                We always work on improving the accuracy of the extracted templates. we would love to hear your thoughts and experience with Templater.
                            </div>
                        </div>

                    </div>
                </div>

                <div className="form">
                    <form onSubmit={sendEmail} className="w-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="w-100 mb-3 px-5 py-3">
                            <div className="mt-5">Name</div>
                            <input
                                type="text"
                                name="sender-name"
                                placeholder="Your Name"
                                className="input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <div>Email</div>
                            <input
                                type="text"
                                name="sender-email"
                                placeholder="Your Email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div>Message</div>
                            <textarea
                                rows="4"
                                name="message"
                                placeholder="Message"
                                className="input-field"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            >
                            </textarea>
                        </div>

                        <div id="send-message" className="mb-4 fs-5">
                            {
                                messageSuccess ?
                                    "Your message has been successfuly sent."
                                    : errorMessage ?
                                    "Error : could not send message."
                                    :
                                    ""
                            }
                        </div>

                        <CustomBtn
                            text="SUBMIT"
                        />
                    </form>

                </div>

            </div>
        </div>
    )
}