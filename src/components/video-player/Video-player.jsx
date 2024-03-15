'use client'
import React, { useEffect, useState } from 'react'
import styles from './video-playerPage.module.css'
import 'video-react/dist/video-react.css';
import { Player, BigPlayButton } from 'video-react';
import Image from 'next/image';
import CustomButton from '@/components/button/Button';
import { timeDifference } from '../../app/page';
import axios from 'axios';
import { apiError } from '@/components/api/ApiError';
import { useRecoilValue } from 'recoil';
import { authState, userState } from '@/components/state/atoms/State';
import PlaylistModal from '@/components/modals/playlist/PlaylistModal';
import toast from 'react-hot-toast';

const VideoPlayer = ({details}) => {
  const [comments, setComments] = useState([]);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [commentTxt, setCommentTxt] = useState('');
  const isAuth = useRecoilValue(authState); 
  const user = useRecoilValue(userState);

  const { thumbnail, videoFile, description, owner, title, views, createdAt } = details;

  const openModal = () => {
    setPlaylistModal(true);
  }

  const closeModal = () => {
    setPlaylistModal(false);
  }

  const toggleSubsription = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions/c/${owner?._id}`, null, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setIsSubscribed(!isSubscribed);
    })
    .catch((err) => {
      apiError(err)
    });
  }

  const giveLike = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/likes/toggle/v/${details?._id}`, null, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      getLikes();
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }

  const giveDislike = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/likes/toggle/v/${details?._id}/dislike`, null, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      getLikes();
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }

  const getLikes = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/likes/v/${details?._id}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setLikes(res.data.data);
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/likes/v/${details?._id}/dislike`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setDislikes(res.data.data);
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }

  const postComment = () => {
    if (commentTxt.trim() === '') {
      return toast.error("Enter text to post comment");
    }

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${details?._id}`, {
      content: commentTxt
    }, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      toast.success("Comment added successfully");
      setCommentTxt('');
      getComments();
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }

  const getComments = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${details?._id}`)
    .then((res) => {
      console.log(res.data.data);
      setComments(res.data.data);
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }

  useEffect(() => {
    getComments();

    getLikes();
  }, [details]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions/u/${owner?._id}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setSubscribers(res.data.data);
      res.data.data.forEach((sub) => {
        if (sub.subscriber._id === user._id) {
          setIsSubscribed(sub.isSubscribed);
        }
      });
    })
    .catch((err) => {
      // apiError(err)
      console.log(err);
    });
  }, [isSubscribed]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.video_container}>
          <Player
            playsInline
            poster={thumbnail}
            src={videoFile}
          >
            <BigPlayButton position="center" />
          </Player>
        </div>
        <div className={styles.details_container}>
          <div className={styles.details_header}> 
            <div className={styles.title_container}>
              <h4 className={styles.title}>{title}</h4>
              <div className={styles.views_container}>
                <span className={styles.views}>{views} Views</span>
                <span className={styles.time}>{timeDifference(createdAt)}</span>
              </div>
            </div>
            {
              isAuth && (
                <div className={styles.options_container}>
                <div className={styles.likes_container}>
                  <div onClick={giveLike} className={styles.likes}>
                    <Image src="/liked-icon.png" width={17} height={17}/>
                    <p className={styles.like_counter}>{likes?.length}</p>
                  </div>
                  <div onClick={giveDislike} className={styles.likes}>
                    <Image src="/dislike-icon.png" width={17} height={17}/>
                    <p className={styles.dislike_counter}>{dislikes?.length}</p>
                  </div>
                </div>
                <div onClick={openModal} className={styles.save_container}>
                  <Image src="/folder-icon.png" width={17} height={17}/>
                  <p className={styles.save_title}>Save</p>
                </div>
              </div>
              )
            }
          </div>
          <div className={styles.user_container}>
            <div className={styles.avatar_details}>
              <Image className={styles.avatar_image} src={owner?.avatar} width={32} height={32}/>
              <div>
                <h4 className={styles.avatar_title}>{owner?.username}</h4>
                <p className={styles.avatar_followers}>{subscribers.length} Follwers</p>
              </div>
            </div>
            {
              isAuth && <CustomButton onClick={toggleSubsription} color="white" href="#"> <Image src="/followWhite-icon.png" width={16} height={16}/> { isSubscribed ?  'Unfollow' : 'Follow'}</CustomButton>
            }
          </div>
          <div className={styles.desc_container}>
              <p className={styles.description}>{description}</p>
          </div>
        </div>
        <div className={styles.comments_container}>
          <p className={styles.comments_counter}>{comments?.length} Comments</p>
          {
            isAuth && <div>
              <textarea onChange={(e) => setCommentTxt(e.target.value)} className={styles.add_comment} rows="2" placeholder='Add a comment'></textarea>
              <button onClick={postComment} className={styles.comment_button}>Post Comment</button>
            </div>
          }
          {
            comments?.map((comment) => (
              <div key={comment._id} className={styles.comment_container}>
              <div className={styles.comment_avatar_container}>
                <Image className={styles.comment_avatar_image} src={comment.owner.avatar} width={48} height={48}/>
                <div>
                  <div className={styles.comment_title_container}>
                    <h4 className={styles.comment_avatar_title}>{comment.owner.username}</h4>
                    <p className={styles.comment_avatar_time}>{timeDifference(comment.createdAt)}</p>
                  </div>
                  <p className={styles.comment_avatar_mail}>{comment.owner.email}</p>
                </div>
              </div>
              <p className={styles.comment}>{comment.content}</p>
            </div>
            ))
          }
        </div>
      </div>
      <PlaylistModal video={details} isOpen={playlistModal} closeModal={closeModal} user={user?._id} />
    </>
  )
}

export default VideoPlayer