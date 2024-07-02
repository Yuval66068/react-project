import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { METHOD } from "../../models/apiSchemas";
import useAPI from "../../hook/useAPI";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";

const Home = ({ searchInput, isBusiness }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const filteredList =
    data && data.filter((card) => card.title.includes(searchInput));
  const navigate = useNavigate();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL); // Use correct method for fetching all cards
  }, [apiCall]);

  const handleLike = (cardId) => {
    const payload = {
      id: cardId,
    };
    apiCall(METHOD.CARDS_UPDATE, payload); // Correct method for updating card likes
  };

  const handleSingleCard = (id) => {
    navigate(`/cardView/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Card Page</h3>
      <h4>Here you can find business cards from all categories</h4>
      <Grid container spacing={3}>
        {filteredList &&
          filteredList.map((card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={card._id}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "400px",
                }}
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
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(card._id);
                      }}
                      fullWidth
                    >
                      {card.liked ? <AiOutlineDislike style={{width:"30px", height:"30px"}}/> : <AiOutlineLike style={{width:"30px", height:"30px"}} />}
                    </Button>
                    {isBusiness && (
                      <Button
                        onClick={() => handleSingleCard(card._id)}
                        fullWidth
                      >
                      <BsInfoSquare  style={{width:"30px", height:"30px", position:"absolute"}}/>
                      </Button>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Home;
