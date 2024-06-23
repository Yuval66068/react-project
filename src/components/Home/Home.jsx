import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import Redux's useSelector
import useAPI, { METHOD } from '../../hook/useAPI'; // Import your custom API hook

const API_CASES = {
  BASE_STATE: 'BASE_STATE',
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_LIKE_UNLIKE: 'CARDS_LIKE_UNLIKE'
};

const Home = ({ searchText }) => {
  const [listOfCards, setListOfCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI(); // Destructure the API hook

  const userState = useSelector(state => state.user); // Example of using Redux's useSelector

  const [apiCase, setApiCase] = useState(API_CASES.BASE_STATE);

  useEffect(() => {
    // Fetch initial data when component mounts
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    // Handle data updates when data or apiCase changes
    switch (apiCase) {
      case API_CASES.CARDS_GET_ALL:
        if (data) {
          // Assuming data is an array of cards, update state accordingly
          const updatedCards = data.map(card => ({
            ...card,
            liked: userState && card.likes.includes(userState._id) // Assuming userState._id exists
          }));
          setListOfCards(updatedCards);
          setFilteredCards(updatedCards); // Initialize filteredCards with all cards
        }
        break;
      // Additional cases for other API interactions can be added here
      default:
        break;
    }
  }, [apiCase, data, userState]);

  useEffect(() => {
    // Filter cards based on searchText
    if (searchText) {
      const filtered = listOfCards.filter(card =>
        card.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(listOfCards);
    }
  }, [searchText, listOfCards]);

  const handleLike = (cardId) => {
    // Handle liking/unliking a card
    const payload = { id: cardId };
    setApiCase(API_CASES.CARDS_LIKE_UNLIKE); // Trigger a re-fetch after liking/unliking
    apiCall(METHOD.CARDS_LIKE_UNLIKE, payload);
  };

  if (isLoading) return <div>Loading...</div>; // Render loading state
  if (error) return <div>Error: {error}</div>; // Render error state
  if (filteredCards.length === 0) return <div>No results found</div>; // Render no results found

  // Render the list of cards
  return (
    <div>
      <h2>List of Cards</h2>
      {filteredCards.map(card => (
        <div key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button onClick={() => handleLike(card.id)}>
            {card.liked ? 'Unlike' : 'Like'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
