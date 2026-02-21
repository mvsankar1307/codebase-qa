CodeLens AI -- Codebase Q&A Tool

CodeLens AI is a full-stack web application that allows users to upload
a codebase (ZIP file) and ask natural language questions about it.

The system extracts the code, searches relevant files, and returns: 
Matching file paths, Code snippets, A structured answer, Last 10 Q&A history

Live Demo

Frontend: https://codebase-qa-frontend.onrender.com

Backend: https://codebase-qa-3m62.onrender.com

Health Check: https://codebase-qa-3m62.onrender.com/health

Tech Stack

Frontend:
-   React (Vite)
-   Axios
-   React Router
-   LocalStorage (Q&A history)

Backend:
-   Node.js
-   Express.js
-   Multer (file uploads)
-   Unzipper (ZIP extraction)
-   CORS
-   dotenv

Deployment:
-   Render (Web Service for backend)
-   Render (Static Site for frontend)
-   GitHub (CI/CD integration)


Features:

Upload Codebase:
-   Accepts ZIP files
-   Extracts and stores files
-   Prepares for search

Ask Questions:
Example: - "Where is authentication handled?" - "How are retries
implemented?"

Returns: - Relevant file paths - Extracted code snippets - Structured
response

Code Snippet Panel:
Shows matched code blocks separately for clarity.

History:
Stores last 10 Q&A interactions using localStorage.

Status Page:
Displays backend health and system readiness.

Current Logic:
The current implementation uses: Keyword-based search File-by-file
text scanning, Snippet extraction around matched terms. This provides fast, deterministic results for the MVP.


Future Improvements:

-LLM integration (OpenAI / OpenRouter)
-Embedding-based semantic search
-Vector database for smarter retrieval
-Syntax highlighting
-Refactor suggestion generation
-GitHub repository URL ingestion
-Persistent database storage


Project Structure:

    codebase-qa
    ├── backend
    │   ├── index.js
    │   ├── uploads
    │   ├── extracted
    │   ├── package.json
    │   └── .env.example
    │
    ├── frontend
    │   ├── src
    │   ├── dist
    │   ├── package.json
    │   └── vite.config.js
  


Running Locally-

Backend:

    cd backend
    npm install
    npm start

Runs at: http://localhost:5000

Frontend:

    cd frontend
    npm install
    npm run dev

Runs at: http://localhost:5173

Environment Variables-

Create `.env` inside backend:

    PORT=5000

Use `.env.example` as reference.


Author:

Sankar MV
Full-Stack Developer
React | Node.js | UI/UX

GitHub: https://github.com/mvsankar1307

Summary:

CodeLens AI demonstrates: Full-stack development - File processing -
Backend logic implementation - React UI state management - Deployment &
DevOps workflow - Production-ready structure

