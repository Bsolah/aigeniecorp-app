// src/components/UploadDocument.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import API from '../api/api';

function UploadDocument() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('private', isPrivate);

    try {
      await API.post('/documents/upload', formData);
      alert('Document uploaded successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Upload Document</Typography>
      <TextField 
        label="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        sx={{ mt: 2, width: '400px' }} 
      />
      <Button 
        variant="contained" 
        component="label" 
        sx={{ mt: 2 }}>
        Choose File
        <input 
          type="file" 
          hidden 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </Button>
      <FormControlLabel 
        control={<Switch checked={!isPrivate} onChange={() => setIsPrivate(!isPrivate)} />} 
        label="Shared" 
        sx={{ mt: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUpload} 
        sx={{ mt: 2 }}>
        Upload
      </Button>
    </Box>
  );
}

export default UploadDocument;