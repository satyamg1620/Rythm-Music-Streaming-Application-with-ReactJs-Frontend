import React from 'react';

import SideBar from '../../components/SideBar/SideBar';
import TopBar from '../../components/TopBar/TopBar';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import LoadingAlert from '../../components/Alerts/LoadingAlert';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import useStyles from './styles';
import { MusicPlayer } from '../../components/footer/MusicPlayer';

const BrowsingLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div >
      <TopBar />
      <SideBar />
      <main className={classes.content}>{children}</main>
      <MusicPlayer />
      <ErrorAlert />
      <LoadingAlert />
      <SuccessAlert />
      {/* <MusicPlayer /> */}
    </div>
  );
};

export default BrowsingLayout;
