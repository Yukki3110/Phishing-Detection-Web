from pydantic import BaseModel

class DomainRequest(BaseModel):
    url: str