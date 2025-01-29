// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store, persistStore } from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import PublicRoute from './components/Routes/PublicRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.withCredentials = true;


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore}>
        <Router>
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            } />
             <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
