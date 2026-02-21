import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import axios from "axios"
import Status from "./Status"

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [snippets, setSnippets] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("qaHistory")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("qaHistory", JSON.stringify(history))
  }, [history])

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("zipFile", selectedFile)

    try {
      setIsUploading(true)

      await axios.post(
        "http://localhost:5000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setIsUploaded(true)
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAsk = async () => {
    if (!question) return

    try {
      const res = await axios.post(
        "http://localhost:5000/ask",
        { question }
      )

      setAnswer(res.data.answer)
      setSnippets(res.data.references || [])

      const updatedHistory = [
        { question, answer: res.data.answer },
        ...history
      ].slice(0, 10)

      setHistory(updatedHistory)
      setQuestion("")
    } catch (error) {
      console.error(error)
      alert("Ask request failed")
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
            
            {/* Sidebar */}
            <div
              style={{
                width: "260px",
                background: "#1e293b",
                color: "white",
                padding: "20px",
                overflowY: "auto"
              }}
            >
              <h2>Recent Q&A</h2>

              <Link
                to="/status"
                style={{
                  display: "block",
                  marginBottom: "20px",
                  color: "#60a5fa",
                  textDecoration: "none"
                }}
              >
                View System Status →
              </Link>

              {history.length === 0 ? (
                <p style={{ fontSize: "14px", opacity: 0.6 }}>
                  No questions yet
                </p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      background: "#334155",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    onClick={() => {
                      setQuestion(item.question)
                      setAnswer(item.answer)
                    }}
                  >
                    {item.question}
                  </div>
                ))
              )}
            </div>

            {/* Main Content */}
            <div
              style={{
                flex: 1,
                padding: "30px",
                background: "#0f172a",
                color: "#e2e8f0"
              }}
            >
              <h1>CodeLens AI</h1>
              <p style={{ color: "#94a3b8" }}>
                Upload a codebase and ask questions.
              </p>

              {/* Upload Section */}
              <div
                style={{
                  border: "1px solid #334155",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "8px"
                }}
              >
                <h3>Upload Codebase</h3>

                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={handleUpload}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>

                {selectedFile && (
                  <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "10px" }}>
                    Selected: {selectedFile.name}
                  </p>
                )}

                {isUploaded && (
                  <p style={{ color: "#22c55e", marginTop: "10px" }}>
                    Codebase uploaded successfully ✅
                  </p>
                )}
              </div>

              {/* Ask Section */}
              <div style={{ marginTop: "30px" }}>
                <h3>Ask Question</h3>

                <input
                  style={{
                    width: "60%",
                    padding: "10px",
                    marginRight: "10px"
                  }}
                  placeholder="Where is authentication handled?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />

                <button
                  disabled={!isUploaded}
                  style={{
                    opacity: isUploaded ? 1 : 0.5,
                    cursor: isUploaded ? "pointer" : "not-allowed"
                  }}
                  onClick={handleAsk}
                >
                  Ask
                </button>
              </div>

              {/* Results */}
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  gap: "20px"
                }}
              >
                {/* Answer */}
                <div
                  style={{
                    flex: 1,
                    border: "1px solid #334155",
                    padding: "20px",
                    borderRadius: "8px",
                    background: "#1e293b"
                  }}
                >
                  <h3>AI Answer</h3>
                  <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {answer || "Answer will appear here..."}
                  </div>
                </div>

                {/* Snippets */}
                <div
                  style={{
                    flex: 1,
                    border: "1px solid #334155",
                    padding: "20px",
                    borderRadius: "8px",
                    background: "#1e293b"
                  }}
                >
                  <h3>Code Snippets</h3>

                  {snippets.length === 0 ? (
                    <div>Code snippets will appear here...</div>
                  ) : (
                    snippets.map((ref, index) => (
                      <div key={index} style={{ marginBottom: "15px" }}>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#60a5fa",
                            marginBottom: "5px"
                          }}
                        >
                          {ref.filePath}
                        </div>

                        <pre
                          style={{
                            background: "#0f172a",
                            padding: "10px",
                            borderRadius: "6px",
                            overflowX: "auto"
                          }}
                        >
                          {ref.snippet}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Route path="/status" element={<Status />} />
    </Routes>
  )
}

export default App