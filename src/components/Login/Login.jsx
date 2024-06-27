import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { METHOD } from '../././../models/apiSchemas';
import useAPI from '../../hook/useAPI';
import './Login.css';

const Login = ({ handleLogin }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [data, error, isLoading, apiCall] = useAPI();

  const handleLoginSubmit = async (formData) => {
    try {
      await apiCall(METHOD.AUTH_LOGIN, formData);
      console.log('Login successful!', data);
      // reset();
      handleLogin(data);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <input
          type="email"
          placeholder="Enter email"
          {...register('email', { required: true })}
          className="login-input"
        />
        {errors.email?.type === 'required' && <p className="error-message">Email is required</p>}

        <input
          type="password"
          placeholder="Enter password"
          {...register('password', { required: true })}
          className="login-input"
        />
        {errors.password?.type === 'required' && <p className="error-message">Password is required</p>}

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button className="cancelBtn" type="button" onClick={() => navigate('/')}>CANCEL</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
