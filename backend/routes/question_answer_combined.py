from fastapi import APIRouter, HTTPException
from dbcon.database import candidate_questions, employer_role_registration_answers

employer_role_registration_questions_router = APIRouter()


@employer_role_registration_questions_router.post("/{employer_id}/{candidate_id}")
async def get_formatted_questions_answers(candidate_id: str, employer_id: str):
    try:
        # Fetch employer's questions and generate formatted text
        formatted_text = await generate_prompt(candidate_id, employer_id)

        return {"formatted_text": formatted_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def generate_prompt(candidate_id, employer_id):
    candidate_questions_final = await candidate_questions.find_one({"candidate_id": candidate_id})
    if not candidate_questions_final:
        raise HTTPException(status_code=404, detail="Candidate ID not found")

    # Fetch employer's answers
    employer_answers = await employer_role_registration_answers.find_one({"employer_id": employer_id}) or {}

    # Organize answers by question_id
    answers_dict = {str(answer["question_id"]): answer["answer_text"] for answer in employer_answers.get("answers", [])}

    # Define indices where answers should be appended
    indices_with_answers = {1, 2, 3, 5, 6, 7, 8, 9}

    # Construct formatted string
    formatted_text = (
        "1. You are a last round recruiter called HireU. You will be interacting with a candidate for the following list of questions:\n\n"
        "The following are the questions you will ask the candidate:\n\n"
        "Candidate Questions:\n\n"
    )

    for idx, question in enumerate(candidate_questions_final.get("questions", [])):
        question_id = str(question["_id"])
        question_text = f"{idx}. {question['question_text']}\n"

        # Append answer only if index is in the predefined set
        if idx in indices_with_answers:
            answer_text = answers_dict.get(question_id, "(No answer provided)")
            formatted_text += f"{question_text}{answer_text}\n\n"
        else:
            formatted_text += f"{question_text}\n"

    # Append follow-up instructions
    follow_up_instructions = (
        "Please ask the main questions as is and detail in () is not part of the question. Please use the questions in the same format. Only use the details\n"
        "in () to ask follow-up questions. DO NOT MENTION EMPLOYER ANSWER IN ANY FORM IN YOUR QUESTIONS.\n\n"
        "Limit it to a maximum of 2 follow-up questions per main question. Do not give your review about their answer. JUST GATHER INFORMATION.\n"
        "Do not move to the next question until the follow-up questions are answered.\n"
        "Do not ask follow-ups for questions 11 to 19. If a question can be answered by yes or no, move to the next main question after getting the response.\n"
        "Be professional in your chat.\n"
    )
    formatted_text += follow_up_instructions

    return formatted_text
