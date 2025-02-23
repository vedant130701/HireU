from typing import List, Any

from fastapi import APIRouter, HTTPException
from dbcon.database import candidate_questions, employer_role_registration_answers, candidate_answers
from model.models import CandidateAnswers
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../LLM_Server')))
from ollama_llm_server import contact_llm


candidate_answers_router = APIRouter()


@candidate_answers_router.post("/initiate_conversation/{employer_id}/{role_id}")
async def initiate_conversation(role_id:str, employer_id: str):
    try:
        formatted_text = await generate_prompt(role_id, employer_id)
        prompt_for_llm = [
            {
                "role": "system",
                "content": formatted_text
            },
            {
                "role": "user",
                "content": "Hello"
            }
        ]
        response = await contact_llm(prompt_for_llm)
        response[-1]["index"] = 0
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@candidate_answers_router.post("/continue_conversation/{employer_id}/{role_id}")
async def continue_conversation(employer_id: str, role_id:str, body: List[Any]):
    try:
        prevIndex = body[-2]["index"]
        # formatted_text = await generate_prompt(role_id, employer_id)
        # prompt_for_llm = [
        #     {
        #         "role": "system",
        #         "content": formatted_text
        #     },
        #     {
        #         "role": "user",
        #         "content": "Hello"
        #     }
        # ]
        # modified_req = prompt_for_llm + body
        response = await contact_llm(body)
        response[-1]["index"] = max(prevIndex, response[-1]["index"])
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@candidate_answers_router.post("/end_conversation")
async def end_conversation(candidate_answer: CandidateAnswers):
    candidate_answers.insert_one(candidate_answer.dict())
    return {"res": "Stored Responses Successfully"}


async def generate_prompt(role_id, employer_id):
    candidate_questions_final = await candidate_questions.find_one()
    if not candidate_questions_final:
        raise HTTPException(status_code=404, detail="Candidate ID not found")

    # Fetch employer's answers
    employer_answers = await employer_role_registration_answers.find_one({"employer_id": employer_id, "role_id": role_id}) or {}

    # Organize answers by question_id, ensuring answer_text is treated as a list
    # Ensure employer_answers["answers"] is a list
    answers_list = employer_answers.get("answers", [])
    if not isinstance(answers_list, list):
        raise HTTPException(status_code=500, detail="Invalid format: 'answers' should be a list of dictionaries.")

    # Organize answers by question_id, ensuring answer_text is treated as a list
    # answers_dict = {
    #     str(answer.get("question_id", "")): answer["answer_text"]
    #     if isinstance(answer["answer_text"], list) else [answer["answer_text"]]
    #     for answer in answers_list if isinstance(answer, dict)  # Ensure each item is a dictionary
    # }

    # Define indices where answers should be appended
    indices_with_answers = {1, 2, 3, 5, 6, 7, 8, 9}

    # Construct formatted string
    formatted_text = (
        "1. You are a last round recruiter called HireU. You will be interacting with a candidate for the following list of questions:\n\n"
        "The following are the questions you will ask the candidate:\n\n"
        "Candidate Questions:\n\n"
    )
    index = 0
    for idx, question in enumerate(candidate_questions_final.get("questions", []), start=0):

        # Append answer only if index is in the predefined set
        if idx in indices_with_answers:
            temp_txt = f"{idx + 1}. {question} "
            temp_txt += "(" + answers_list[idx] + ")\n\n"
            index += 1
            formatted_text += temp_txt
        else:
            formatted_text += f"{idx + 1}. {question}\n"

    follow_up_instructions = (
        "\n Please ask the main questions as is and detail in () is not part of the question. Please use the questions in the same format. Only use the details\n"
        "in () to ask follow-up questions. DO NOT MENTION EMPLOYER ANSWER IN ANY FORM IN YOUR QUESTIONS.\n\n"
        "Limit it to a maximum of 2 follow-up questions per main question. Do not give your review about their answer. JUST GATHER INFORMATION.\n"
        "Do not move to the next question until the follow-up questions are answered.\n"
        "Do not ask follow-ups for questions 11 to 19. If a question can be answered by yes or no, move to the next main question after getting the response.\n"
        "Be professional in your chat.\n"
    )
    formatted_text += follow_up_instructions

    return formatted_text
