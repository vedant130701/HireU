from ollama import chat
from ollama import ChatResponse
import json
import asyncio
import os
from ollama import AsyncClient
import pandas as pd

Employer_questions = '''
Q:What salary range are you offering for this role? A:100-120k
Q:Do you offer relocation assistance for candidates willing to move? A:Yes relocation is required but no funding is provided
Q:What benefits do you provide (e.g., health insurance, 401(k), stock options)? A:yes health insurance and 401k
Q:Do you have a preference for work location (on-site, remote, hybrid)? A:yes hybrid 3 days a week in office
Q:Are you open to hiring candidates who require visa sponsorship (e.g., H-1B, O-1) now or in the future, at extra hiring costs? A:Yes if they have work authorization available for at least 2 years
Q:What are the expected work timings for this role? A:9-5 standard
Q:What is your preferred start date? A:5/1/2025
Q:What is the leave structure provided for this role? A:Unlimited PTO
Q:What kind of insurance coverage does the employer provide for this role? A:Yes
Q:Do you offer commuter benefits or travel reimbursement for work? A:yes mbta unlimited pass provided
Q:Are there any special requirements for this role (e.g., certifications, security clearances, physical requirements)? A:None'''


def get_grants_info():
    current_dir = os.path.dirname(os.path.abspath(__file__))

    grants = pd.read_excel(os.path.join(current_dir, 'candidate_chatbot_questions.xlsx'), engine='openpyxl')
    return grants

def process_conversation(json_data):
    # Load the JSON data from the file

    final_result = ""

    for i, message in enumerate(json_data):
        content = message["content"].replace("\n", "").replace("\t", "")  # Pre-process content

        if message["role"] == "assistant":
            final_result += "Q: " + content + " "
        elif message["role"] == "user":
            final_result += "A: " + content + "\n"

    return final_result


async def contact_llama(user_messages, model_version="llama3.1:8b"):
    response: ChatResponse =  await AsyncClient().chat(model_version, messages=user_messages, stream=False)
    responseMessage = response['message']['content']
    return responseMessage

async def make_report(employer_questions, json_user_conversation):
    user_conversation = process_conversation(json_user_conversation)

    report_fields = [
        "Compensation",
        "Relocation",
        "Benefits",
        "Sponsorship",
        "Work Timings",
        "Leave Structure",
        "Insurance Coverage",
        "Special Requirements",
    ]

    result_fields = []
    
    USER_PROMPT = "The following are the Employer requirements: " + employer_questions + "The following is the candidate responses: " + user_conversation 

    getGrants = get_grants_info().to_string()
    # userMsg = {"role": "user", "content": "Here is information about the grants: " + getGrants + "Use it to generate a report in JSON format."}
    for field in report_fields[:-1]:
        userMsg = {"role": "user", "content": USER_PROMPT + " Based on the information give a feedback to the employer on the topic: '" + field + "' In 50 words."}
        set_role_msg = [userMsg]
        result = await contact_llama(set_role_msg)
        result_fields.append({field: result})
    
    userMsg = {"role": "user", "content": USER_PROMPT + "The following is grant information: " + getGrants +  " Tell me about the grants that the candidate and employer may be eligible for."}
    only_user_msg = [userMsg]
    result = await contact_llama(only_user_msg)
    result_fields.append({"Additional Remarks": result})
    #test
    # with open('response_message3.json', 'w') as f:
    #     json.dump(result_fields, f, indent=4)
    #     print("File created")
    return result_fields
    

async def main():
    # Call the function with the input file name
    with open('chatHistory.json') as f:
        data = json.load(f)
    ans = await make_report(Employer_questions, data)
    with open('response_message2.json', 'w') as f:
        json.dump(ans, f, indent=4)
    


if __name__ == '__main__':
    asyncio.run(main())
