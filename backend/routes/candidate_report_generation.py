from fastapi import APIRouter, HTTPException
from dbcon.database import candidate_answers, employer_role_registration_questions, employer_role_registration_answers, candidate_info
from model.models import ReportGen
from pymongo.errors import DuplicateKeyError
import json
import sys
import os
import asyncio
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../LLM_Server')))
from report_gen import make_report

import random

candidate_report_generation = APIRouter()

# tasks = {}


def format_questions(candidate_questions_final, answers_list):
    formatted_text = ""
    for idx, question in enumerate(candidate_questions_final.get("questions", []), start=0):
        temp_txt = f"Q:{question} "
        temp_txt += "A:" + answers_list[idx] + "\n"
        formatted_text += temp_txt
    return formatted_text



@candidate_report_generation.post("/")
async def generate_report(body: ReportGen):
    try:
        # Get the questions for the employer role
        employer_questions = await employer_role_registration_questions.find_one(
            {"employer_id": body.employer_id, "role_id": body.role_id}
        ) or {}

        # Get the answers for the employer role
        employer_answers = await employer_role_registration_answers.find_one(
            {"employer_id": body.employer_id, "role_id": body.role_id}
        ) or {}

        # Merge the questions and answers
        employerQA = format_questions(employer_questions,
                                      employer_answers.get("answers", []) if employer_answers else [])

        # Get candidate answers
        candidate_answer = await candidate_answers.find_one(
            {"employer_id": body.employer_id, "role_id": body.role_id, "candidate_id": body.candidate_id}
        ) or {}

        answers_list = candidate_answer.get("answers", [])

        # Ensure answers_list is a list
        if not isinstance(answers_list, list):
            raise HTTPException(status_code=500, detail="Invalid format: 'answers' should be a list of dictionaries.")

        # Ensure `tasks` is globally defined before using it
        # if "tasks" not in globals():
        tasks = {}

        # Create async task
        # task = asyncio.create_task(make_report(employerQA, answers_list))
        # tasks[f"report_generation_{id(task)}"] = task
        # tasks[f"report_generation_1"] = 1

        final_response = await make_report(employerQA, answers_list)
        get_candidate_name = await candidate_info.find_one({"candidate_id": body.candidate_id})
        final_response.append({"Name": get_candidate_name.get("name")})
        final_response.append({"Position": body.role_id})

        # return {"res": f"Report generation started, task ID: {id(task)}", "id": id(task)}
        # return {"res": f"Report generation started, task ID:", "json_answer_list": answers_list, "employerQA": employerQA}
        return {"res": final_response}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")


@candidate_report_generation.get("/get_report/{task_id}")
async def get_task_result(task_id: int):
    task = tasks.get(f"report_generation{task_id}")
    if task and task.done():
        return await task  # Retrieve the result
    return "Task is still running"
