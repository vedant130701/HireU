from ollama import chat
from ollama import ChatResponse
import json
from fuzzywuzzy import fuzz, process
import asyncio
from ollama import AsyncClient

questions = [
    "1. What is your expected salary range?",  
    "2. Are you willing to relocate if necessary? ", 
    "3. Are you satisfied with the health insurance benefits offered by the employer?", 
    "4. What is your preferred work environment (on-site, remote, hybrid)? ", 
    "5. Are you legally authorized to work in the United States? If not, explain your work authorization.",
    "6. Are you comfortable with the working hours?",
    "7. What is your earliest available start date? ", 
    "8. Are you okay with the leave structure provided by the employer?",
    "9. Are you satisfied with the commuter benefits provided by this employer?", 
    "10. Do you have any reservations with the special requirements listed for the position?",
    "11. Have you served in the U.S. military?", 
    "12. Have you been unemployed for 27 weeks or more?",  
    "13. Have you been convicted of a felony?",
    "14. Are you a recipient of Supplemental Nutrition Assistance Program (SNAP) benefits?",  
    "15. Are you a recipient of Supplemental Security Income (SSI)?",  
    "16. Are you a resident of a designated community or rural renewal county?",  
    "17. Have you completed any vocational rehabilitation programs?",  
    "18. Are you a resident of Massachusetts?",  
    "19. Are you seeking full-time employment (30 hours or more per week)?"
]




def find_match(question_list, response):
    best_match = process.extractOne(response, question_list)
    
    if best_match and best_match[1] > 50: 
        return questions.index(best_match[0])
    else:
        return -1

async def contact_llama(user_messages, model_version="llama3.1:8b"):
    response: ChatResponse = await AsyncClient().chat(model_version, messages=user_messages, stream=False)
    responseMessage = response['message']['content']
    print("Chatbot: ", responseMessage)
    ques_index = find_match(questions, responseMessage)
    user_messages.append({"role": "assistant", "content": responseMessage, "index": ques_index})
    return user_messages

async def contact_llm(user_messages, llm_api_model_type='ollama', model_version="llama3.1:8b"):
    if(llm_api_model_type == 'ollama'):
        return await contact_llama(user_messages, model_version)
    else:
        pass



async def main():
    system_role ={
    "role": "system",
    "content": '''You are a last round recruiter called HireU. You will be interacting with a candidate for the following list of questions: 

    The following are the questions you will ask the candidate:
    
    Candidate Questions:
    1. What is your expected salary range?  
    2. Are you willing to relocate if necessary? (Employer answer is Yes relocation is required but no funding is provided) 
    3. Are you satisfied with the health insurance benefits offered by the employer? (Employer answer is yes health insurance and 401k)
    4. What is your preferred work environment (on-site, remote, hybrid)?  (Employer answer is yes hybrid 3 days a week in office)
    5. Are you legally authorized to work in the United States? If not, explain your work authorization. 
    6. Are you comfortable with the working hours? (Employer answer is 9-5 standard)
    7. What is your earliest available start date?  (Employer answer is 5/1/2025)
    8. Are you okay with the leave structure provided by the employer? (Employer answer is Unlimited PTO)
    9. Are you satisfied with the commuter benefits provided by this employer? (Employer answer is yes mbta unlimited pass provided)
    10. Do you have any reservations with the special requirements listed for the position? (Employer answer is None)
    11. Have you served in the U.S. military? 
    12. Have you been unemployed for 27 weeks or more? 
    13. Have you been convicted of a felony?  
    14. Are you a recipient of Supplemental Nutrition Assistance Program (SNAP) benefits? 
    15. Are you a recipient of Supplemental Security Income (SSI)? 
    16. Are you a resident of a designated community or rural renewal county?  
    17. Have you completed any vocational rehabilitation programs? 
    18. Are you a resident of Massachusetts? 
    19. Are you seeking full-time employment (30 hours or more per week)?
   
    Please ask the main questions as is and detail in () is not part of the question. Please use the questions in the same format. Only use the details
    in () to ask follow up questions. DO NOT MENTION EMPLOYER ANSWER IN ANY FORM IN YOUR QUESTIONS.
     
    Limit it to maximum 2 follow up questions per main question. Do not give your review about their answer. JUST GATHER INFORMATION.
    Do not move to the next question until the follow-up questions are answered.
    Do not ask follow up for questions 11 to 19. If a question can be answered by yes or no, move to the next main question after getting the response.
    Be professional in your chat.
    '''
    
}
    # system_role = getSystemRole(mainQ)
    user_messages = [system_role]
    print("Type 'Hello' to start the conversation. Type 'exit' to end the conversation.")
    while True:
        user_input = input("You: ")
        if user_input == "exit":
            file_path = 'chatHistory.json'
            try:
                with open(file_path, 'w') as f:
                    json.dump(user_messages, f, indent=4)
            except Exception as e:
                    print(f"Error saving data: {e}")
            else:
                    print("Data saved successfully.")
            break
        user_json = {"role": "user", "content": user_input}
        user_messages.append(user_json) 
        user_messages = await contact_llm(user_messages)


if __name__ == "__main__":
    asyncio.run(main())