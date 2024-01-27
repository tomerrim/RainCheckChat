import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sockets import sio_app
from args import parse_arguments
from logger import logger

app = FastAPI()
app.mount("/", app=sio_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message": "Rain Check Chat Exercise"}


def run_server(port):
    """
    Run the FastAPI server.

    Parameters:
    - port (int): The port number to run the server on.

    Returns:
    None
    """
    try:
        uvicorn.run("main:app", reload=True, port=port)
    except Exception as e:
        logger.error(f"Error running the server: {e}")


if __name__ == "__main__":
    args = parse_arguments()
    run_server(args.port)
