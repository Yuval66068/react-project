import React, { useEffect, useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { METHOD } from '../../models/apiSchemas';
import useAPI from '../../hook/useAPI';
import './Home.css';
import { useNavigate } from "react-router-dom";

const Home = ({ searchInput }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const filteredList = data && data.filter((card) => card.title.includes(searchInput));
  const navigate = useNavigate();
  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL); // Use correct method for fetching all cards
  }, [apiCall]);

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

  const handleSingleCard = (id) => {
    navigate(`/${id}`)
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <Grid container spacing={3}>
        {filteredList && filteredList.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id} onClick={() => handleSingleCard(card._id)}>
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