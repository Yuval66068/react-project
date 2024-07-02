// FavoritesPage.js
import React, { useState, useEffect } from 'react';
import useAPI from "../hook/useAPI";
import { METHOD } from "../models/apiSchemas";
import { jwtDecode } from "jwt-decode";



const FavoritesCard = ({ token }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const [jwt,setJwt] = useState(null);
  const favoriteCards = data && jwt && data.filter(card => card.likes.some(userId => userId === jwt._id));

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL);
    setJwt(jwtDecode(token))
  }, [apiCall]);

  return (
    <div>
      <h1>My Favorite Cards</h1>
      <ul>
        {favoriteCards && favoriteCards.map(card => (
          <li key={card.id}>
            {card.title}
            <button >Remove from Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesCard;
