from fastapi import FastAPI, Request
from pydantic import BaseModel
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder

app = FastAPI()

# Setup Azure AI Foundry connection
project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://anubhavkaushik67-1809-resource.services.ai.azure.com/api/projects/anubhavkaushik67-1809"
)
agent = project.agents.get_agent("asst_Awnyo1OAaoVIZ067KhKe5Yyb")

class MessageRequest(BaseModel):
    content: str

@app.post("/chat")
async def chat(request: MessageRequest):
    thread = project.agents.threads.create()
    project.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=request.content
    )
    run = project.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id
    )
    if run.status == "failed":
        return {"error": run.last_error}
    messages = project.agents.messages.list(thread_id=thread.id, order=ListSortOrder.ASCENDING)
    response = []
    for message in messages:
        if message.text_messages:
            response.append({
                "role": message.role,
                "text": message.text_messages[-1].text.value
            })
    return {"messages": response}