import { Routes, Route, Outlet, NavLink, Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Roll No: 22L-7971

function Layout() {
  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <nav style={styles.navContainer}>
          <ul style={styles.navList}>
            <li>
              <NavLink to="/" style={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/concepts" style={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}>
                Concepts
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" style={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main style={styles.mainContent}>
        <Outlet />
      </main>
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} (Hasan Yahya) FAST NUCES LAB 10 - Instructor: Sir Hasan Raza Chaudhry Jatt
        </p>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Welcome to React Concepts Documentation</h1>
      <p style={styles.paragraph}>
        This documentation site covers key React concepts to help you understand and use React effectively.
      </p>
      <p style={styles.paragraph}>Navigate to the Concepts section to explore different React topics.</p>
    </div>
  )
}

function ConceptsOverviewPage() {
  // Get concepts from Redux store
  const concepts = useSelector((state) => state.conceptsData.concepts)

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>React Concepts</h1>
      <p style={styles.paragraph}>Explore these fundamental React concepts to build better applications:</p>

      <div style={styles.conceptsGrid}>
        {concepts.map((concept) => (
          <div key={concept.id} style={styles.conceptCard}>
            <h2 style={styles.conceptCardHeading}>{concept.name}</h2>
            <p style={styles.paragraph}>{concept.description.substring(0, 100)}...</p>
            <Link to={`/concepts/${concept.id}`} style={styles.conceptLink}>
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>About React Concepts</h1>
      <p style={styles.paragraph}>
        This documentation site was created to help developers learn and understand key React concepts.
      </p>
      <p style={styles.paragraph}>
        React is a JavaScript library for building user interfaces, particularly single-page applications.
      </p>
      <p style={styles.paragraph}>
        It's used for handling the view layer in web and mobile apps and allows us to create reusable UI components.
      </p>
    </div>
  )
}

function ConceptDetailPage() {
  const { conceptId } = useParams()
  // Get concepts from Redux store
  const concepts = useSelector((state) => state.conceptsData.concepts)
  const concept = concepts.find((c) => c.id === conceptId)

  if (!concept) {
    return (
      <div style={styles.pageContainer}>
        <h1 style={styles.heading}>Concept Not Found</h1>
        <p style={styles.paragraph}>The concept you're looking for doesn't exist.</p>
        <Link to="/concepts" style={styles.backButton}>
          Back to Concepts
        </Link>
      </div>
    )
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.conceptDetailCard}>
        <h1 style={styles.heading}>{concept.name}</h1>
        <p style={styles.paragraph}>{concept.description}</p>

        <Link to={`/concepts/${conceptId}/examples`} style={styles.viewExamplesButton}>
          View Examples
        </Link>

        <div style={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function ExamplesPage() {
  const { conceptId } = useParams()
  const navigate = useNavigate()
  // Get concepts from Redux store
  const concepts = useSelector((state) => state.conceptsData.concepts)
  const concept = concepts.find((c) => c.id === conceptId)

  if (!concept) {
    return <div>Examples not found</div>
  }

  const handleBackClick = () => {
    navigate("..")
  }

  return (
    <div style={styles.examplesContainer}>
      <h2 style={styles.examplesHeading}>Examples for {concept.name}</h2>

      <div style={styles.examplesList}>
        {concept.examples.map((example, index) => (
          <div key={index} style={styles.exampleItem}>
            <code style={styles.codeBlock}>{example}</code>
          </div>
        ))}
      </div>

      <button onClick={handleBackClick} style={styles.backButton}>
        Back to Concept Details
      </button>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div style={styles.notFoundContainer}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" style={styles.homeLink}>
        Go to Home
      </Link>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="concepts" element={<ConceptsOverviewPage />} />
        <Route path="concepts/:conceptId" element={<ConceptDetailPage />}>
          <Route path="examples" element={<ExamplesPage />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    backgroundColor: "#f8f9fa",
    color: "#333",
    lineHeight: 1.6,
  },
  header: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    gap: "1.5rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    padding: "0.5rem 0",
    position: "relative",
  },
  activeNavLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: 500,
    padding: "0.5rem 0",
    position: "relative",
    borderBottom: "2px solid #0066cc",
  },
  mainContent: {
    flex: 1,
    padding: "2rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  footer: {
    backgroundColor: "#e9ecef",
    textAlign: "center",
    padding: "1rem",
    marginTop: "auto",
  },
  pageContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "1.5rem",
    color: "#333",
  },
  paragraph: {
    marginBottom: "1rem",
  },
  conceptsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  },
  conceptCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  conceptCardHeading: {
    marginBottom: "0.75rem",
    color: "#0066cc",
  },
  conceptLink: {
    display: "inline-block",
    marginTop: "1rem",
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: 500,
  },
  conceptDetailCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  viewExamplesButton: {
    display: "inline-block",
    backgroundColor: "#0066cc",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    textDecoration: "none",
    marginTop: "1rem",
    fontWeight: 500,
    transition: "background-color 0.2s",
  },
  outletContainer: {
    marginTop: "2rem",
  },
  examplesContainer: {
    backgroundColor: "#f0f7ff",
    borderRadius: "8px",
    padding: "1.5rem",
    marginTop: "1.5rem",
  },
  examplesHeading: {
    marginBottom: "1rem",
    color: "#0066cc",
  },
  examplesList: {
    marginBottom: "1.5rem",
  },
  exampleItem: {
    marginBottom: "1rem",
    padding: "0.75rem",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  codeBlock: {
    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    backgroundColor: "#f5f5f5",
    padding: "2px 6px",
    borderRadius: "4px",
    display: "block",
    width: "100%",
    margin: "8px 0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  backButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s",
  },
  notFoundContainer: {
    textAlign: "center",
    padding: "3rem 1rem",
  },
  homeLink: {
    display: "inline-block",
    backgroundColor: "#0066cc",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    marginTop: "1.5rem",
    fontWeight: 500,
    transition: "background-color 0.2s",
  },
}
