# Rain Check Exercise

The Rain Check Exercise Chat Application is a real-time communication platform built using FastAPI on the server-side and React on the client-side. It enables users to send messages, and receive updates instantly. 
The server utilizes FastAPI for efficient handling of WebSocket connections, while the React client provides a seamless and responsive user interface for an optimal chatting experience.

### Prerequisites
- Python 3.10
- Pip (Python package installer)
- Node.js
- npm (Node Package Manager)

How to Run:

Install server dependencies:
```
pip install -r requirements.txt
```

Run the server: 
```
uvicorn main:app --reload --port 8000
```

Install client dependencies: 
```
cd client && npm install
```

Run the client: 
```
npm run dev
```
