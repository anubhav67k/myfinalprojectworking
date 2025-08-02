from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder

# Load environment variables
load_dotenv()

app = FastAPI()

# Serve static files (React build)
app.mount("/static", StaticFiles(directory="../frontend/dist/static"), name="static")

# Templates
templates = Jinja2Templates(directory="../frontend/dist")

# Azure AI Foundry setup
AIPROJECT_ENDPOINT = os.getenv("AZURE_EXISTING_AIPROJECT_ENDPOINT")
AGENT_ID = os.getenv("AZURE_EXISTING_AGENT_ID")

project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint=AIPROJECT_ENDPOINT
)
agent = project.agents.get_agent(AGENT_ID)

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def serve_react_app(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
def chat(req: ChatRequest):
    thread = project.agents.threads.create()
    project.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=req.question
    )
    run = project.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id
    )
    if run.status == "failed":
        return {"error": run.last_error}
    messages = project.agents.messages.list(thread_id=thread.id, order=ListSortOrder.ASCENDING)
    for message in messages:
        if message.text_messages:
            return {"role": message.role, "text": message.text_messages[-1].text.value}
    return {"error": "No response from agent"}
