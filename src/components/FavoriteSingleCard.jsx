import React from 'react'
import { FaTrash } from "react-icons/fa";
import { METHOD } from "../models/apiSchemas";
import useAPI from "../hook/useAPI";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";


const FavoriteSingleCard = ({ card, token, handleRemoveFavorite }) => {
    const [data, error, isLoading, apiCall] = useAPI();

    const onRemoveFavorites = async () => {
        try {
            await apiCall(METHOD.CARDS_LIKE, null, { id: card._id }, { "x-auth-token": token });
            handleRemoveFavorite(card._id)
        } catch (error) {
            console.error('Failed to remove favorite:', error.message)
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4} key={card._id}>
            <Card style={{ height: "500px" }} className='singleCard'>
                <CardActionArea>
                    {card.image && card.image.url && (
                        <CardMedia
                            component="img"
                            height="250"
                            image={card.image.url}
                            alt={card.title}
                        />
                    )}
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {card.description}
                        </Typography>
                    </CardContent>
                    <FaTrash onClick={onRemoveFavorites} color='#c30101' />
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default FavoriteSingleCard