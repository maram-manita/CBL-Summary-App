import React, { useState } from "react";

const Home = ()=> {
  const [markdownContent, setMarkdownContent] = useState("");
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("English");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdownContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSummarize = async () => {
    if (!markdownContent) {
      alert("Please upload a Markdown file first.");
      return;
    }
    try {
      const data = await summarizeMarkdown(markdownContent, language);
      setSummary(data.summary);
    } catch (error) {
      alert(error.error || "Failed to generate summary.");
    }
  };

  return (
    <div>
      <h2>Markdown Summarizer</h2>
      <input type="file" accept=".md" onChange={handleFileUpload} />
      <br />
      <textarea
        value={markdownContent}
        readOnly
        rows={10}
        cols={50}
        placeholder="Markdown content will appear here..."
        style={{ display: "block", margin: "10px 0" }}
      ></textarea>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="Arabic">Arabic</option>
      </select>
      <br />
      <button onClick={handleSummarize}>Summarize</button>
      <h2>Summary</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          background: "#f9f9f9",
        }}
      >
        {summary ? (
          <pre>{summary}</pre>
        ) : (
          <p>Summary will appear here...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
