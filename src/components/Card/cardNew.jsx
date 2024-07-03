import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './cardNew.css';
import { METHOD } from '../././../models/apiSchemas';
import useAPI from '../../hook/useAPI';
import { toast } from 'react-toastify';

const CardNew = ({token}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [data, error, isLoading, apiCall] = useAPI();

  const handleLoginSubmit = async (formData) => {
    try {
      await apiCall(METHOD.CARDS_CREATE, formData,{},{"x-auth-token": token});
      toast.success('Card created successfully!');
      if(data) {
        reset(); 
        navigate('/');
      }
    } catch (error) {
      console.error('Submission failed:', error.message);
      toast.error('Submission failed!');
    }
  };

  return (
    <div>
      <h2>CREATE NEW CARD</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div>
          <input placeholder='Title*' {...register('title', { required: true, minLength: 2, maxLength: 256 })} />
           {errors.title?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Title is required</span>}
           {errors.title?.type === 'minLength' && <span style={{ color: 'red' }}>Title must be at least 2 characters</span>}
           {errors.title?.type === 'maxLength' && <span style={{ color: 'red' }}>Title cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='Subtitle*' {...register('subtitle', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.subtitle?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>subtitle is required</span>}
           {errors.subtitle?.type === 'minLength' && <span style={{ color: 'red' }}>subtitle must be at least 2 characters</span>}
           {errors.subtitle?.type === 'maxLength' && <span style={{ color: 'red' }}>subtitle cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='Description*' {...register('description', { required: true, minLength: 2, maxLength: 1024 })} />
          {errors.description?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Description is required</span>}
           {errors.description?.type === 'minLength' && <span style={{ color: 'red' }}>Description must be at least 2 characters</span>}
           {errors.description?.type === 'maxLength' && <span style={{ color: 'red' }}>Description cannot exceed 1024 characters</span>}
        </div>
        <div>
          <input placeholder='Phone*' {...register('phone', { required: true, minLength: 10, maxLength: 10 })} />
          {errors.phone?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Phone is required</span>}
           {errors.phone?.type === 'minLength' && <span style={{ color: 'red' }}>Phone must be at least 10 characters</span>}
           {errors.phone?.type === 'maxLength' && <span style={{ color: 'red' }}>Phone cannot exceed 10 characters</span>}
        </div>
        <div>
          <input placeholder='Email*' type="email" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          {errors.email?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Email is required</span>}
          {errors.email?.type === 'pattern' && <span style={{ color: 'red' }}>Please enter a valid email address</span>}
        </div>
        <div>
          <input placeholder='Website*' {...register('web', { required: true,/*  pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/  */})} />
          {errors.web?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>web is required</span>}
        </div>
        <div>
          <input placeholder='Image URL*' {...register('image.url', { required: true, minLength: 14 })} />
          {errors.image?.url && <span style={{ color: 'red' }}>{errors.image?.url.message}</span>}
          {errors.image?.url?.type === 'minLength' && <span style={{ color: 'red' }}>Url must be at least 10 characters</span>}
        </div>
        <div>
          <input placeholder='Image Alt*' {...register('image.alt', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.image?.alt?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>alt is required</span>}
           {errors.image?.alt?.type === 'minLength' && <span style={{ color: 'red' }}>alt must be at least 2 characters</span>}
           {errors.image?.alt?.type === 'maxLength' && <span style={{ color: 'red' }}>alt cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='Street*' {...register('address.street', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.street?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>address is required</span>}
           {errors.address?.street?.type === 'minLength' && <span style={{ color: 'red' }}>address must be at least 2 characters</span>}
           {errors.address?.street?.type === 'maxLength' && <span style={{ color: 'red' }}>address cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='City*' {...register('address.city', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.city?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>city is required</span>}
           {errors.address?.city?.type === 'minLength' && <span style={{ color: 'red' }}>city must be at least 2 characters</span>}
           {errors.address?.city?.type === 'maxLength' && <span style={{ color: 'red' }}>city cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='State' {...register('address.state', { minLength: 2, maxLength: 256 })} />
           {errors.address?.state?.type === 'minLength' && <span style={{ color: 'red' }}>state must be at least 2 characters</span>}
           {errors.address?.state?.type === 'maxLength' && <span style={{ color: 'red' }}>state cannot exceed 256 characters</span>}
        </div>
        <div>
          <input placeholder='ZIP' {...register('address.zip', { minLength: 2, maxLength: 256 })} />
           {errors.address?.zip?.type === 'minLength' && <span style={{ color: 'red' }}>zip must be at least 2 characters</span>}
           {errors.address?.zip?.type === 'maxLength' && <span style={{ color: 'red' }}>zip cannot exceed 256 characters</span>}
        </div>

        <div>
          <input placeholder='Country*' {...register('address.country', { required: true, minLength: 2, maxLength: 256 })} />
          {errors.address?.country?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>country is required</span>}
           {errors.address?.country?.type === 'minLength' && <span style={{ color: 'red' }}>country must be at least 2 characters</span>}
           {errors.address?.country?.type === 'maxLength' && <span style={{ color: 'red' }}>country cannot exceed 256 characters</span>}
        </div>

        <div>
          <input placeholder='House Number*' type="number" {...register('address.houseNumber', { required: true, min: 1 })} />
          {errors.address?.houseNumber?.type === 'required' && <span style={{ color: 'red', fontSize: '0.8rem' }}>houseNumber is required</span>}
           {errors.address?.houseNumber?.type === 'minLength' && <span style={{ color: 'red' }}>houseNumber must be at least 1 characters</span>}
           {errors.address?.houseNumber?.type === 'maxLength' && <span style={{ color: 'red' }}>houseNumber cannot exceed 256 characters</span>}
        </div>
        <div className='btns'>
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