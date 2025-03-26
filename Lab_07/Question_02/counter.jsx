"use client"

import { useState } from "react"

function Counter() {
    const [count, setCount] = useState(0)
    const [step, setStep] = useState(1)

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + step)
    }

    const handleDecrement = () => {
        setCount((prevCount) => {
            return Math.max(0, prevCount - step)
        })
    }

    const handleStepChange = (e) => {
        const newStep = Math.max(1, Number.parseInt(e.target.value) || 1)
        setStep(newStep)
    }

    const styles = {
        counterContainer: {
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        counterDisplay: {
            fontSize: "48px",
            textAlign: "center",
            margin: "20px 0",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            border: "1px solid #ddd",
        },
        stepControl: {
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        stepControlLabel: {
            fontWeight: "bold",
        },
        stepControlInput: {
            padding: "8px",
            width: "60px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
        },
        counterButtons: {
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
        },
        counterButton: {
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        counterButtonFirstChild: {
            backgroundColor: "#ff6b6b",
            color: "white",
        },
        counterButtonLastChild: {
            backgroundColor: "#4ecdc4",
            color: "white",
        },
        counterButtonHover: {
            opacity: 0.9,
        },
        counterButtonDisabled: {
            backgroundColor: "#cccccc",
            cursor: "not-allowed",
        },
    }

    return (
        <div className="counter-container" style={styles.counterContainer}>
            <h2>Counter</h2>

            <div className="counter-display" style={styles.counterDisplay}>
                <span>{count}</span>
            </div>

            <div className="step-control" style={styles.stepControl}>
                <label htmlFor="step-input">Step:</label>
                <input id="step-input" type="number" min="1" value={step} onChange={handleStepChange} />
            </div>

            <div className="counter-buttons" style={styles.counterButtons}>
                <button onClick={handleDecrement} disabled={count === 0} className={count === 0 ? "disabled" : ""}>
                    Decrease
                </button>
                <button onClick={handleIncrement}>Increase</button>
            </div>
        </div>
    )
}

export default Counter

