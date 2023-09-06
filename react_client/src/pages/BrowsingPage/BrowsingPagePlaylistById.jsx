import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import GridLayout from '../../layouts/GridLayout/GridLayout';
import SongCard from '../../components/Cards/SongCard';
import PlaylistForm from '../../components/Modals/PlaylistForm/PlaylistForm';
import spookifyAPI from '../../api/spookify';
import useStyles from './styles';

const BrowsingPagePlaylistById = ({ id }) => {
  const classes = useStyles();
  const history = useHistory();

  const [songsData, setSongsData] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  const handleClickPlaylistModal = () => {
    setPlaylistModalOpen(true);
  };

  const handleClosePlaylistModal = async () => {
    const { data } = await spookifyAPI.get(`/playlists/${id}`);
    //TODO error handler

    setPlaylistName(data.name);
    setPlaylistModalOpen(false);
  };

  const handleClickDelete = async () => {
    await spookifyAPI.delete(`/playlists/${id}`);
    history.push('/browse/songs');
  };

  useEffect(() => {
    const getSongs = async () => {
      const { data } = await spookifyAPI.get(`/playlists/${id}`);
      //TODO error handler

      setPlaylistName(data.name);

      let songsArr = [];
      for (const songId of data.songs) {
        const songData = await spookifyAPI.get(`/songs/${songId}`);
        songsArr.push(songData.data);
      }

      setSongsData(songsArr);
    };

    getSongs();
  }, [id]);

  return (
    <>
      <GridLayout>
        <Grid item xs={12}>
          <Typography className={classes.heading}>{playlistName}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleClickPlaylistModal}
            className={classes.button}
            style={{ margin: 10 }}
          >
            Edit Name
          </Button>

          <Button
            onClick={handleClickDelete}
            className={classes.button}
            style={{ margin: 10 }}
          >
            Delete
          </Button>

          <PlaylistForm
            openFlag={playlistModalOpen}
            closeHandler={handleClosePlaylistModal}
            playlistId={id}
          ></PlaylistForm>
        </Grid>

        {songsData.map((data, index) => {
          return (
            <Grid key={data.id} item xs={12} md={6} lg={4}>
              <SongCard
                data={data}
                backgroundColor={index % 2 === 1 ? '#ff5050' : '#8D99AE'}
              />
            </Grid>
          );
        })}
      </GridLayout>
    </>
  );
};

export default BrowsingPagePlaylistById;
