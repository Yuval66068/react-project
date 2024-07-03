import React, { useState, useEffect } from 'react';
import useAPI from "../hook/useAPI";
import { METHOD } from "../models/apiSchemas";
import {jwtDecode} from "jwt-decode";
import { Grid } from "@mui/material";
import FavoriteSingleCard from './FavoriteSingleCard';

const FavoritesCard = ({ token }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const [jwt, setJwt] = useState(null);
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    if (token) {
      setJwt(jwtDecode(token));
    }
  }, [token]);

  useEffect(() => {
    if (jwt) {
      apiCall(METHOD.CARDS_GET_ALL);
    }
  }, [jwt, apiCall]);

  useEffect(() => {
    if (data && jwt) {
      setFavoriteCards(data.filter(card => card.likes.some(userId => userId === jwt._id)));
    }
  }, [data, jwt]);

  const handleRemoveFavorite = async (cardId) => {
    try {
      const newList = favoriteCards.filter((card) => card._id !== cardId);
      setFavoriteCards(newList);
    } catch (error) {
      console.error('Failed to remove favorite:', error.message);
    }
  };

  return (
    <div>
      <h1>My Favorite Cards</h1>
      <Grid container spacing={2}>
        {favoriteCards && favoriteCards.length !== 0 ? favoriteCards.map(card => (
          <FavoriteSingleCard key={card._id} card={card} token={token} handleRemoveFavorite={handleRemoveFavorite}/>
        ))
        :
        <p>No favorites exist...</p>
        }
      </Grid>
    </div>
  );
};

export default FavoritesCard;