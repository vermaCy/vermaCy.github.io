import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wiki.css";

const WikiSandboxPage: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const res = await fetch(
          "https://en.wikipedia.org/w/api.php?action=parse&page=User:JafarMammadli/sandbox&format=json&origin=*"
        );
        const data = await res.json();
        setContent(data.parse.text["*"]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWiki();
  }, []);

  return (
    <div className="wiki-container">
      {/* Real-style Top Header */}
      <header className="wiki-header-bar">
      <div className="wiki-logo-section">
  {/* This makes the Wikipedia logo go back to your App.tsx */}
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
    <img src="https://en.wikipedia.org/static/images/icons/wikipedia.png" width="30" alt="logo" />
             <span>Wikipedia </span>
             <span style={{ fontWeight: 'bold', color: '#0645ad' }}>/ Back to Investigation</span>
         </Link>
        </div>
        <div className="wiki-user-tools">
          
          <span>Talk</span>
         
          <span>Preferences</span>
          
        </div>
      </header>

      <div className="wiki-layout">
        {/* Navigation Sidebar */}
        <aside className="wiki-sidebar">
          <p style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Navigation</p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#0645ad', lineHeight: '2' }}>
            <li>Main page</li>
            <li>Contents</li>
            <li>Random article</li>
            <li>About Wikipedia</li>
          </ul>
        </aside>

        {/* Article Body */}
        <main className="wiki-main">
          <div className="wiki-article-header">
            <h1 className="wiki-title"></h1>
            <div className="wiki-subtitle">From Wikipedia, the free encyclopedia</div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              className="wiki-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default WikiSandboxPage;