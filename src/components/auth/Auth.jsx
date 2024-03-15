'use client'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { authState, userState } from '../state/atoms/State';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Auth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

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

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/current-user` ,{ withCredentials: true })
    .then((res) => {
      console.log(res.data.data);
      setUser(res.data.data);
    })
    .catch((err) => {
      apiError(err)
    });
  }, []);
}

export default Auth