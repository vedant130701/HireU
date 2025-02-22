from fastapi import APIRouter
from dbcon.database import employer_registration_collection
from model.models import EmployerRegistration

import random

employer_registration_router = APIRouter()


@employer_registration_router.post("/")
async def employee_registration(employer_registration: EmployerRegistration):
    employer_id = random.randint(0, 1000000)
    employer_registration.employer_id = employer_id
    res = await employer_registration_collection.insert_one(employer_registration.dict())
    return {"employer_id": employer_id}
