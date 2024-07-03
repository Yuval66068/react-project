import React from "react";
import useAPI from "../../hook/useAPI";
import { METHOD } from "../../models/apiSchemas";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const HomeCard = ({ card, token, isBusiness,onLikeToggle, cards }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const navigate = useNavigate();
  const isLiked = token ? card.likes.some((userId) => userId === jwtDecode(token)._id) : false;

  const handleSingleCard = (id) => {
    navigate(`/cardView/${id}`);
  };

  const handleLike = (cardId) => {
    apiCall(METHOD.CARDS_LIKE, null, { id: cardId }, { "x-auth-token": token });
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={card._id}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "400px",
        }}
        className='singleCard'
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={card.title}
            height="30"
            image={card.image.url}
            title={card.title}
            sx={{ width: "100%", height: "200px" }}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              textAlign="center"
            >
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              textAlign="center"
            >
              {card.description}
            </Typography>
            <Button fullWidth>
              {isLiked ? (
                <AiOutlineDislike style={{ width: "30px", height: "30px" }} />
              ) : (
                <AiOutlineLike
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => handleLike(card._id)}
                />
              )}
            </Button>
            {isBusiness && (
              <Button onClick={() => handleSingleCard(card._id)} fullWidth>
                <BsInfoSquare
                  style={{
                    width: "30px",
                    height: "30px",
                    position: "absolute",
                  }}
                />
              </Button>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default HomeCard;
