import React, { useEffect } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { METHOD } from '../models/apiSchemas'; // Adjust import as necessary
import useAPI from '../hook/useAPI';
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const [data, error, isLoading, apiCall] = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL_MY_CARDS); // Fetch user's cards
  }, [apiCall]);

  const handleCreate = () => {
    navigate('/create-card'); // Navigate to create card page
  };

  const handleUpdate = (cardId) => {
    navigate(`/update-card/${cardId}`); // Navigate to update card page
  };

  const handleDelete = (cardId) => {
    const payload = {
      id: cardId
    };
    apiCall(METHOD.CARDS_DELETE, payload); // Delete card
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Business Cards</h1>
      <h2>Manage your business cards</h2>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create New Card
      </Button>
      <Grid container spacing={3}>
        {data && data.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <Card>
              <CardActionArea>
                {card.image && card.image.url && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image.url} 
                    alt={card.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button onClick={() => handleUpdate(card._id)}>Update</Button>
              <Button onClick={() => handleDelete(card._id)}>Delete</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyCards;
