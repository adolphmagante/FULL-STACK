import React from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CharacterCard = ({ character }) => {
  const calculateTimeAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const diffInMs = now - createdDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears >= 1) {
      return diffInYears === 1 ? 'a year ago' : `${diffInYears} years ago`;
    } else if (diffInMonths >= 1) {
      return diffInMonths === 1 ? 'a month ago' : `${diffInMonths} months ago`;
    } else if (diffInDays >= 1) {
      return diffInDays === 1 ? 'a day ago' : `${diffInDays} days ago`;
    } else if (diffInHours >= 1) {
      return diffInHours === 1 ? 'an hour ago' : `${diffInHours} hours ago`;
    } else {
      return diffInMinutes === 1 ? 'a minute ago' : `${diffInMinutes} minutes ago`;
    }
  };

  const fields = [
    { label: 'STATUS', value: character.status },
    { label: 'SPECIES', value: character.species },
    { label: 'GENDER', value: character.gender },
    { label: 'ORIGIN', value: character.origin.name },
    { label: 'LAST LOCATION', value: character.location.name },
  ];

  return (
    <Card sx={{ backgroundColor: '#1c1c1c' }}>
      <Box position='relative' sx={{ height: { xl: 250, lg: 200, md: 200 }, overflow: 'hidden' }}>
        <CardMedia
          component='img'
          image={character.image}
          height='100%'
          alt='event-card-preview'
          sx={{ objectFit: 'cover', zIndex: 0 }}
        />
        <Box
          position='absolute'
          bottom={0}
          left={0}
          right={0}
          p={1}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            textAlign: 'start',
          }}
        >
          <Typography variant="h6" component="div" noWrap>
            {character.name}
          </Typography>
          <Typography variant="body2" component="div">
            Id: {character.id} - created {calculateTimeAgo(character.created)}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ height: 200 }} >
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}
        >
          {fields.map((field, index) => (
            <Stack key={index} direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography align='left' variant="body2" color="white" sx={{ wordBreak: 'break-word' }}>
                {field.label}
              </Typography>
              <Typography align='right' variant="body2" color="orange" sx={{ wordBreak: 'break-word' }}>
                {field.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CharacterCard;
