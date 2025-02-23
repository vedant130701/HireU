import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip, Button, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router';

const reportData = {
  Name: 'John Doe',
  Position: 'Software Engineer',
  Compensation:
    "Based on the candidate's response, it appears they are slightly underpaid compared to their expected salary range ($90-110k) and the employer's offered range ($100-120k). A potential adjustment in compensation may be necessary to meet their expectations.",
  Relocation:
    'Relocation is a necessary aspect of this role. However, the candidate has expressed flexibility and willingness to relocate close to the company, which may alleviate concerns about finding suitable candidates in a specific location.',
  Benefits:
    "The candidate's salary expectations ($90-110k) are slightly below the offered range ($100-120k). However, they seem satisfied with the benefits package, including health insurance and unlimited PTO.",
  Sponsorship:
    'The candidate would require H1-B visa sponsorship for future extensions. This should be clarified as a potential additional cost in the job offer, and the candidate should be informed about this requirement upfront.',
  WorkTimings: 'The candidate is comfortable with standard working hours (9am-5pm) and has no prior commitments impacting availability.',
  LeaveStructure:
    'The candidate is comfortable with the unlimited PTO structure but may benefit from a brief explanation of its responsibilities and benefits.',
  InsuranceCoverage:
    'The candidate is satisfied with the employer’s health insurance coverage and does not require transition from another provider.',
  SpecialRequirements:
    'The candidate meets eligibility criteria for several hiring grants, including WOTC and HireNow Program, which can offer financial incentives to the employer.'
};

const Report = ({ name, selectedCandidate, setSelectedCandidate, setView }) => {
  reportData.Name = name;
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', p: 4, backgroundColor: '#f4f6f8', borderRadius: 3 }}>
      <Typography variant="h3" align="center" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
        Candidate Report
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        {Object.entries(reportData).map(([key, value], index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                {key}
              </Typography>
              {key === 'Sponsorship' || key === 'Relocation' || key === 'Benefits' ? (
                <Chip label="Important" color="warning" sx={{ fontWeight: 'bold' }} />
              ) : null}
            </Grid>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {value}
            </Typography>
            {index !== Object.entries(reportData).length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Paper>
      {alertMessage.length > 0 && <Alert severity="success">{alertMessage}</Alert>}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => {
            setAlertMessage('Candidate approved successfully!');
            setTimeout(() => {
              selectedCandidate.status = 'Offer Extended';
              selectedCandidate.updated = true;
              setSelectedCandidate(selectedCandidate);
              setView('home');
              //   navigate('/home');
            }, 2500);
          }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => {
            setAlertMessage('Candidate has been rejected!');
            setTimeout(() => {
              selectedCandidate.status = 'Rejected';
              setSelectedCandidate(selectedCandidate);
              setView('home');
              //   navigate('/home');
            }, 2500);
          }}
        >
          Deny
        </Button>
      </Stack>
    </Box>
  );
};

export default Report;
