import socketio
from logger import logger

# Create an instance of the AsyncServer
sio_server = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])

# Create an ASGI application for the Socket.IO server
sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path="/sockets",
)

users = {}


@sio_server.event
async def connect(sid, environ, auth):
    """
    Handles the "connect" event when a client connects to the Socket.IO server.

    Parameters:
    - sid (str): The unique session ID of the connected client.
    - environ (dict): The ASGI environment dictionary.
    - auth (dict): Authentication information passed by the client.

    Returns:
    None
    """
    try:
        logger.info(f"{sid} connected")
        print(f"{sid} connected")

        # Emit a "join" event to notify others about the new connection
        await sio_server.emit("connected", {"sid": sid})
    except Exception as e:
        logger.error(f"Error handling connect event: {e}")


@sio_server.event
async def join(sid, data):
    """
    Handles the "join" event when a client wants to join the chat.

    Parameters:
    - sid (str): The unique session ID of the client.
    - data (dict): Data containing information like the user's name.

    Returns:
    None
    """
    try:
        name = data.get("name", "Anonymous")
        print(f"joined as {name}")
        logger.info(f"{sid} joined as {name}")

        users[sid] = {"name": name}

        # Emit a "join" event to notify others about the new connection
        await sio_server.emit("join", {"sid": sid, "name": name, "type": "join"})
    except Exception as e:
        logger.error(f"Error handling join event: {e}")


@sio_server.event
async def chat(sid, name, message):
    """
    Handles the "chat" event when a client sends a chat message.

    Parameters:
    - sid (str): The unique session ID of the client sending the message.
    - message (str): The chat message.

    Returns:
    None
    """
    try:
        # Emit a "chat" event to broadcast the message to all clients
        await sio_server.emit("chat", {"sid": sid, "name": name, "message": message})
    except Exception as e:
        logger.error(f"Error handling chat event: {e}")


@sio_server.event
async def disconnect(sid):
    """
    Handles the "disconnect" event when a client disconnects from the Socket.IO server.

    Parameters:
    - sid (str): The unique session ID of the disconnected client.

    Returns:
    None
    """
    try:
        logger.info(f"{sid} disconnected")
        print(f"{sid} disconnected")
        name = users.get(sid, {}).get("name", "Unknown")

        # Remove user's information from the dictionary
        if sid in users:
            del users[sid]

        # Emit an "exit" event to notify others about the client's disconnection
        await sio_server.emit(
            "exit", {"sid": sid, "name": name, "type": "exit"}, room=sid
        )
        print(f"exit {name}")
    except Exception as e:
        logger.error(f"Error handling disconnect event: {e}")
