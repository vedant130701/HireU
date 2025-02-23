from fastapi import APIRouter, HTTPException
from dbcon.database import employer_registration_collection
from model.models import EmployerRegistration
from pymongo.errors import DuplicateKeyError

import random

employer_registration_router = APIRouter()


@employer_registration_router.post("/")
async def employee_registration(employer_registration: EmployerRegistration):
    try:
        await employer_registration_collection.insert_one(employer_registration.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="User already exists")

    return {"res": "Registered successfully"}
