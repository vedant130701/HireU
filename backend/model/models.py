from pydantic import BaseModel
from typing import List

class EmployerRegistration(BaseModel):
    employer_id: str
    employer_name: str
    employer_password: str

class EmployerRegistrationQuestions(BaseModel):
    employer_id: str
    questions: List[str]

class EmployerRegistrationAnswers(BaseModel):
    employer_id: str
    answers: List[str]