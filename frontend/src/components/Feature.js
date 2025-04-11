import "./feature.css"

export function Feature({ feature, description }) {
    return (
        <div className="feature d-flex flex-column gap-3 border">
            <div className={feature.toLowerCase() + "-icon icon"}></div>
            <div className="heading">{feature}</div>
            <div className="description">{description}</div>
        </div>
    )
}