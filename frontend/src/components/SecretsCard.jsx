
import React from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const SecretsCard = ({message,id}) => {
  // console.log(id)
  
  return (
    <Card>
        <CardContent>
            <Typography paragraph>
                    {message.slice(0,150)}...
            </Typography>
            <Link to={`/secrets/${id}`} style={{textDecoration:"none"}}>
                view<ArrowForwardIcon/>
            </Link>
        </CardContent>
    </Card>
  )
}

export default SecretsCard;