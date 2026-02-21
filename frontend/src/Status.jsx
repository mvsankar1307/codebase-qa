import { useEffect, useState } from "react"
import axios from "axios"

function Status() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:5000/health")
      .then(res => setHealth(res.data))
      .catch(err => {
        console.error(err)
        setError("Backend not reachable")
      })
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#e2e8f0",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>
      <h1>System Status</h1>

      {error && (
        <div style={{
          background: "#7f1d1d",
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px"
        }}>
          ❌ {error}
        </div>
      )}

      {health && (
        <div style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "8px"
        }}>
          <p>🟢 Backend: {health.status}</p>
          <p>📂 Files Loaded: {health.totalFilesLoaded}</p>
          <p>🧠 LLM: Mock Connected</p>
          <p>🗄 Database: In-Memory (Active)</p>
        </div>
      )}
    </div>
  )
}

export default Status