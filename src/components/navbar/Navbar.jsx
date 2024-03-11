"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, searchedVideos, sideNavState } from "../state/atoms/State";
import axios from "axios";
import toast from "react-hot-toast";
import { apiError } from "../api/ApiError";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [sideNav, setSideNav] = useRecoilState(sideNavState);
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const [searchedVideo, setSearchedVideo] = useRecoilState(searchedVideos);

  const logout = () => {
    const token = Cookies.get('accessToken');

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
      setIsAuth(false);
    })
    .catch((err) => {
      apiError(err);
    })
  }

  const searchKeyUp = (e) => {
    let value = e.target.value;
    if (e.key === 'Enter' && value.trim() !== "") {
      router.push('/searched');
    };

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/videos/?page=1&limit=10&sortBy=date&sortType=asc&query=${value}`,
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res);
      setSearchedVideo(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      apiError(err)
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image
          className={styles.image}
          src="/Logo.png"
          alt="play_logo"
          width={63}
          height={63}
        />
      </div>
      <div className={styles.search_container}>
        <input
          type="text"
          placeholder="Search"
          className={styles.search_input}
          onKeyUp={searchKeyUp}
        />
        <Image
          src="/navbar-search-icon.png"
          className={styles.search_icon}
          width={20}
          height={20}
        />
      </div>
      <div className={styles.profile_container}>
        <Image
          onClick={() => setSideNav(!sideNav)}
          src="/navbar-dropdown-icon.png"
          className={styles.search_icon}
          width={20}
          height={20}
        />
        {
          !isAuth ? 
            <>
              <Link href="/login">Log in</Link>
              <CustomButton href="/signup" variant="shadow">
                Sign up
              </CustomButton>
            </>
            
          : <CustomButton href="#" variant="shadow" onClick={logout}>Logout</CustomButton>
        }
      </div>
    </div>
  );
};

export default Navbar;
