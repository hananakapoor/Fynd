// App.js
import React, { useState } from "react";

// Social media links
const socialLinks = [
  { name: "Instagram", url: "https://instagram.com", icon: "fa-brands fa-instagram", color: "#E1306C" },
  { name: "TikTok", url: "https://tiktok.com", icon: "fa-brands fa-tiktok", color: "#25F4EE" },
  { name: "X", url: "https://x.com", icon: "fa-brands fa-x-twitter", color: "#14171A" },
  { name: "Facebook", url: "https://facebook.com", icon: "fa-brands fa-facebook", color: "#1877F2" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin", color: "#0A66C2" },
];

// Default trending posts
const defaultResults = [
  { id: 1, title: "@leomessi", description: "Just posted a photo of his retirement from AFA", url: "https://www.instagram.com/p/DOOZqk1jJhD/" },
  { id: 2, title: "@menamassoud", description: "Shared a photo of his wedding.", url: "https://www.instagram.com/p/DOUEVs7ElNx/" },
  { id: 3, title: "Travel Bug", description: "Discover the top 10 places to visit in 2025!", url: "https://example.com/post4" },
];

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(defaultResults);
  const [loading, setLoading] = useState(false);

  // Search function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setResults(defaultResults); // Reset to default trending
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setResults(data.length ? data : [{ id: 0, title: "No results found", description: "", url: "#" }]);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([{ id: 0, title: "Error fetching results", description: "", url: "#" }]);
    } finally {
      setLoading(false);
    }
  };

  const socialMediaIcons = (
    <div style={socialIconsContainer}>
      {socialLinks.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ ...socialIconStyle, backgroundColor: link.color }}>
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );

  return (
    <div style={bodyStyle}>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        body {
          font-family: 'Inter', sans-serif;
          background-image: url('https://images.unsplash.com/photo-1510511459019-5be77ca7561c?q=80&w=2940&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: -1;
        }

        .container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .search-bar {
            flex-direction: column;
            border-radius: 20px;
          }
          .search-bar input {
            border-radius: 20px 20px 0 0;
          }
          .search-bar button {
            border-radius: 0 0 20px 20px;
          }
          .social-icons a {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
          .results-grid {
            grid-template-columns: 1fr;
          }
          .result-card {
            padding: 20px;
          }
        }
      `}
      </style>

      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={h1Style}>
            <i className="fa-solid fa-magnifying-glass"></i>
            Fynd
          </h1>
          {socialMediaIcons}
        </header>

        <form onSubmit={handleSearch} style={searchBarContainer}>
          <input
            type="text"
            placeholder="Search the web privately with AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInputStyle}
          />
          <button type="submit" style={searchButtonStyle}>Search</button>
        </form>

        {loading && <p style={{ textAlign: "center", marginTop: "1rem" }}>Searching...</p>}

        {results.length > 0 && (
          <div style={resultsContainerStyle}>
            <h2 style={resultsHeadingStyle}>Results</h2>
            <div style={resultsGridStyle}>
              {results.map((result, index) => (
                <div key={result.id || index} style={resultCardStyle}>
                  <a href={result.url} target="_blank" rel="noopener noreferrer" style={resultTitleStyle}>{result.title}</a>
                  {result.description && <p style={resultDescriptionStyle}>{result.description}</p>}
                  <a href={result.url} target="_blank" rel="noopener noreferrer" style={resultLinkStyle}>{result.url}</a>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer style={footerStyle}>
          <p>© 2025 Fynd. All rights reserved to Hanana.</p>
        </footer>
      </div>
    </div>
  );
};

// ======================
// Styles (your existing styles)
// ======================

const bodyStyle = {
  fontFamily: "'Inter', sans-serif",
  minHeight: "100vh",
  padding: "40px 20px",
  color: "#fff",
  position: "relative",
};

const containerStyle = {
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
};

const headerStyle = {
  padding: "20px",
  marginBottom: "2rem",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
};

const h1Style = {
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "white",
  marginBottom: "2rem",
  marginTop: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
};

const socialIconsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
};

const socialIconStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  color: "white",
  textDecoration: "none",
};

const searchBarContainer = {
  display: "flex",
  width: "100%",
  maxWidth: "600px",
  borderRadius: "50px",
  overflow: "hidden",
  margin: "2rem auto",
  boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
  background: "rgba(255,255,255,0.2)",
};

const searchInputStyle = {
  flexGrow: 1,
  padding: "16px 25px",
  fontSize: "1rem",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#fff",
};

const searchButtonStyle = {
  padding: "16px 30px",
  fontSize: "1rem",
  fontWeight: "600",
  border: "none",
  background: "linear-gradient(90deg, #6c5ce7, #a463f2)",
  color: "#fff",
  cursor: "pointer",
};

const resultsContainerStyle = { width: "100%", marginTop: "3rem" };
const resultsHeadingStyle = { fontSize: "1.8rem", fontWeight: "600", color: "#fff", textAlign: "center", marginBottom: "2rem" };
const resultsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" };
const resultCardStyle = { background: "rgba(255,255,255,0.1)", padding: "25px", borderRadius: "20px", backdropFilter: "blur(15px)" };
const resultTitleStyle = { fontSize: "1.2rem", fontWeight: "600", color: "#fff", textDecoration: "none", marginBottom: "10px" };
const resultDescriptionStyle = { fontSize: "0.95rem", color: "#eee", lineHeight: "1.6", marginBottom: "15px" };
const resultLinkStyle = { fontSize: "0.95rem", color: "#a463f2", textDecoration: "none", fontWeight: "600" };
const footerStyle = { marginTop: "4rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" };

export default App;
