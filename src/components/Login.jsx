// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import API from '../api/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4">Login</Typography>
      <TextField 
        label="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        sx={{ mt: 2, width: '300px' }} 
      />
      <TextField 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        sx={{ mt: 2, width: '300px' }} 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin} 
        sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
