import { Alert } from '@mui/material';
import Chat from 'components/Chat/Chat';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import sendEmail from 'utils/emailSender';
import { get, post } from '../../services/services';
import { set } from 'lodash';

const questionsList = [
  "What's the name of the candidate?",
  "What's the email id of the candidate?",
  'What salary range are you offering for this role?',
  'Do you offer relocation assistance for candidates willing to move?',
  'What benefits do you provide (e.g., health insurance, 401(k), stock options)?',
  'Do you have a preference for work location (on-site, remote, hybrid)?',
  'Are you open to hiring candidates who require visa sponsorship (e.g., H-1B, O-1) now or in the future, at extra hiring costs?',
  'What are the expected work timings for this role?',
  'What is your preferred start date?',
  'What is the leave structure provided for this role?',
  'What kind of insurance coverage does the employer provide for this role?',
  'Do you offer commuter benefits or travel reimbursement for work?',
  'Are there any special requirements for this role (e.g., certifications, security clearances, physical requirements)?'
];

const employer_id = "trial123@gmail.com";
const role_id = "Senior Software Developer";

const Offer = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [answersList, setAnswersList] = useState([]);
  const [jobOfferQuestions, setJobOfferQuestions] = useState(questionsList);

  useEffect(() => {
    getQuestionsList();
  }
  , []);

  const getQuestionsList = () => {
    get(`/employer_role_registration_questions/${employer_id}/${role_id}`).then((response) => {
      console.log(response);
      setJobOfferQuestions(response.questions);
      localStorage.setItem('role_id', response.role_id);
    });
  }

  const handleQuestionnaireSubmit = () => {
      console.log("answerList", answersList);
    // setTimeout(() => {
      
    // }, 5000);
    setAlertMessage(
      'Thank you for answering all the questions! We will review your responses and be in touch soon to let you know about next steps.'
    );
    const email = localStorage.getItem('email');
    sendEmail(
      email,
      'Job Offer Questionnaire',
      `Thank you for answering all the questions! We will review your responses and be in touch soon to let you know about the next steps.
    Fill out the candidate questionnaire using this link: http://localhost:3000/candidate?email=${email}`
    );
    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };
  return (
    <div style={{ height: 'calc(100vh - 99px)' }}>
      {alertMessage.length > 0 && <Alert severity="success">{alertMessage}</Alert>}
      <Chat questionsList={jobOfferQuestions} handleQuestionnaireSubmit={handleQuestionnaireSubmit} setAnswersList={setAnswersList} />
    </div>
  );
};
export default Offer;
