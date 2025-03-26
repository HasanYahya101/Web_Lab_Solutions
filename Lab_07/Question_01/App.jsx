"use client";

import MovieList from "./movie-list.jsx"

export default function App() {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "16px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Movie Collection</h1>
      <MovieList />
    </div>
  )
}

