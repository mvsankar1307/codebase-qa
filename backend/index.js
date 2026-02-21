require("dotenv").config()
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const unzipper = require("unzipper")
const fs = require("fs-extra")
const path = require("path")

const app = express()
const upload = multer({ dest: "uploads/" })

app.use(cors())
app.use(express.json())

let allFiles = []

// ===============================
// Read files recursively
// ===============================
function readFilesRecursively(dir) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (file !== "node_modules") {
        readFilesRecursively(fullPath)
      }
    } else {
      if (file.endsWith(".js") || file.endsWith(".ts")) {
        const content = fs.readFileSync(fullPath, "utf8")

        allFiles.push({
          path: fullPath,
          content
        })
      }
    }
  })
}

// ===============================
// Health route
// ===============================
app.get("/health", (req, res) => {
  res.json({
    status: "Backend running ✅",
    totalFilesLoaded: allFiles.length
  })
})

// ===============================
// Upload route
// ===============================
app.post("/upload", upload.single("zipFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const zipPath = req.file.path
    const extractPath = path.join(__dirname, "extracted")

    await fs.remove(extractPath)
    await fs.ensureDir(extractPath)

    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise()

    allFiles = []
    readFilesRecursively(extractPath)

    console.log("Total code files loaded:", allFiles.length)

    res.json({
      message: "ZIP extracted successfully ✅",
      fileCount: allFiles.length
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Upload failed" })
  }
})

// ===============================
// Ask route
// ===============================
app.post("/ask", (req, res) => {
  const { question } = req.body

  if (!question) {
    return res.status(400).json({ error: "Question required" })
  }

  if (allFiles.length === 0) {
    return res.status(400).json({ error: "No codebase uploaded yet" })
  }

  const results = allFiles.filter(file =>
    file.content.toLowerCase().includes(question.toLowerCase())
  )

  if (results.length === 0) {
    return res.json({
      answer: "No matching code found.",
      references: []
    })
  }

  const matchedFile = results[0]

  res.json({
    answer: `Found match in:\n\n${matchedFile.path}`,
    references: [
      {
        filePath: matchedFile.path,
        snippet: matchedFile.content.slice(0, 500)
      }
    ]
  })
})

// ===============================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})