'use client'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import styles from './playlistModal.module.css'
import Image from 'next/image';
import axios from 'axios';
import { apiError } from '@/components/api/ApiError';
import toast from 'react-hot-toast';

const PlaylistModal = ({ isOpen, closeModal, user, video }) => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');

  const createPlaylist = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist`, { name } , { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setPlaylists([...playlists, res.data.data]);
    })
    .catch((err) => {
      apiError(err);
    })
  } 
  
  const toggleVideoToPlaylist = (e, playlistId) => {
    const isChecked = e.target.checked;

     // Perform the toggle
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist._id === playlistId) {
        if (isChecked) 
          return { ...playlist, videos: [...playlist.videos, video._id] };
        else 
          return { ...playlist, videos: playlist.videos.filter(id => id !== video._id) };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);

    if (isChecked) {
      axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/add/${video?._id}/${playlistId}`, null, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        toast.success(res.data.message)
      })
      .catch((err) => {
        apiError(err);
      });
    } else {
      axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/remove/${video?._id}/${playlistId}`, null, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        toast.success(res.data.data)
      })
      .catch((err) => {
        apiError(err);
      });
    }
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/user/${user}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setPlaylists(res.data.data);
    })
    .catch((err) => {
      apiError(err);
    })
  }, [user]);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.container} overlayClassName ={styles.overlay_container}>
      <div className={styles.title_container}>
        <h4 className={styles.title}>Save To Playlist</h4>
        {/* <Image className={styles.icon} src="/close-icon.png" width={24} height={24} /> */}
      </div>
      <div className={styles.playlists_container}>
        <div className={styles.playlist_container}>
          {
            playlists.length === 0 ? <h4 className={styles.no_playlist}>No playlist, Create a new one</h4> : (
              playlists.map((playlist) => (
                <div key={playlist._id} className={styles.playlist}>
                  <input checked={playlist.videos.includes(video._id)} onChange={(e) => toggleVideoToPlaylist(e, playlist._id)} className={styles.playlist_input} type="checkbox"/>
                  <p className={styles.playlist_title}>{playlist.name}</p>
                </div>
              ))
            )
          }
        </div>
        <div className={styles.input_container}>
          <p className={styles.input_name}>Name</p>
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter playlist name' className={styles.input_newPlaylist}/>
        </div>
      </div>
      <div className={styles.button_container}>
        <button onClick={createPlaylist} className={styles.button}>Create New Playlist</button>
      </div>
    </Modal>
  )
}

export default PlaylistModal