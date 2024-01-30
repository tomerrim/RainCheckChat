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

Enter Name page:
![chatapp-nameform](https://github.com/tomerrim/RainCheckChat/assets/126825978/0bf09e4f-5c95-4b8b-8cf3-904e02431c45)

Join Chat:
![chatapp-chatpage](https://github.com/tomerrim/RainCheckChat/assets/126825978/24c3330e-673b-43f2-ada5-2fe46d02608b)

Chatting:
![chatapp-chat](https://github.com/tomerrim/RainCheckChat/assets/126825978/6c23a501-7a65-4027-806d-5eac26b18aa1)

One user has left:
![chatapp-userleft](https://github.com/tomerrim/RainCheckChat/assets/126825978/870e2a39-cd64-45b3-bf53-cc1847de92d0)






