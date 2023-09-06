import { alignProperty } from '@mui/material/styles/cssUtils';
import React from 'react'
import style from './MusicPlayer.module.css';
import spookifyAPI from '../../api/spookify';
export const MusicPlayer = () => {
    console.log("MUSIC PLAYER");
  return (
    <>
       
        <div className={style.container}>
            <h1>HI HELLO MY NAME IS SATYAM</h1>
            <audio controls>
                {/* <source src="horse.ogg" type="audio/ogg" /> */}
                <source src={'https://docs.google.com/uc?export=download&id=1D2VGSDb_N2n0Thn1VQaEljGa3nbOvfqS'} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> 
        </div>
    </>
  )
}
