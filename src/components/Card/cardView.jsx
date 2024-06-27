import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import useAPI from '../../hook/useAPI';
import { METHOD } from '../././../models/apiSchemas';


const CardView = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [data, error, isLoading, apiCall] = useAPI();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch card details when cardId changes
    apiCall(METHOD.CARDS_GET_ONE,null, { id: cardId }); // Ensure useAPI supports this method
  }, [apiCall, cardId]);

  useEffect(() => {
    // Update card state when data is fetched
    if (data) {
      setCard(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!card) return <div>No card details found</div>;

  return (
    // <Container className="card-detail-container">
    //   <Card className="card-detail">
    //     <CardMedia
    //       component="img"
    //       alt={card.image.alt}
    //       height="300"
    //       image={card.image.url}
    //       title={card.title}
    //     />
    //     <CardContent>
    //       <Typography variant="h5" component="div">
    //         {card.title}
    //       </Typography>
    //       <Typography variant="subtitle1" color="textSecondary">
    //         {card.subtitle}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         {card.description}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Phone: {card.phone}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Email: {card.email}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Website: <a href={card.web} target="_blank" rel="noopener noreferrer">{card.web}</a>
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Address: {card.address.city} {card.address.street} {card.address.houseNumber}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Card Number: {card.bizNumber}
    //       </Typography>
    //       <Button variant="contained" color="primary" onClick={() => navigate('/')}>
    //         Back to Home
    //       </Button>
    //     </CardContent>
    //   </Card>
    // </Container>
    <div>some div</div>
  );
};

export default CardView;
