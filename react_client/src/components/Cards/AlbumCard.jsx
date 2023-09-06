import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

const AlbumCard = ({ data, backgroundColor }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fontSize =
    data.name.length >= 18 ? '1.5em' : data.name.length >= 8 ? '2em' : '3em';

  return (
    <Card className={classes.root} style={{ backgroundColor: backgroundColor }}>
      <Link className={classes.link} to={`/browse/albums/${data.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography
              style={{ fontSize: fontSize }}
              className={classes.heading}
            >
              {data.name}
            </Typography>
            {fontSize === '2em' && <div style={{ height: '1.5em' }} />}
            {data.name === 'Breaking the Habit' && (
              <div style={{ height: '2em' }} />
            )}
          </CardContent>
          <CardMedia className={classes.media} image={data.album_art_url} />
        </CardActionArea>
      </Link>

      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Link
            className={classes.link}
            to={`/browse/artists/${data.artist.id}`}
          >
            <Typography className={classes.subheading} paragraph>
              {data.artist.name}
            </Typography>
          </Link>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AlbumCard;
