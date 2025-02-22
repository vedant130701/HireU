from fastapi import APIRouter
from dbcon.database import employer_registration_questions
from model.models import EmployerRegistrationQuestions

import random

employer_registration_questions_router = APIRouter()


@employer_registration_questions_router.post("/")
async def employee_registration_questions(employer_registration_questions_body: EmployerRegistrationQuestions):
    res = await employer_registration_questions.insert_one(employer_registration_questions_body.dict())
    return {"res": "Questions added successfuly" }
