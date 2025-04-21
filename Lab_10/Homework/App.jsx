import Counter from "./redux/Counter.jsx"

const App = () => {
    const styles = {
        app: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f7fa",
            padding: "2rem",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            marginBottom: "2rem",
            textAlign: "center",
        },
        title: {
            fontSize: "2.5rem",
            color: "#333",
            marginBottom: "0.5rem",
        },
        subtitle: {
            fontSize: "1.2rem",
            color: "#666",
            fontWeight: "normal",
        },
    }

    return (
        <div style={styles.app}>
            <header style={styles.header}>
                <h1 style={styles.title}>Redux Toolkit Demo</h1>
                <h2 style={styles.subtitle}>A simple counter example</h2>
            </header>
            <Counter />
        </div>
    )
}

export default App
