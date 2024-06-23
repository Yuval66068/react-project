import React, { useEffect, useState } from 'react';
import fetchCards from '../../hook/fetchCards'; 


const CardList = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cardsData = await fetchCards();
                setCards(cardsData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Card List</h2>
            <ul>
                {cards.map(card => (
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
