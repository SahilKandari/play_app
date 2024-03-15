"use client"
import React, { useEffect, useState } from 'react'
import styles from './videoPage.module.css'
import axios from 'axios'
import Navbar from '@/components/navbar/Navbar'
import Sidenav from '@/components/sidenav/Sidenav'
import { useRecoilValue } from 'recoil'
import { sideNavState } from '@/components/state/atoms/State'
import SideVideo from '@/components/sideVideo/page'
import VideoPlayer from '@/components/video-player/Video-player'


const Video = ({ params }) => {
  const isOpen = useRecoilValue(sideNavState);
  const [video, setVideo] = useState({});

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/videos/${params.slug}`, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      setVideo(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  return (
    <>
      <Navbar/>
      <Sidenav/>
      <div className={isOpen ? `${styles.container} ${styles.container_open}` : `${styles.container} ${styles.container_close}`}>
        <VideoPlayer details={video}/>
        <SideVideo/>
      </div>
    </>
  )
}

export default Video