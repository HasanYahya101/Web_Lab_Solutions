"use client"

import { useState } from "react"

function Profile({ isDarkMode, setIsDarkMode }) {
    const [showDetails, setShowDetails] = useState(false)

    const user = {
        name: "Hasan Yahya",
        description:
            "Frontend developer with -5 years of experience specializing in React (yup, negative 5). Passionate about creating intuitive user interfaces and optimizing application performance.",
    }

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#333",
            transition: "all 0.3s ease",
            border: isDarkMode ? "1px solid #fff" : "1px solid #333",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: `1px solid ${isDarkMode ? "#555" : "#eee"}`,
            paddingBottom: "10px",
        },
        name: {
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
        },
        description: {
            lineHeight: "1.6",
            marginBottom: "20px",
        },
        button: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            marginRight: "10px",
            backgroundColor: isDarkMode ? "#555" : "#f0f0f0",
            color: isDarkMode ? "#fff" : "#333",
        },
        primaryButton: {
            backgroundColor: "#4a90e2",
            color: "white",
        },
        themeContainer: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
        },
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const setTheme = (darkMode) => {
        if (isDarkMode !== darkMode) {
            setIsDarkMode(darkMode)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.name}>{user.name}</h2>
            </div>

            {showDetails && <p style={styles.description}>{user.description}</p>}

            <button onClick={toggleDetails} style={{ ...styles.button, ...styles.primaryButton }}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            <div style={styles.themeContainer}>
                <button
                    onClick={() => setTheme(false)}
                    style={{
                        ...styles.button,
                        ...(isDarkMode ? {} : styles.primaryButton),
                    }}
                >
                    Light Mode
                </button>
                <button
                    onClick={() => setTheme(true)}
                    style={{
                        ...styles.button,
                        ...(isDarkMode ? styles.primaryButton : {}),
                    }}
                >
                    Dark Mode
                </button>
            </div>
        </div>
    )
}

export default Profile

