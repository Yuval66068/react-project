import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './cardNew.css';
import { METHOD } from '../././../models/apiSchemas';
import useAPI from '../../hook/useAPI';

const CardNew = ({token}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [data, error, isLoading, apiCall] = useAPI();

  const handleLoginSubmit = async (formData) => {
    
    try {
      await apiCall(METHOD.CARDS_CREATE, formData,{},{"x-auth-token": token});
      // reset(); 
      // navigate('/LoginForm');
    } catch (error) {
      console.error('Submission failed:', error.message);
    }
  };

  return (
    <div>
      <h2>CREATE NEW CARD</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        {/* Title */}
        <div>
          <label>Title</label>
          <input placeholder='Title*' {...register('title', { required: false, minLength: 1, maxLength: 256 })} />
          {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>

        {/* Subtitle */}
        <div>
          <label>Subtitle</label>
          <input placeholder='Subtitle*' {...register('subtitle', { required: false, minLength: 1, maxLength: 256 })} />
          {errors.subtitle && <span style={{ color: 'red' }}>{errors.subtitle.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <input placeholder='Description*' {...register('description', { required: false, minLength: 1, maxLength: 1024 })} />
          {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone</label>
          <input placeholder='Phone*' {...register('phone', { required: false, minLength: 10, maxLength: 10 })} />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input placeholder='Email*' type="email" {...register('email', { required: false, /* pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  */})} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>

        {/* Web */}
        <div>
          <label>Website</label>
          <input placeholder='Website*' {...register('web', { required: false,/*  pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/  */})} />
          {errors.web && <span style={{ color: 'red' }}>{errors.web.message}</span>}
        </div>

        {/* Image URL */}
        <div>
          <label>Image URL</label>
          <input placeholder='Image URL*' {...register('image.url', { required: false, minLength: 14 })} />
          {errors.image?.url && <span style={{ color: 'red' }}>{errors.image?.url.message}</span>}
        </div>

        {/* Image Alt */}
        <div>
          <label>Image Alt</label>
          <input placeholder='Image Alt*' {...register('image.alt', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.image?.alt && <span style={{ color: 'red' }}>{errors.image?.alt.message}</span>}
        </div>

        {/* Address */}
        <div>
          <label>Street</label>
          <input placeholder='Street*' {...register('address.street', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.street && <span style={{ color: 'red' }}>{errors.address?.street.message}</span>}
        </div>

        <div>
          <label>City</label>
          <input placeholder='City*' {...register('address.city', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.city && <span style={{ color: 'red' }}>{errors.address?.city.message}</span>}
        </div>

        <div>
          <label>State</label>
          <input placeholder='State' {...register('address.state', { minLength: 2, maxLength: 256 })} />
          {errors.address?.state && <span style={{ color: 'red' }}>{errors.address?.state.message}</span>}
        </div>

        <div>
          <label>ZIP</label>
          <input placeholder='ZIP' {...register('address.zip', { minLength: 2, maxLength: 256 })} />
          {errors.address?.zip && <span style={{ color: 'red' }}>{errors.address?.zip.message}</span>}
        </div>

        <div>
          <label>Country</label>
          <input placeholder='Country*' {...register('address.country', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.country && <span style={{ color: 'red' }}>{errors.address?.country.message}</span>}
        </div>

        <div>
          <label>House Number</label>
          <input placeholder='House Number*' type="number" {...register('address.houseNumber', { required: false, min: 1 })} />
          {errors.address?.houseNumber && <span style={{ color: 'red' }}>{errors.address?.houseNumber.message}</span>}
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

export default CardNew;