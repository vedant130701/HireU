from fastapi import FastAPI

from routes.employee_registration import employer_registration_router
app = FastAPI()

app.include_router(employer_registration_router,prefix="/employer_registration",tags=["employer_registration"])
