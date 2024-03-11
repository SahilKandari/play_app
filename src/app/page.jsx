"use client"
import styles from "./page.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import VideoCard from "@/components/videoCard/VideoCard";
import Navbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/sidenav/Sidenav";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { authState, sideNavState } from "@/components/state/atoms/State";
import axios from "axios";

export const timeDifference = (providedTimestamp) => {
  const providedTime = new Date(providedTimestamp);
  const currentTime = new Date();

  const difference = currentTime - providedTime;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  } 
}


export default function Home() {
  const isOpen = useRecoilValue(sideNavState);
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) 
        setIsAuth(false);
      else 
        setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/videos/`, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      setVideos(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);
  return (
    <>
    <Navbar/>
    <Sidenav/>
    <div className={isOpen ? `${styles.container} ${styles.container_open}` : `${styles.container} ${styles.container_close}` }>
      {
        videos.map((video) => (
          <VideoCard key={video?._id} videoDetails={{
            thumb: video?.thumbnail,
            video_title: video?.title, 
            avatar: video?.owner.avatar,
            views: video?.views,
            time: timeDifference(video?.createdAt),
            user_title: video?.owner.username,
          }}/>
        ))
      }
    </div>
    </>
  );
}
