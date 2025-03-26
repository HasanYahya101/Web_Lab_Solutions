import Counter from "./counter.jsx"


function App() {
  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    h1: {
      textAlign: "center",
      color: "#333",
    },
  };

  return (
    <div className="app">
      <h1>Counter with Step Control</h1>
      <Counter />
    </div>
  )
}

export default App

