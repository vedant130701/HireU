from fastapi import APIRouter, HTTPException
from dbcon.database import employer_registration_collection
from model.models import EmployerRegistration, EmployerRegistrationLogin
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

@employer_registration_router.post("/login")
async def employee_login(employer_registration: EmployerRegistrationLogin):
    employer = await employer_registration_collection.find_one({"employer_id": employer_registration.employer_id})
    if employer is None:
        raise HTTPException(status_code=400, detail="User not found")
    if employer["employer_password"] != employer_registration.employer_password:
        raise HTTPException(status_code=400, detail="Invalid password")
    return {"res": "Login successful"}