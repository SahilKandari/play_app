"use client"
import React, { useState } from 'react'
import styles from './searchedPage.module.css'
import Image from 'next/image'
import Navbar from '@/components/navbar/Navbar'
import Sidenav from '@/components/sidenav/Sidenav'
import { useRecoilValue } from 'recoil'
import { searchedVideos, sideNavState } from '@/components/state/atoms/State'
import { timeDifference } from '../page'

const Searched = () => {
  const isOpen = useRecoilValue(sideNavState);
  const videos = useRecoilValue(searchedVideos);
  return (
    <>
      <Navbar/>
      <Sidenav/>
      <div className={isOpen ? `${styles.container} ${styles.container_open}` : `${styles.container} ${styles.container_close}` }>
        {
          videos.map((video) => (
          <div key={video?._id} className={styles.card}>
            <Image src={video?.thumbnail} width={313} height={172}/>
            <div className={styles.card_content}>
              <div className={styles.content_top}>
                <h4 className={styles.title}>{video?.title}</h4>
                <div className={styles.avatar_container}>
                  <p className={styles.avatar_title}>{video?.owner.username}</p>
                  <Image className={styles.avatar} src={video?.owner.avatar} width={40} height={40}/>
                </div>
              </div>
              <div className={styles.video_details}>
                <span className={styles.views}>{video?.views} views</span>
                <span className={styles.time}>{timeDifference(video?.createdAt)}</span>
              </div>
              <p className={styles.video_desc}>{video?.description}</p>
            </div>
          </div>
          ))
        }
      </div>
    </>
  )
}

export default Searched