import { Alert, Typography } from '@mui/material';
import { height } from '@mui/system';
import { message } from 'antd';
import Chat from 'components/Chat/Chat';
import { useState } from 'react';
import sendEmail from 'utils/emailSender';

const candidateQuestionsList = [
  "Hello! Welcome to HireU, I'll be conducting this interview today. Let's get started!\n\nCan you please tell me, what is your expected salary range?",
  "Thank you for sharing that with me.\n\nThat's a bit higher than our initial budget. Can you tell me, are there any specific factors in the market or industry that lead you to expect this salary range?\n\nAnd if I could also ask, what would be your ideal salary range considering the role and responsibilities we've discussed?",
  "That's helpful context.\n\nWe appreciate your flexibility on the salary range. Now, regarding relocation: are you willing to relocate if necessary?",
  'Relocation can sometimes be a challenge.\n\nIf you were to relocate, would you prefer to stay within the same region or are you open to moving to a different part of the country?\n\nAnd, just to clarify, do you have any specific concerns or requirements regarding relocation assistance or support?',
  "Staying within the country can make the transition smoother.\n\nLet's talk about benefits. Are you satisfied with the health insurance benefits offered by our company?",
  "We offer comprehensive health insurance coverage, as well as a 401k plan for retirement savings.\n\nIf we were to expand on that, what specific features or components would be most important to you in a health insurance package?\n\nAnd do you have any questions about how our company's health insurance benefits compare to your current coverage?",
  "We can definitely explore adding dental coverage to the plan.\n\nNow, let's talk about work environment: are you comfortable with a hybrid model where you'd spend 3 days a week in the office and the rest of your time working remotely?",
  'A hybrid schedule can be beneficial for productivity and work-life balance.\n\nIf you were to work from home on certain days, would you need any specific equipment or software setup to stay connected with the team?\n\nAnd do you have a preferred time of day when working from home that allows you to be most productive?',
  "Having an extra monitor can definitely enhance your productivity.\n\nNow, let's move on to another topic: are you legally authorized to work in the United States? If not, please explain your work authorization.",
  'As a US citizen, that simplifies things.\n\nAre there any specific concerns or restrictions related to your work authorization that we should be aware of?',
  "Let's move on to another topic: are you comfortable with the standard working hours of 9am to 5pm?",
  "That's great, a standard schedule can be beneficial for routine and productivity.\n\nNow, let's talk about your availability. What is your earliest available start date for this role?",
  "You're looking to start a bit later in the year.\n\nIf May 5th isn't feasible, would you be willing to start on a slightly earlier date, such as April 15th or April 1st?\n\nAnd if your start date were to change, would that affect any other plans or commitments you have?",
  "Having some flexibility with the start date is helpful.\n\nSo, we're aiming for a start date sometime in the first week of May 2025. Now, let's talk about leave: are you okay with the unlimited PTO structure that our company offers?",
  "Unlimited PTO can be very flexible and accommodating for employees.\n\nDo you think you'll need to use any of your PTO days during your first month onboarding and training?\n\nAnd are there any specific holidays or vacation times that you'd like to plan around when taking PTO?",
  "You're keeping things open-ended for now.\n\nLet's move on to commuter benefits: are you satisfied with the unlimited MBTA pass provided by our company?",
  "Having a convenient and cost-effective way to commute can make a big difference.\n\nDo you have any specific route or station in mind that you'd like to use for your daily commute?\n\nAnd are there any other transportation options, such as biking or carpooling, that you might consider using?",
  "You're keeping things simple.\n\nLet's move on to the next question: Do you have any reservations with the special requirements listed for this position?",
  "You're comfortable with the job requirements as outlined.\n\nHave you served in the U.S. military?",
  "Let's move on to the next question: Have you been unemployed for 27 weeks or more?",
  "It can be challenging to adjust to a new job search after a prolonged period of unemployment.\n\nCan you tell me approximately how long you were unemployed, and what you've been doing during that time?\n\nAnd are there any specific reasons why your employment was interrupted, such as caregiving responsibilities or education/training?",
  "It sounds like you took some time to recharge and explore new experiences.\n\nLet's move on to the next question: Have you been convicted of a felony?",
  "Let's move on to the next question: Are you a recipient of Supplemental Nutrition Assistance Program (SNAP) benefits?",
  "It looks like we've repeated that question.\n\nLet's move on to the next one instead: Are you a recipient of Supplemental Security Income (SSI)?",
  "Let's move on to the next question: Are you a resident of Massachusetts?",
  "You have local knowledge.\n\nLet's move on to the last question before we conclude: Are you seeking full-time employment (30 hours or more per week)?",
  "That confirms your availability for a full-time position.\n\nWe've reached the end of our questions, and I want to thank you for taking the time to answer them. Is there anything else you'd like to add or discuss before we conclude?",
  "It was a pleasure speaking with you. We'll review your answers and be in touch soon to let you know about next steps. Have a great day!"
];

// const candidateQuestionsList = ['a'];

const CandidateQuestionnaire = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const handleQuestionnaireSubmit = () => {
    setAlertMessage(
      'Thank you for answering all the questions! We will review your responses and be in touch soon to let you know about next steps.'
    );
    sendEmail(
      'sarthak.shastri@gmail.com',
      'Candidate Questionnaire',
      'Thank you for answering all the questions! We will review your responses and be in touch soon to let you know about next'
    );
  };
  return (
    <div style={{ height: 'calc(100vh - 50px)', backgroundColor: 'white' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mt: '10px', mb: '10px' }}>
        Candidate Questionnaire
      </Typography>
      {alertMessage.length > 0 && (
        <Alert sx={{ width: 'auto', fontSize: '14px', textAlign: 'center' }} severity="success">
          {alertMessage}
        </Alert>
      )}
      <Chat questionsList={candidateQuestionsList} handleQuestionnaireSubmit={handleQuestionnaireSubmit} />
    </div>
  );
};

export default CandidateQuestionnaire;
