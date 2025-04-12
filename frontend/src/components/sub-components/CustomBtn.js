export function CustomBtn({ text, btnFunction }) {
    return (
        <button onClick={btnFunction} className="custom-btn rounded-pill text-white py-3 px-5">
            {text}
        </button>
    )
} 