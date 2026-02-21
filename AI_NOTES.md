AI_NOTES.md

Overview

This project was built as a functional MVP within a limited time
window.
AI assistance was used for productivity and structuring, but all core
logic, architecture decisions, debugging, and deployment steps were
manually verified and implemented.



What AI Was Used For

AI was used to:

-   Structure the initial project plan
-   Refine UI layout ideas
-   Improve code readability
-   Generate documentation drafts
-   Help debug deployment and Git issues
-   Suggest improvements for production readiness

AI was NOT used for blind copy‑paste coding.
All logic was reviewed, adjusted, and tested manually.



Backend Logic Approach-

Current implementation uses:

-   ZIP file extraction
-   File-by-file scanning
-   Keyword-based search
-   Snippet extraction around matched lines

This was intentionally implemented as an MVP to:

-   Ensure deterministic results
-   Keep infrastructure simple
-   Avoid unnecessary complexity during first version


Why No LLM Integration Yet?

Due to time constraints and billing setup limitations, the first version
uses keyword search instead of embeddings or LLM reasoning.

Planned upgrade path:

1.  Add embedding-based semantic search
2.  Integrate OpenAI or OpenRouter API
3.  Add vector indexing for large repositories
4.  Improve ranking logic

The architecture already supports upgrading to AI-powered reasoning
without major refactoring.


Deployment Decisions

-   Backend deployed as Render Web Service
-   Frontend deployed as Render Static Site
-   GitHub connected for automatic deployments
-   Environment variables managed securely
-   No API keys committed to repository


What Was Manually Verified

-   ZIP extraction logic
-   Snippet matching accuracy
-   CORS configuration
-   Deployment pipeline
-   Frontend-backend communication
-   Error handling cases

Future Roadmap

-   LLM-based answer summarization
-   Syntax highlighting for snippets
-   Retry and architecture tracing logic
-   GitHub repo URL ingestion
-   Database-backed storage instead of localStorage



This project demonstrates structured thinking, clean deployment
practices, and scalable architecture planning beyond just MVP
implementation.
