# Environment Cleanup

- All backend environment variables are now in `/backend/.env` and `/backend/.env.example`.
- Remove any `.env` or `.env.example` files from the root or frontend that are not needed for backend.
- Only keep variables relevant to backend in `/backend/.env`.
- Example variables:
  - `PORT`
  - `OLLAMA_BASE_URL`
  - `OLLAMA_MODEL`
  - `REACT_APP_API_URL` (if needed for backend)
