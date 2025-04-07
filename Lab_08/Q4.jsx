"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"

export default function App() {
    return (
        <main className="container">
            <h1>Project Nightingale</h1>
            <ProjectNightingaleDashboard />
        </main>
    )
}

function ProjectNightingaleDashboard() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filterText, setFilterText] = useState("")
    const [highlightedPostId, setHighlightedPostId] = useState(null)
    const [filterExecutionCount, setFilterExecutionCount] = useState(0)

    const filterInputRef = useRef(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts")

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setPosts(data)
                setLoading(false)

                setTimeout(() => {
                    if (filterInputRef.current) {
                        filterInputRef.current.focus()
                    }
                }, 0)
            } catch (err) {
                setError(err.message || "An error occurred while fetching posts")
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const filteredPosts = useMemo(() => {
        setFilterExecutionCount((prev) => prev + 1)

        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(filterText.toLowerCase()) ||
                post.body.toLowerCase().includes(filterText.toLowerCase()),
        )
    }, [posts, filterText])

    const highlightTopResult = useCallback(() => {
        if (filteredPosts.length > 0) {
            setHighlightedPostId(filteredPosts[0].id)

            const highlightedElement = document.getElementById(`post-${filteredPosts[0].id}`)
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
        } else {
            setHighlightedPostId(null)
        }
    }, [filteredPosts])

    const handleFilterChange = (e) => {
        setFilterText(e.target.value)

        setHighlightedPostId(null)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setFilterText("")
            setHighlightedPostId(null)
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="filter-container">
                    <input
                        ref={filterInputRef}
                        type="text"
                        placeholder="Filter posts by title..."
                        value={filterText}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="filter-input"
                        aria-label="Filter posts"
                    />
                    {filterText && (
                        <button
                            className="clear-filter"
                            onClick={() => {
                                setFilterText("")
                                setHighlightedPostId(null)
                            }}
                            aria-label="Clear filter"
                        >
                            ×
                        </button>
                    )}
                </div>

                <button className="highlight-button" onClick={highlightTopResult} disabled={filteredPosts.length === 0}>
                    Highlight First
                </button>
            </div>

            {filterText && (
                <div className="filter-stats">
                    Showing {filteredPosts.length} of {posts.length} posts
                    <span className="filter-execution-count">Filter executed: {filterExecutionCount} times</span>
                </div>
            )}

            {loading && (
                <div className="loading">
                    <p>Loading posts...</p>
                    <span className="filter-execution-count">Filter executed: {filterExecutionCount} times</span>
                </div>
            )}

            {error && (
                <div className="error">
                    <p>Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="posts-container">
                    {filteredPosts.length > 0 ? (
                        <ul className="posts-list">
                            {filteredPosts.map((post) => (
                                <li
                                    key={post.id}
                                    id={`post-${post.id}`}
                                    className={`post-item ${post.id === highlightedPostId ? "highlighted" : ""}`}
                                >
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">No posts match your filter criteria.</p>
                    )}

                    {posts.length > filteredPosts.length && filteredPosts.length > 0 && (
                        <div className="more-posts">... more posts available</div>
                    )}
                </div>
            )}

            <style jsx>{`
        .dashboard {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-header {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          align-items: center;
        }
        
        .filter-container {
          position: relative;
          flex-grow: 1;
        }
        
        .filter-input {
          width: 92%;
          padding: 10px;
          padding-right: 30px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .filter-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
        
        .highlight-button {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
          transition: background-color 0.2s;
        }
        
        .highlight-button:hover {
          background-color: #0069d9;
        }
        
        .highlight-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .clear-filter {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 20px;
          color: #999;
          cursor: pointer;
          height: 24px;
          width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .clear-filter:hover {
          background-color: #f0f0f0;
          color: #333;
        }
        
        .filter-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 14px;
          color: #666;
          background-color: #f8f9fa;
          padding: 8px 12px;
          border-radius: 4px;
        }
        
        .filter-execution-count {
          color: #888;
          font-style: italic;
        }
        
        .loading, .error {
          padding: 20px;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .error {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }
        
        .posts-container {
          margin-top: 20px;
        }
        
        .posts-list {
          list-style-type: none;
          padding: 0;
        }
        
        .post-item {
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }
        
        .post-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .post-item.highlighted {
          background-color: #fff9e6;
          border-color: #ffd700;
          box-shadow: 0 0 0 1px #ffd700;
          position: relative;
        }
        
        .post-item.highlighted::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: #ffd700;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        
        .post-item h3 {
          margin-top: 0;
          color: #333;
          text-transform: capitalize;
        }
        
        .post-item p {
          color: #666;
          margin-bottom: 0;
        }
        
        .no-results {
          text-align: center;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 4px;
          color: #666;
        }
        
        .more-posts {
          text-align: center;
          font-style: italic;
          color: #888;
          margin-top: 10px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
      `}</style>
        </div>
    )
}

