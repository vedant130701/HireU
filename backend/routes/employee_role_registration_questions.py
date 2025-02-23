from fastapi import APIRouter, HTTPException
from dbcon.database import employer_role_registration_questions
from model.models import EmployerRoleRegistrationQuestions
from pymongo.errors import DuplicateKeyError


employer_role_registration_questions_router = APIRouter()

@employer_role_registration_questions_router.post("/")
async def employee_role_registration_questions(employee_role_registration_questions_body: EmployerRoleRegistrationQuestions):
    try:
        await employer_role_registration_questions.insert_one(employee_role_registration_questions_body.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Questions already exists against Employer")
    return {"res": "Questions inserted successfully" }


@employer_role_registration_questions_router.get("/{employer_id}")
async def employee_role_registration_questions_get(employer_id: str):
    employer_questions = await employer_role_registration_questions.find_one({"employer_id": employer_id})
    if not employer_questions:
        raise HTTPException(status_code=404, detail="Employer ID not found")