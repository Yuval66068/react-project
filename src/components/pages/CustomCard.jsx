import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CustomCard = ({ image, title, description, onReadMore, onLike, onShowPhone, liked }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={image}
          alt={title}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={onReadMore}>Read More</Button>
        <Button onClick={onLike}>
          {liked ? 'Unlike' : 'Like'}
        </Button>
        <Button onClick={onShowPhone}>Show Phone</Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
