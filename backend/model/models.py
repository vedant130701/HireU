from pydantic import BaseModel
from typing import List, Optional, Any


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


class EmployerRoleRegistrationQuestions(BaseModel):
    employer_id: str
    questions: List[str]
    role_id: str


class EmployerRoleRegistrationAnswers(BaseModel):
    employer_id: str
    answers: List[str]
    role_id: str


# class QuestionAnswer(BaseModel):
#     role: str
#     content: str
#     index: int

class CandidateAnswers(BaseModel):
    candidate_id: str
    employer_id: str
    role_id: str
    answers: List[Any]

class ReportGen(BaseModel):
    employer_id: str
    role_id: str
    candidate_id: str