import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';
import { useState } from 'react';
import Chat from 'components/Chat/Chat';

// ================================|| REGISTER ||================================ //

const RegistrationForm = (props) => {
  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Sign up</Typography>
          <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Already have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthRegister {...props} />
      </Grid>
    </>
  );
};

const businessQuestions = [
  'What is your business’s primary industry or sector?',
  'How many full-time employees does your company currently have?',
  "What was your company's total annual revenue last fiscal year?",
  'Is your business at least 51% owned by minorities, women, veterans, or individuals with disabilities?',
  'Does your business operate in a historically underutilized business zone (HUBZone)?',
  'Do you hire individuals from disadvantaged groups (e.g., veterans, ex-felons, long-term unemployed, people with disabilities)?',
  'Is your business engaged in research and development (R&D) activities?',
  'Are you developing new products, processes, or technologies?',
  'Is your business located in a designated Opportunity Zone?',
  'Have you previously applied for or received any grants or tax credits?',
  'Is your business registered and in good standing in Massachusetts?',
  'Are you planning to hire Massachusetts residents for positions of at least 30 hours per week, with salaries between minimum wage and $85,000 per year?',
  'Is your company e-verified?'
];

export default function Register() {
  const [step, setStep] = useState(1);
  const handleQuestionnaireSubmit = () => {
    localStorage.setItem('isAuthenticated', true);
    navigate('/home');
  };
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        {step === 1 && <RegistrationForm setStep={setStep} />}
        {step === 2 && (
          <div style={{ height: '620px', width: '600px' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mt: '12px', mb: '10px' }}>
              Grant Eligibility Check
            </Typography>
            <Chat darkMode={false} questionsList={businessQuestions} handleQuestionnaireSubmit={handleQuestionnaireSubmit} />
          </div>
        )}
      </Grid>
    </AuthWrapper>
  );
}
