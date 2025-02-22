from fastapi import APIRouter
from dbcon.database import employer_registration_answers
from model.models import EmployerRegistrationAnswers

import random

employer_registration_answers_router = APIRouter()


@employer_registration_answers_router.post("/")
async def employee_registration_answers(employer_registration_answers_body: EmployerRegistrationAnswers):
    res = await employer_registration_answers.insert_one(employer_registration_answers_body.dict())
    return {"res": "Answers inserted successfuly" }