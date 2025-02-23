from fastapi import APIRouter, HTTPException
from dbcon.database import employer_registration_answers
from model.models import EmployerRegistrationAnswers
from pymongo.errors import DuplicateKeyError


employer_registration_answers_router = APIRouter()


@employer_registration_answers_router.post("/")
async def employee_registration_answers(employer_registration_answers_body: EmployerRegistrationAnswers):
    try:
        await employer_registration_answers.insert_one(employer_registration_answers_body.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Answers already exists against Employer")
    return {"res": "Answers inserted successfully" }