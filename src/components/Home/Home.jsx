import React, { useEffect } from "react";
import {
  Grid,
} from "@mui/material";
import { METHOD } from "../../models/apiSchemas";
import useAPI from "../../hook/useAPI";
import "./Home.css";
import HomeCard from "./HomeCard";

const Home = ({ searchInput, isBusiness,token }) => {
  const [data, error, isLoading, apiCall] = useAPI();
  const filteredList = data && data.filter((card) => card.title.includes(searchInput));

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Card Page</h3>
      <h4>Here you can find business cards from all categories</h4>
      <Grid container spacing={3}>
        {filteredList &&
          filteredList.map((card) => (<HomeCard key={card._id} card={card} token={token} isBusiness={isBusiness} cards={data}/>
          ))}
      </Grid>
    </div>
  );
};

export default Home;
