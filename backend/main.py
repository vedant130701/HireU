from fastapi import FastAPI
import uvicorn

from routes.employee_registration import employer_registration_router
from routes.employee_registration_questions import employer_registration_questions_router
from routes.employee_registration_answers import employer_registration_answers_router
from routes.employee_role_registration_questions import employer_role_registration_questions_router
from routes.employee_role_registration_answers import employer_role_registration_answers_router
from routes.question_answer_combined import candidate_answers_router
from routes.candidate_report_generation import candidate_report_generation

app = FastAPI()

app.include_router(employer_registration_router, prefix="/employer_registration", tags=["employer_registration"])
app.include_router(employer_registration_questions_router, prefix="/employer_registration_questions", tags=["employer_registration_questions"])
app.include_router(employer_registration_answers_router, prefix="/employer_registration_answers", tags=["employer_registration_answers"])

app.include_router(employer_role_registration_questions_router, prefix="/employer_role_registration_questions", tags=["employer_role_registration_questions"])
app.include_router(employer_role_registration_answers_router, prefix="/employer_role_registration_answers", tags=["employer_role_registration_answers"])

app.include_router(employer_registration_router, prefix="/employer_registration", tags=["employer_registration"])

app.include_router(candidate_answers_router, prefix="/candidate_answers", tags=["candidate_answers"])

app.include_router(candidate_report_generation, prefix="/candidate_report_generation", tags=["candidate_report_generation"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
