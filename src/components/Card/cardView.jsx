import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../hook/useAPI";
import { METHOD } from "../../models/apiSchemas";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const CardView = () => {
  const [card, setCard] = useState(null);
  const { cardId } = useParams();
  const [data, error, isLoading, apiCall] = useAPI();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ONE, null, { id: cardId }, {});
  }, [cardId, apiCall]);

  useEffect(() => {
    if (data) {
      setCard(data);
    }
  }, [data]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      {card && (
        <Card style={{ height: "500px" }}>
          <CardActionArea>
            {card.image && card.image.url && (
              <CardMedia
                component="img"
                height="250"
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
        </Card>
      )}
    </Grid>
  );
};

export default CardView;