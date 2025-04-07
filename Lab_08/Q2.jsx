"use client"

import { useState, useEffect, useMemo } from "react"

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
            } catch (err) {
                setError(err.message || "An error occurred while fetching posts")
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const filteredPosts = useMemo(() => {
        console.log("Recalculating filtered posts")
        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(filterText.toLowerCase()) ||
                post.body.toLowerCase().includes(filterText.toLowerCase()),
        )
    }, [posts, filterText])

    const handleFilterChange = (e) => {
        setFilterText(e.target.value)
    }

    return (
        <div className="dashboard">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter posts..."
                    value={filterText}
                    onChange={handleFilterChange}
                    className="filter-input"
                    aria-label="Filter posts"
                />
                {filterText && (
                    <div className="filter-stats">
                        Showing {filteredPosts.length} of {posts.length} posts
                    </div>
                )}
            </div>

            {loading && (
                <div className="loading">
                    <p>Loading posts...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <p>Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="posts-container">
                    <h2>Blog Posts {filterText && `(Filtered: ${filteredPosts.length}/${posts.length})`}</h2>
                    {filteredPosts.length > 0 ? (
                        <ul className="posts-list">
                            {filteredPosts.map((post) => (
                                <li key={post.id} className="post-item">
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">No posts match your filter criteria.</p>
                    )}
                </div>
            )}

            <style jsx>{`
        .dashboard {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .filter-container {
          margin-bottom: 20px;
          position: relative;
        }
        
        .filter-input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        
        .filter-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
        
        .filter-stats {
          margin-top: 5px;
          font-size: 14px;
          color: #666;
        }
        
        .loading, .error {
          padding: 20px;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 4px;
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
        }
        
        .post-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
        
        h2 {
          color: #444;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
      `}</style>
        </div>
    )
}

