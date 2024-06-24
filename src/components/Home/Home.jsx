import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useAPI, { METHOD } from '../../hook/useAPI'; // Adjust import path as needed
import './Home.css';

const Home = ({ searchText }) => {
  const [listOfCards, setListOfCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const userState = useSelector(store => store.user);

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL); // Use correct method for fetching all cards
  }, [apiCall]);

  useEffect(() => {
    if (data) {
      const updatedCards = data.map(card => ({
        ...card,
        liked: userState && card.likes.includes(userState._id)
      }));
      setListOfCards(updatedCards);
    }
  }, [data, userState]);

  useEffect(() => {
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
    const payload = {
      id: cardId
    }
    apiCall(METHOD.CARDS_UPDATE, payload); // Correct method for updating card likes
  };

  const handleShowPhone = (phone) => {
    setShowPhone({ visible: true, phone });
  };

  const handleClosePhone = () => {
    setShowPhone({ visible: false, phone: '' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <Grid container spacing={3}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={card.title}
                  height="140"
                  image={card.image.url}
                  title={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button onClick={() => handleLike(card._id)}>
                {card.liked ? 'Unlike' : 'Like'}
              </Button>
              <Button onClick={() => handleShowPhone(card.phone)}>
                Show Phone
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
