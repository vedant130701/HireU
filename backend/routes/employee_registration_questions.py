from fastapi import APIRouter, HTTPException
from dbcon.database import employer_registration_questions
from model.models import EmployerRegistrationQuestions
from pymongo.errors import DuplicateKeyError

import random

employer_registration_questions_router = APIRouter()


@employer_registration_questions_router.post("/")
async def employee_registration_questions(employer_registration_questions_body: EmployerRegistrationQuestions):
    try:
        await employer_registration_questions.insert_one(employer_registration_questions_body.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Questions already exists against Employer")
    return {"res": "Questions added successfully"}


@employer_registration_questions_router.get("/{employer_id}")
async def employee_registration_questions_get(employer_id: str):
    employer_questions = await employer_registration_questions.find_one({"employer_id": employer_id})
    if not employer_questions:
        raise HTTPException(status_code=404, detail="Employer ID not found")

    return {"res": employer_questions.get("questions", [])}
