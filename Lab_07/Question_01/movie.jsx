"use client";

import { useState } from "react"

export default function Movie({ id, title, onUpdate, onRemove }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)

    const styles = {
        container: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            backgroundColor: "white",
        },
        title: {
            flex: 1,
            fontWeight: 500,
        },
        editContainer: {
            flex: 1,
            display: "flex",
            gap: "8px",
        },
        input: {
            flex: 1,
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        saveButton: {
            backgroundColor: "#22c55e",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
        },
        cancelButton: {
            backgroundColor: "#d1d5db",
            color: "#374151",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
        },
        editButton: {
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
        },
        removeButton: {
            backgroundColor: "#ef4444",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
        },
    }

    const handleUpdate = () => {
        if (editedTitle.trim() === "") return
        onUpdate(id, editedTitle)
        setIsEditing(false)
    }

    return (
        <div style={styles.container}>
            {isEditing ? (
                <div style={styles.editContainer}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={styles.input}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdate()
                            if (e.key === "Escape") {
                                setEditedTitle(title)
                                setIsEditing(false)
                            }
                        }}
                    />
                    <button onClick={handleUpdate} style={styles.saveButton}>
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setEditedTitle(title)
                            setIsEditing(false)
                        }}
                        style={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <div style={styles.title}>{title}</div>
                    <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                        Edit
                    </button>
                </>
            )}
            <button onClick={() => onRemove(id)} style={styles.removeButton}>
                Remove
            </button>
        </div>
    )
}

