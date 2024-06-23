import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAPI, { METHOD } from '../../hook/useAPI';
import './Register.css';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [data, error, isLoading, apiCall] = useAPI();

  const onSubmit = async (formData) => {
    try {
      await apiCall(METHOD.USER_REGISTER, formData);
      reset(); // Reset the form after successful submission
      navigate('/'); // Redirect to home page after registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-form">
      <h2 className="dark">REGISTER</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Name Section */}
        <div>
          <label>First Name*</label>
          <input
            {...register('name.first', {
              required: 'First Name is required',
              minLength: { value: 2, message: 'First Name must be at least 2 characters' },
              maxLength: { value: 256, message: 'First Name cannot exceed 256 characters' }
            })}
          />
          {errors.name?.first && <span className="error-text">{errors.name.first.message}</span>}
        </div>

        <div>
          <label>Middle Name</label>
          <input
            {...register('name.middle', {
              minLength: { value: 2, message: 'Middle Name must be at least 2 characters' },
              maxLength: { value: 256, message: 'Middle Name cannot exceed 256 characters' }
            })}
          />
          {errors.name?.middle && <span className="error-text">{errors.name.middle.message}</span>}
        </div>

        <div>
          <label>Last Name*</label>
          <input
            {...register('name.last', {
              required: 'Last Name is required',
              minLength: { value: 2, message: 'Last Name must be at least 2 characters' },
              maxLength: { value: 256, message: 'Last Name cannot exceed 256 characters' }
            })}
          />
          {errors.name?.last && <span className="error-text">{errors.name.last.message}</span>}
        </div>

        {/* Contact Information */}
        <div>
          <label>Phone*</label>
          <input
            type="text"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^\d+$/, message: 'Phone number must contain only digits' },
              minLength: { value: 9, message: 'Phone number must be at least 9 digits' },
              maxLength: { value: 11, message: 'Phone number must not exceed 11 digits' }
            })}
          />
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}
        </div>

        <div>
          <label>Email*</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div>
          <label>Password*</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 7, message: 'Password must be at least 7 characters' }
            })}
          />
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </div>

        {/* Image Section */}
        <div>
          <label>Image URL</label>
          <input
            {...register('image.url', {
              minLength: { value: 14, message: 'Image URL must be at least 14 characters' }
            })}
          />
          {errors.image?.url && <span className="error-text">{errors.image.url.message}</span>}
        </div>

        <div>
          <label>Image Alt</label>
          <input
            {...register('image.alt', {
              minLength: { value: 2, message: 'Image Alt must be at least 2 characters' },
              maxLength: { value: 256, message: 'Image Alt cannot exceed 256 characters' }
            })}
          />
          {errors.image?.alt && <span className="error-text">{errors.image.alt.message}</span>}
        </div>

        {/* Address Section */}
        <div>
          <label>State</label>
          <input
            {...register('address.state', {
              minLength: { value: 2, message: 'State must be at least 2 characters' },
              maxLength: { value: 256, message: 'State cannot exceed 256 characters' }
            })}
          />
          {errors.address?.state && <span className="error-text">{errors.address.state.message}</span>}
        </div>

        <div>
          <label>Country*</label>
          <input
            {...register('address.country', {
              required: 'Country is required',
              minLength: { value: 2, message: 'Country must be at least 2 characters' },
              maxLength: { value: 256, message: 'Country cannot exceed 256 characters' }
            })}
          />
          {errors.address?.country && <span className="error-text">{errors.address.country.message}</span>}
        </div>

        <div>
          <label>City*</label>
          <input
            {...register('address.city', {
              required: 'City is required',
              minLength: { value: 2, message: 'City must be at least 2 characters' },
              maxLength: { value: 256, message: 'City cannot exceed 256 characters' }
            })}
          />
          {errors.address?.city && <span className="error-text">{errors.address.city.message}</span>}
        </div>

        <div>
          <label>Street*</label>
          <input
            {...register('address.street', {
              required: 'Street is required',
              minLength: { value: 2, message: 'Street must be at least 2 characters' },
              maxLength: { value: 256, message: 'Street cannot exceed 256 characters' }
            })}
          />
          {errors.address?.street && <span className="error-text">{errors.address.street.message}</span>}
        </div>

        <div>
          <label>House Number*</label>
          <input
            type="number"
            {...register('address.houseNumber', {
              required: 'House Number is required',
              minLength: { value: 2, message: 'House Number must be at least 2 characters' },
              maxLength: { value: 256, message: 'House Number cannot exceed 256 characters' }
            })}
          />
          {errors.address?.houseNumber && <span className="error-text">{errors.address.houseNumber.message}</span>}
        </div>

        <div>
          <label>ZIP</label>
          <input
            type="number"
            {...register('address.zip', {
              minLength: { value: 2, message: 'ZIP must be at least 2 characters' },
              maxLength: { value: 256, message: 'ZIP cannot exceed 256 characters' }
            })}
          />
          {errors.address?.zip && <span className="error-text">{errors.address.zip.message}</span>}
        </div>

        {/* Checkbox */}
        <div className="checkboxContainer">
          <input
            type="checkbox"
            {...register('isBusiness', { required: 'Please accept the terms and conditions' })}
          />
          <span className="checkboxText">Signup as a business</span>
          {errors.isBusiness && <span className="error-text">{errors.isBusiness.message}</span>}
        </div>

        {/* Submit and other buttons */}
        <div className="form-actions">
          <button className="submitBtn" type="submit">SUBMIT</button>
          <button className="cancelBtn" type="button" onClick={() => navigate('/')}>CANCEL</button>
          <button className="resetBtn" type="reset" onClick={() => reset()}>RESET</button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterForm;
