from fastapi import APIRouter
from dbcon.database import employer_registration_collection
from model.models import EmployerRegistration

import random

employer_registration_router = APIRouter()


@employer_registration_router.post("/")
async def employee_registration(employer_registration: EmployerRegistration):
    res = await employer_registration_collection.insert_one(employer_registration.dict())
    return {"res":"Registered successfully"}
