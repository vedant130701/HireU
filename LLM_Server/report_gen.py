from ollama import chat
from ollama import ChatResponse
import json
import asyncio
from ollama import AsyncClient

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


def process_conversation(file_name):
    # Load the JSON data from the file
    with open(file_name) as f:
        data = json.load(f)

    final_result = ''
    # Process each turn in the conversation
    for i, message in enumerate(data):
        if message['role'] == 'assistant':
            final_result += f'Q: {message["content"].replace("\n", "").replace("\t", "")} '
        elif message['role'] == 'user':
            final_result += f'A: {message["content"].replace("\n", "").replace("\t", "")}\n'
            

    return final_result

async def contact_llama(user_messages, model_version="llama3.1:8b"):
    response: ChatResponse =  await AsyncClient().chat(model_version, messages=user_messages, stream=False)
    responseMessage = response['message']['content']
    return responseMessage

async def make_report(employer_questions, user_conversation):
    System_role = {
        "role": "system",
        "content":
        '''Your job is to analyse the responses of the candidate and provide a report to thea small business/startup employer.
        The following is the employer's questionnaire response: ''' + employer_questions + '''
        The following is the conversation between the candidate and a recruiter: ''' + user_conversation + '''
        Q stands for the question asked and A is the answer provided.

        Analyse both of the respones and generate a report for the employer to decide if the candidate will be
        a good fit for the organization and the role. Also based on the candidate's responses, provide a list of
        possible federal grants or benefits that the candidate and employer may be eligible for.

        The report should be in the following format:
        Report Fields:
        Compensation:
        Relocation:
        Benefits:
        Sponsorship:
        Work Timings:
        Leave Structure:
        Insurance Coverage:
        Special Requirements:
        Additional Remarks:

        Give your brief analysis for each field based on the candidate's responses and the employer's requirements.
'''
    }

    messages = [System_role]
    userMsg = {"role": "user", "content": "Generate a report"}
    messages.append(userMsg)
    result = await contact_llama(messages)
    return result
    

async def main():
    # Call the function with the input file name
    candidate_chat_hist = process_conversation('chatHistory.json')
    ans = await make_report(Employer_questions, candidate_chat_hist)
    with open('response_message.txt', 'w') as f:
        f.write(ans)
    


if __name__ == '__main__':
    asyncio.run(main())
