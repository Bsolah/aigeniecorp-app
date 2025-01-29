// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
      e.preventDefault();
      dispatch(login({ email, password }));
  };

  const handleClick = () => {
    console.log('clicked before going to register');
    navigate("/register") ;
  }

  return (
    <Box   className='form-container' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
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
        sx={{ mt: 2, width: '300px' }} >
        Login
      </Button>
      <div onClick={handleClick} style={{textDecoration: 'underline', color: '#d32343', padding: 10, cursor: 'pointer', fontSize: 12}}>Don't have an account? Register here</div>
      {error && (
        <p style={{ color: 'red' }}> 
          {error.message || 'Failed to login'}
          <button onClick={() => dispatch(resetError())}>Dismiss</button>
        </p>
      )}
    </Box>
  );
}

export default Login;
