// FavoritesPage.js
import React, { useState, useEffect } from 'react';

const FavoritesCard = ({ token }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/api/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error(error));
  }, [token]);

  const removeFavorite = (cardId) => {
    fetch(`/api/favorites/${cardId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setFavorites(favorites.filter(card => card.id !== cardId)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>My Favorite Cards</h1>
      <ul>
        {favorites.map(card => (
          <li key={card.id}>
            {card.title}
            <button onClick={() => removeFavorite(card.id)}>Remove from Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesCard;
