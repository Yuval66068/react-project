import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import './cardEdit.css';
import { METHOD } from '../././../models/apiSchemas';
import useAPI from '../../hook/useAPI';

const CardEdit = ({ isBusinessUser }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, error, isLoading, apiCall] = useAPI();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await apiCall(METHOD.CARDS_GET, {}, {}, { "x-auth-token": isBusinessUser }, `/${id}`);
        for (const [key, value] of Object.entries(cardData)) {
          if (typeof value === 'object') {
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
              setValue(`${key}.${nestedKey}`, nestedValue);
            }
          } else {
            setValue(key, value);
          }
        }
      } catch (error) {
        console.error('Failed to fetch card data:', error.message);
      }
    };

    fetchCard();
  }, [id, isBusinessUser, setValue, apiCall]);

  const handleEditSubmit = async (formData) => {
    try {
      await apiCall(METHOD.CARDS_UPDATE, formData, {}, { "x-auth-token": isBusinessUser }, `/${id}`);
      navigate('/my-cards');
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

  return (
    <div>
      <h2>EDIT CARD</h2>
      <form onSubmit={handleSubmit(handleEditSubmit)}>
        {/* Title */}
        <div>
          <label></label>
          <input placeholder='Title*' {...register('title', { required: false, minLength: 1, maxLength: 256 })} />
          {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>

        {/* Subtitle */}
        <div>
          <label></label>
          <input placeholder='Subtitle*' {...register('subtitle', { required: false, minLength: 1, maxLength: 256 })} />
          {errors.subtitle && <span style={{ color: 'red' }}>{errors.subtitle.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label></label>
          <input placeholder='Description*' {...register('description', { required: false, minLength: 1, maxLength: 1024 })} />
          {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
        </div>

        {/* Phone */}
        <div>
          <label></label>
          <input placeholder='Phone*' {...register('phone', { required: false, minLength: 10, maxLength: 10 })} />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
        </div>

        {/* Email */}
        <div>
          <label></label>
          <input placeholder='Email*' type="email" {...register('email', { required: false })} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>

        {/* Web */}
        <div>
          <label></label>
          <input placeholder='Website*' {...register('web', { required: false })} />
          {errors.web && <span style={{ color: 'red' }}>{errors.web.message}</span>}
        </div>

        {/* Image URL */}
        <div>
          <label></label>
          <input placeholder='Image URL*' {...register('image.url', { required: false, minLength: 14 })} />
          {errors.image?.url && <span style={{ color: 'red' }}>{errors.image?.url.message}</span>}
        </div>

        {/* Image Alt */}
        <div>
          <label></label>
          <input placeholder='Image Alt*' {...register('image.alt', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.image?.alt && <span style={{ color: 'red' }}>{errors.image?.alt.message}</span>}
        </div>

        {/* Address */}
        <div>
          <label></label>
          <input placeholder='Street*' {...register('address.street', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.street && <span style={{ color: 'red' }}>{errors.address?.street.message}</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='City*' {...register('address.city', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.city && <span style={{ color: 'red' }}>{errors.address?.city.message}</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='State' {...register('address.state', { minLength: 2, maxLength: 256 })} />
          {errors.address?.state && <span style={{ color: 'red' }}>{errors.address?.state.message}</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='ZIP' {...register('address.zip', { minLength: 2, maxLength: 256 })} />
          {errors.address?.zip && <span style={{ color: 'red' }}>{errors.address?.zip.message}</span>}
        </div>

        <div>
          <label></label>
          <input placeholder='Country*' {...register('address.country', { required: false, minLength: 2, maxLength: 256 })} />
          {errors.address?.country && <span style={{ color: 'red' }}>{errors.address?.country.message}</span>}
        </div>

        <div>
          <label></label>
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

export default CardEdit;
