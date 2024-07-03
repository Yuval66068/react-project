import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { METHOD } from "../models/apiSchemas"; // Adjust import as necessary
import useAPI from "../hook/useAPI";
import { useNavigate } from "react-router-dom";
import SingleCard from "./Card/singleCard";
import { toast } from "react-toastify";

const MyCards = ({ token, isBusinessUser }) => {
  const [data, error, isLoading, callAPI] = useAPI();
  const navigate = useNavigate();
  const [myCards, setMyCards] = useState(null);

  useEffect(() => {
    handleGetMyCards();
  }, []);

  useEffect(() => {
    if (data) {
      setMyCards(data);
    }
  }, [data]);

  const handleGetMyCards = async () => {
    try {
      callAPI(METHOD.CARDS_GET_ALL_MY_CARDS, null, {}, { "x-auth-token": token });
      toast.success('My cards fetched successfully!');
    } catch (error) {
      console.error('Failed to fetch card data:', error.message);
      toast.error('Failed to fetch card data!');
    }
  };


  const handleCreate = () => {
    navigate("/cardNew"); // Navigate to create card page
  };

  const handleEdit = (cardId) => {
    navigate(`/cardEdit/${cardId}`); // Navigate to update card page
  };

  const handleDelete = (cardId) => {
    // const payload = {
    //   id: cardId,
    // };
    // callAPI(METHOD.CARDS_DELETE,null,payload, {"x-auth-token": token});
    setMyCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
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
        {myCards &&
          myCards.map((card) => (
            <SingleCard card={card} key={card._id} handleDelete={handleDelete} handleEdit={handleEdit} isBusinessUser={isBusinessUser} token={token} />
          ))}
      </Grid>
    </div>
  );
};

export default MyCards;
