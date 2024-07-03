import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { METHOD } from '../././../models/apiSchemas';
import useAPI from '../../hook/useAPI';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [data, error, isLoading, apiCall] = useAPI();

  const onSubmit = async (formData) => {
    try {
      await apiCall(METHOD.AUTH_REGISTER, formData); 
      toast.success('Registration successful!');
      reset(); 
      navigate('/LoginForm');
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast.error('Registration failed');
    }
  };

  return (
    <div>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div>
          <label></label>
          <input placeholder='First Name*' {...register('name.first', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.name?.first?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>First Name is required</span>}
          {errors.name?.first?.type === 'minLength' && <span style={{ color: 'red' }}>First Name must be at least 2 characters</span>}
          {errors.name?.first?.type === 'maxLength' && <span style={{ color: 'red' }}>First Name cannot exceed 256 characters</span>}
        </div>

        {/* Middle Name */}
        <div>
          <label></label>
          <input placeholder='Middle Name' {...register('name.middle', { minLength: 2, maxLength: 256 })} />
          {errors.name?.middle?.type === 'minLength' && <span style={{ color: 'red' }}>Middle Name must be at least 2 characters</span>}
          {errors.name?.middle?.type === 'maxLength' && <span style={{ color: 'red' }}>Middle Name cannot exceed 256 characters</span>}
        </div>

        {/* Last Name */}
        <div>
          <label></label>
          <input placeholder='Last Name*' {...register('name.last', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.name?.last?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Last Name is required</span>}
          {errors.name?.last?.type === 'minLength' && <span style={{ color: 'red' }}>Last Name must be at least 2 characters</span>}
          {errors.name?.last?.type === 'maxLength' && <span style={{ color: 'red' }}>Last Name cannot exceed 256 characters</span>}
        </div>

        {/* Phone */}
        <div>
          <label></label>
          <input placeholder='Phone*' {...register('phone', { required: true, minLength: 10, maxLength: 10 })} />
          {errors.phone?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Phone number is required</span>}
          {errors.phone?.type === 'minLength' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Phone number must be exactly 10 digits</span>}
          {errors.phone?.type === 'maxLength' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Phone number must be exactly 10 digits</span>}
        </div>

        {/* Email */}
        <div>
          <label></label>
          <input placeholder='Email*' type="email" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          {errors.email?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Email is required</span>}
          {errors.email?.type === 'pattern' && <span style={{ color: 'red' }}>Please enter a valid email address</span>}
        </div>

        {/* Password */}
        <div>
          <label></label>
          <input placeholder='Password*' type="password" {...register('password', { required: true, minLength: 8 })} />
          {errors.password?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Password is required</span>}
          {errors.password?.type === 'minLength' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Password must be at least 8 characters</span>}
        </div>

        {/* Image URL */}
        <div>
          <label></label>
          <input placeholder='Image URL' {...register('image.url', { minLength: 14 })} />
          {errors.image?.url?.type === 'minLength' && <span style={{ color: 'red' }}>Image URL must be at least 14 characters</span>}
        </div>

        {/* Image Alt */}
        <div>
          <label></label>
          <input placeholder='Image Alt' {...register('image.alt', { minLength: 2, maxLength: 256 })} />
          {errors.image?.alt?.type === 'minLength' && <span style={{ color: 'red' }}>Image Alt must be at least 2 characters</span>}
          {errors.image?.alt?.type === 'maxLength' && <span style={{ color: 'red' }}>Image Alt cannot exceed 256 characters</span>}
        </div>

        {/* Address */}
        <div>
          <label></label>
          <input placeholder='State' {...register('address.state', { minLength: 2, maxLength: 256 })} />
          {errors.address?.state?.type === 'minLength' && <span style={{ color: 'red' }}>State must be at least 2 characters</span>}
          {errors.address?.state?.type === 'maxLength' && <span style={{ color: 'red' }}>State cannot exceed 256 characters</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='Country*' {...register('address.country', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.country?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Country is required</span>}
          {errors.address?.country?.type === 'minLength' && <span style={{ color: 'red' }}>Country must be at least 2 characters</span>}
          {errors.address?.country?.type === 'maxLength' && <span style={{ color: 'red' }}>Country cannot exceed 256 characters</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='City*' {...register('address.city', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.city?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>City is required</span>}
          {errors.address?.city?.type === 'minLength' && <span style={{ color: 'red' }}>City must be at least 2 characters</span>}
          {errors.address?.city?.type === 'maxLength' && <span style={{ color: 'red' }}>City cannot exceed 256 characters</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='Street*' {...register('address.street', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.street?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Street is required</span>}
          {errors.address?.street?.type === 'minLength' && <span style={{ color: 'red' }}>Street must be at least 2 characters</span>}
          {errors.address?.street?.type === 'maxLength' && <span style={{ color: 'red' }}>Street cannot exceed 256 characters</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='House Number*' {...register('address.houseNumber', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.houseNumber?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>House Number is required</span>}
          {errors.address?.houseNumber?.type === 'minLength' && <span style={{ color: 'red' }}>House Number must be at least 2 characters</span>}
          {errors.address?.houseNumber?.type === 'maxLength' && <span style={{ color: 'red' }}>House Number cannot exceed 256 characters</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='ZIP' {...register('address.zip', { minLength: 2, maxLength: 256 })} />
          {errors.address?.zip?.type === 'minLength' && <span style={{ color: 'red' }}>ZIP must be at least 2 characters</span>}
          {errors.address?.zip?.type === 'maxLength' && <span style={{ color: 'red' }}>ZIP cannot exceed 256 characters</span>}
        </div>

        {/* Checkbox */}
        <div>
          <label>
            <input type="checkbox" {...register('isBusiness', { required: false })} />
            Signup as a business
          </label>
          <br />
          {errors.terms?.type === '!required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Please accept the terms and conditions</span>}
        </div>

        {/* Submit and other buttons */}
        <div>
          <button className="submitBtn" type="submit">SUBMIT</button>
          <button className="cancelBtn" type="button" onClick={() => navigate('/')}>CANCEL</button>
          <button className="resetBtn" type="reset" onClick={() => reset()}>RESET</button>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Display error message */}
    </div>
  );
};

export default RegisterForm;
