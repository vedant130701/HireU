# 🚀 HireU: AI-Powered Candidate Recruitment & Grant Eligibility System

## 📌 Problem Statement
Hiring the right candidate is an already expensive task in terms of both time and money, and when it comes to small businesses, especially those in their early stages looking to hire their first few employees, their lack of domain knowledge regarding the nuances of hiring can work against them.
They may be unaware of the legal process to follow to hire candidates of different backgrounds, the exact process and required information to ask them after the technical round, as well as grants they may be eligible for both by virtue of their own work as well as the nature of the candidate they consider hiring.
Our solution helps them alleviate these issues by streamlining the hiring process and adding value.


## 🎯 Solution Overview
Our solution adds value by:
1. Demistifying Recruitment: Providing guidance around the industry standard process followed to hire and add the right candidate to their team. Also clarifies processes like being e-verified or hiring candidates that need sponsorship, which may be processes that are foreign to them.
2. Decoding the law: Providing information around the legal implications of hiring a particular candidate.
3. Delivering Dollars: Helping them learn about grants they may be eligible for due to the virtue of their own work as well as the nature of the candidate they are hiring. Also, recruitment is an expensive process, and paying an employee to complete this task is more expensive that using our tool.
Our AI-powered platform:
1. Collects employer company information, expectations from candidates and candidate responses.
2. Uses LLM (Ollama) to generate follow-up questions to better understand the match and evaluate the candidate fit.
3. Evaluates the candidate's fit based on the employer-defined requirements.
4. Identifies applicable federal and state grants for hiring the candidate.
5. Provides a structured report summarizing candidate suitability and grant eligibility.
6. Sends a hiring email to the candidate if approved by the employer

## 📂 Project Structure
```
📦 Project Root
├── 📂 backend
│   ├── 📂 dbcon          # Database connection logic
│   ├── 📂 model          # Data models for storing employee & candidate data
│   ├── 📂 routes         # API endpoints for processing candidate and employee responses
│   │   ├── Store Employee Q&A
│   │   ├── Store Candidate Q&A
│   │   ├── Generate Candidate Report
│   │   ├── Combine Employee & Candidate Data for Context
├── 📂 frontend
│   ├── React.js-based UI for input, visualization, and interaction
├── 📂 LLM_server
│   ├── ollama_server.py  # LLM integration for prompt engineering & report generation
```

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Python Fast API
- **Database:** MongoDB
- **LLM Integration:** Ollama (for AI-powered question generation & analysis)

## 🚀 Features
✅ Ask industry-standard questions to complete the final segment of the hiring process without any human intervention.
✅ Collect and store employer expectations and candidate responses.
✅ Use LLM to generate follow-up questions dynamically.
✅ Use LLM to Compare candidate answers against employee-defined expectations.
✅ Generate a report on candidate suitability.
✅ Identify applicable federal and state grants and hiring incentives.
✅ Intuitive and user-friendly interface for HR and hiring managers.

## 🔧 Setup & Installation
### Backend Setup
1. Download and install the Ollama server. Download the llama3.1:8b model.
2. Run the model using ```bash
ollama run llama3.1:8b```
3. In another terminal, we shall setup the Python requirements.
```bash 
cd LLM_Server
pip install -r requirements.txt```

2. In one terminal, navigate to the backend directory:
   ```sh
   cd ../backend
   python3 main.py
   ```
2. In another terminal, we will run the frontend. First  we shall install dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
2. Install dependencies like node.js:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## 🏆 Hackathon Submission Details
- **Team Name:** HireU
- **Project Category:** Slytherin track - Small business aid


## 🤝 Contributors
- Sarthak Shastri 
- Vedant Rishi Das
- Akshay Chavan
- Gaurav Tejwani
- Ananya Asthana

---
**Note:** This project was built for the CivicHack 2025 hackathon

