import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset } from "./counterSlice"

const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            width: "300px",
            margin: "0 auto",
        },
        title: {
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "1.5rem",
        },
        counterDisplay: {
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#2a2a72",
            margin: "1rem 0",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            backgroundColor: "#f0f4ff",
            minWidth: "120px",
            textAlign: "center",
        },
        buttonsContainer: {
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
        },
        button: {
            padding: "0.75rem 1.5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        incrementButton: {
            backgroundColor: "#4CAF50",
            color: "white",
        },
        decrementButton: {
            backgroundColor: "#f44336",
            color: "white",
        },
        resetButton: {
            backgroundColor: "#9e9e9e",
            color: "white",
            marginTop: "1rem",
            width: "100%",
        },
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Redux Counter</h2>
            <div style={styles.counterDisplay}>{count}</div>
            <div style={styles.buttonsContainer}>
                <button
                    style={{ ...styles.button, ...styles.decrementButton }}
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <button
                    style={{ ...styles.button, ...styles.incrementButton }}
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
            <button
                style={{ ...styles.button, ...styles.resetButton }}
                onClick={() => dispatch(reset())}
            >
                Reset
            </button>
        </div>
    )
}

export default Counter
