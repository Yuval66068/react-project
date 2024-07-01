import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAPI from "../../hook/useAPI";
import { METHOD } from "../../models/apiSchemas";


const CardView = () => {
  const [data, error, isLoading, apiCall] = useAPI();

    const [card,setCard] = useState(null);
    const {cardId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      apiCall(METHOD.CARDS_GET_ONE, {}, {id:cardId},{}); 
    }, [apiCall]);

    console.log(data)

  return (
    <div>
      
    </div>
  )
}

export default CardView
