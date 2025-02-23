import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Box } from '@mui/material';
import { Button } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import Report from 'pages/Report/Report';
import { set } from 'lodash';
const candidates = [
  { id: 1, name: 'Akshay Chavan', email: 'akshay.chavan@example.com', status: 'Shortlisted', jobId: 'J109' },
  { id: 2, name: 'Ananya Asthana', email: 'ananya.asthana@example.com', status: 'Shortlisted', jobId: 'J102' },
  { id: 3, name: 'Sarthak Shastri', email: 'sarthak.shastri@example.com', status: 'Offer Extended', jobId: 'J103' },
  { id: 4, name: 'Vedant Rishi Das', email: 'vedant.d@example.com', status: 'Rejected', jobId: 'J104' },
  { id: 5, name: 'Michael Scott', email: 'michael.scott@example.com', status: 'Shortlisted', jobId: 'J105' },
  { id: 6, name: 'Pam Beesly', email: 'pam.beesly@example.com', status: 'Interview Scheduled', jobId: 'J106' },
  { id: 7, name: 'Jim Halpert', email: 'jim.halpert@example.com', status: 'Offer Extended', jobId: 'J107' },
  { id: 8, name: 'Dwight Schrute', email: 'dwight.schrute@example.com', status: 'Rejected', jobId: 'J108' },
  { id: 9, name: 'John Doe', email: 'john.doe@example.com', status: 'Interview Scheduled', jobId: 'J101' },
  { id: 10, name: 'Angela Martin', email: 'angela.martin@example.com', status: 'Interview Scheduled', jobId: 'J110' },
  { id: 11, name: 'Johnny Bravo', email: 'john.b@example.com', status: 'Interview Scheduled', jobId: 'J101' },
  { id: 12, name: 'Angelina Smith', email: 'angelina.smith@example.com', status: 'Interview Scheduled', jobId: 'J110' }
];
const getStatusColor = (status) => {
  switch (status) {
    case 'Interview Scheduled':
      return 'primary';
    case 'Shortlisted':
      return 'warning';
    case 'Offer Extended':
      return 'success';
    case 'Rejected':
      return 'error';
    default:
      return 'default';
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [view, setView] = useState('home');

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') == null || localStorage.getItem('isAuthenticated') != 'true') {
      navigate('/login', { replace: true });
    }
  }, []);

  const handleViewReport = (candidate) => {
    setSelectedCandidate(candidate);
    setView('report');
  };

  return (
    <Box>
      {view === 'home' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Candidate Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Job ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>
                    <Chip label={candidate.status} color={getStatusColor(candidate.status)} variant="contained" />
                  </TableCell>
                  <TableCell>{candidate.jobId}</TableCell>
                  <TableCell>
                    <Button shape="none" icon={<EyeOutlined />} onClick={() => handleViewReport(candidate)} />
                    {/* <Button variant="contained" color="primary" onClick={() => handleViewReport(candidate)}>
                      View Report
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Report
          name={selectedCandidate.name}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
          setView={setView}
        />
      )}
    </Box>
  );
};

export default Home;
