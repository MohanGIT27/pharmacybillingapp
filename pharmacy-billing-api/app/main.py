
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, inventory, billing

app = FastAPI()

origins = ["https://your-frontend-domain.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(inventory.router)
app.include_router(billing.router)
