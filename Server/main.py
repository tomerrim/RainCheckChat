import uvicorn
from fastapi import FastAPI
from sockets import sio_app

app = FastAPI()
app.mount('/', app=sio_app)


@app.get('/')
async def home():
    return {"message": "Rain Check Chat Exercise"}

if __name__ == "__main__":
    uvicorn.run('main:app', reload=True)
