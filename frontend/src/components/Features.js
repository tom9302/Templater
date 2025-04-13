import { Feature } from "./sub-components/Feature"
import "./features.css"

export function Features() {
    return (
        <div className="features main-wrapper mx-auto d-flex gap-3 mt-5">
            <Feature
                feature="Free"
                description="lorem ipsumt msdlmqs dqsdl dsdsqm dqsdl dq ml l llsqdqmlqmslmqd"
            />
            <Feature
                feature="Fast"
                description="lorem ipsumt msdlmqs dqsdl dsdsqm dqsdl dq ml l llsqdqmlqmslmqd"
            />
            <Feature
                feature="Easy"
                description="lorem ipsumt msdlmqs dqsdl dsdsqm dqsdl dq ml l llsqdqmlqmslmqd"
            />
        </div>
    )
}