import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAPI, { METHOD } from '../../hook/useAPI';
import './Login.css';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, apiError, apiIsLoading, apiCall] = useAPI(); // Destructure values from useAPI

  // Function to handle login
  const handleLogin = async (formData) => {
    setIsLoading(true); // Start loading state
    try {
      const response = await apiCall(METHOD.USER_LOGIN, formData); // Call the user login API
      localStorage.setItem('token', response.token); // Store the token in localStorage
      setError(null); // Clear any previous error
      setIsLoading(false); // Stop loading state
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message || 'Login failed'); // Set error state with error message
      setIsLoading(false); // Stop loading state
    }
  };

  // Function to handle form submission
  const onSubmit = (formData) => {
    handleLogin(formData); // Call handleLogin function with form data
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Enter email"
          {...register('email', { required: 'Email is required' })}
          className="login-input"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Enter password"
          {...register('password', { required: 'Password is required' })}
          className="login-input"
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button className="cancelBtn" type="button" onClick={() => navigate('/')}>CANCEL</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {apiError && <p className="error-message">{apiError}</p>}
    </div>
  );
};

export default LoginForm;
