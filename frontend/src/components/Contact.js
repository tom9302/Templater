import { CustomBtn } from "./sub-components/CustomBtn"
import "./contact.css"

export function Contact() {
    return (
        <div className="contact">
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

                <div className="form d-flex flex-column align-items-center justify-content-center">
                    <div className=" w-75 mb-3 py-3">
                        <div className="mt-5">Name</div>
                        <input type="text" className="input-field" />

                        <div>Email</div>
                        <input type="text" className="input-field" />

                        <div>Message</div>
                        <textarea className="input-field" rows="4"></textarea>
                    </div>

                    <CustomBtn
                        text="SUBMIT"
                        
                    />
                </div>

            </div>
        </div>
    )
}