from pydantic import BaseModel

class EmployerRegistration(BaseModel):
    employer_id: int
    employer_name: str
