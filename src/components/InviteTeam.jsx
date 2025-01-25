// src/components/InviteTeam.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import API from '../api/api';

function InviteTeam() {
  const [email, setEmail] = useState('');
  const [documentId, setDocumentId] = useState('');

  const handleInvite = async () => {
    try {
      await API.post('/documents/invite', { email, documentId });
      alert('Invitation sent successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Invite Team Member</Typography>
      <TextField
        label="Team Member's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 2, width: '400px' }}
      />
      <TextField
        label="Document ID"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        sx={{ mt: 2, width: '400px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleInvite}
        sx={{ mt: 2 }}
      >
        Send Invite
      </Button>
    </Box>
  );
}

export default InviteTeam;
