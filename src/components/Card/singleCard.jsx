import React from 'react'
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Button,
  } from "@mui/material";
  import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAPI from "../../hook/useAPI";
import { METHOD } from "../../models/apiSchemas"; // Adjust import as necessary


const SingleCard = ({card, handleEdit, handleDelete, isBusinessUser, token}) => {
    const [data, error, isLoading, callAPI] = useAPI();
    const onDelete = async () => {
        try {
            await callAPI(METHOD.CARDS_DELETE, null, { id: card._id }, {"x-auth-token": token});
            handleDelete(card._id);
        } catch (error) {
            console.error('Failed to delete card:', error.message);
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} key={card._id}>
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
                        {isBusinessUser && (
                            <>
                                <FaRegEdit onClick={() => handleEdit(card._id)} />
                                <MdDelete onClick={onDelete} />
                            </>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default SingleCard