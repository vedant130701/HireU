from fastapi import APIRouter, HTTPException
from dbcon.database import candidate_answers, employer_role_registration_questions, employer_role_registration_answers
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

tasks = {}


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
       # Get the questions for the by employer role
       employer_questions = await employer_role_registration_questions.find_one({"employer_id": body.employer_id, "role_id": body.role_id}) or {}

       
        # Get the answers for the employer role
       employer_answers = await employer_role_registration_answers.find_one({"employer_id": body.employer_id, "role_id": body.role_id}) or {}

        #merge the questions and answers to form merged
       employerQA = format_questions(employer_questions, employer_answers.get("answers", []))
       
       #get candidate ans
       candidate_answers = await candidate_answers.find_one({"employer_id": body.employer_id, "role_id": body.role_id, "candidate_id": body.candidate_id}) or {}
       answers_list = candidate_answers.get("answers", [])
       json_answer_list = json.dumps(answers_list)
       
       if not isinstance(answers_list, list):
        raise HTTPException(status_code=500, detail="Invalid format: 'answers' should be a list of dictionaries.")
       

       task = asyncio.create_task(make_report(employerQA, json_answer_list))
       tasks[f"report_generation{id(task)}"] = task

       return {"res": f"report gen started, task id: {id(task)}", "id": id(task)}
    
    except Exception:
        raise HTTPException(status_code=400, detail="Error")

@candidate_report_generation.get("/get_report/{task_id}")
async def get_task_result(task_id: int):
    task = tasks.get(f"report_generation{task_id}")
    if task and task.done():
        return await task  # Retrieve the result
    return "Task is still running"
