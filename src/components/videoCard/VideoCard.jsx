import React from 'react'
import styles from './videoCard.module.css'
import Image from 'next/image'

const VideoCard = ({ videoDetails }) => {
  return (
    <div className={styles.card}>
      <Image className={styles.thumb} src={videoDetails.thumb} alt="" width={270} height={133}/>
      <div className={styles.card_content}>
        <div className={styles.header}>
          <Image className={styles.avatar} src={videoDetails.avatar} alt="" width={40} height={40}/>
          <h4 className={styles.header_title}>{videoDetails.video_title}</h4>
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_top}>
            <span className={styles.views}>{videoDetails.views} Views</span>
            <span className={styles.time}>{videoDetails.time}</span>
          </div>
          <div className={styles.footer_bot}>
            <span className={styles.footer_title}>{videoDetails.user_title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard