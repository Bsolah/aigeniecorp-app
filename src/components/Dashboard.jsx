// src/components/Dashboard.js
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/upload')}
        sx={{ mt: 2, mr: 2 }}
      >
        Upload Document
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate('/search')}
        sx={{ mt: 2, mr: 2 }}
      >
        AI-Powered Search
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/invite')}
        sx={{ mt: 2 }}
      >
        Invite Team Member
      </Button>
    </Box>
  );
}

export default Dashboard;
