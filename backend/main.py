from fastapi import FastAPI

from routes.employee_registration import employer_registration_router
from routes.employee_registration_questions import employer_registration_questions_router
from routes.employee_registration_answers import employer_registration_answers_router
app = FastAPI()

app.include_router(employer_registration_router,prefix="/employer_registration",tags=["employer_registration"])
app.include_router(employer_registration_questions_router,prefix="/employer_registration_questions",tags=["employer_registration_questions"])
app.include_router(employer_registration_answers_router,prefix="/employer_registration_answers",tags=["employer_registration_answers"])
