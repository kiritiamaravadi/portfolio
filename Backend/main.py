from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, change to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the correct path to store emails.json in the Portfolio/ folder
EMAILS_FILE = Path(__file__).resolve().parent.parent / "emails.json"

@app.post("/submit-email")
async def submit_email(request: Request):
    data = await request.json()
    email = data.get("email")

    if not email:
        return {"status": "error", "message": "No email provided."}

    try:
        with open(EMAILS_FILE, "r") as f:
            emails = json.load(f)
    except FileNotFoundError:
        emails = []

    emails.append(email)

    with open(EMAILS_FILE, "w") as f:
        json.dump(emails, f, indent=2)

    return {"status": "success", "message": "Email saved!"}
