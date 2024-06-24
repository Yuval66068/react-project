import React, { useEffect, useState } from 'react';
import useAPI, { METHOD } from '../../hook/useAPI'

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace fetchCards function with useAPI hook
  const [data, apiError, isLoading, fetchData] = useAPI('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', METHOD.CARDS_GET_ALL);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        await fetchData(); // Call the fetchData function returned by useAPI
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setCards(data); // Update cards state with the data from useAPI
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || apiError) {
    return <p>Error: {error || apiError.message}</p>;
  }

  return (
    <div>
      <h2>Card List</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {/* Render other card details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
