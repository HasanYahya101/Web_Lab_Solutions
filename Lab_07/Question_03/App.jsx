import Profile from "./profile.jsx"
import { useState } from "react"

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const styles = {
    container: {
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
      border: isDarkMode ? "1px solid #fff" : "1px solid #333",
      color: isDarkMode ? "#fff" : "#333",
      borderRadius: "5px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Profile</h1>
      <Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  )
}

export default App

