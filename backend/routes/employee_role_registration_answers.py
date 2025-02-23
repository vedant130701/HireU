from fastapi import APIRouter, HTTPException
from dbcon.database import employer_role_registration_answers
from model.models import EmployerRoleRegistrationAnswers
from pymongo.errors import DuplicateKeyError


employer_role_registration_answers_router = APIRouter()

@employer_role_registration_answers_router.post("/")
async def employee_role_registration_answers(employee_role_registration_answers_body: EmployerRoleRegistrationAnswers):
    try:
        await employer_role_registration_answers.insert_one(employee_role_registration_answers_body.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Answers already exists against Employer")
    return {"res": "Answers inserted successfully" }