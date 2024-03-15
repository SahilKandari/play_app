"use client"
import React, { useEffect, useState } from "react";
import styles from './sideVideoPage.module.css'
import { useRecoilState } from "recoil";
import { searchedVideos } from "../state/atoms/State";
import axios from "axios";
import { timeDifference } from "@/app/page";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SideVideo = () => {
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const getVideo = (id) => {
    router.push('/video/'+ id);
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/videos/?page=1&limit=10&sortBy=date&sortType=asc`,{ withCredentials: true })
    .then((res) => {
      console.log(res);
      setVideos(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      apiError(err)
    });
  }, []);
  return (
    <div className={styles.container}>
        {
          videos.map((video) => (
          <div onClick={() => getVideo(video?._id)} key={video?._id} className={styles.card}>
            <Image src={video?.thumbnail} width={202} height={115}/>
            <div className={styles.card_content}>
              <div className={styles.content_top}>
                <h4 className={styles.title}>{video?.title}</h4>
                <div className={styles.avatar_container}>
                  <p className={styles.avatar_title}>{video?.owner.username}</p>
                </div>
              </div>
              <div className={styles.video_details}>
                <span className={styles.views}>{video?.views} views</span>
                <span className={styles.time}>{timeDifference(video?.createdAt)}</span>
              </div>
            </div>
          </div>
          ))
        }
      </div>
  )
}

export default SideVideo