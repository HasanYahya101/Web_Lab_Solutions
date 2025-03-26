"use client";

import { useState } from "react"
import Movie from "./movie"

export default function MovieList() {
    const [movies, setMovies] = useState([])
    const [newMovieTitle, setNewMovieTitle] = useState("")

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        },
        inputContainer: {
            display: "flex",
            gap: "8px",
        },
        input: {
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        addButton: {
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
        },
        emptyMessage: {
            color: "#6b7280",
        },
        movieList: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
    }

    const addMovie = () => {
        if (newMovieTitle.trim() === "") return

        setMovies([...movies, { id: Date.now(), title: newMovieTitle }])
        setNewMovieTitle("")
    }

    const updateMovie = (id, newTitle) => {
        const updatedMovies = movies.map((movie) => (movie.id === id ? { ...movie, title: newTitle } : movie))
        setMovies(updatedMovies)
    }

    const removeMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id))
    }

    return (
        <div style={styles.container}>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                    placeholder="Enter movie title"
                    style={styles.input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addMovie()
                    }}
                />
                <button onClick={addMovie} style={styles.addButton}>
                    Add Movie
                </button>
            </div>

            {movies.length === 0 ? (
                <p style={styles.emptyMessage}>No movies added yet. Add your first movie above!</p>
            ) : (
                <div style={styles.movieList}>
                    {movies.map((movie) => (
                        <Movie key={movie.id} id={movie.id} title={movie.title} onUpdate={updateMovie} onRemove={removeMovie} />
                    ))}
                </div>
            )}
        </div>
    )
}

