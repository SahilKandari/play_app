"use client"
import React from 'react'
import { useState } from 'react';
import styles from './loginPage.module.css'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { apiError } from '@/components/api/ApiError';
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Client Side Signup Logic

    if (!username && !email) {
      toast.error('Username or Email is required');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    const data = {
      username, 
      email, 
      password, 
    } 

    setIsLoading(true);

    console.log(data);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, data, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res,'res');
      toast.success(res.data.message);
      router.push('/');
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      apiError(err);
      setIsLoading(false);
    })
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_input}  />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.text_input}  />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.text_input} required/>
        <button type="submit" className={isLoading ? `${styles.button} ${styles.disabled}` : `${styles.button}`}>Login</button>
      </form>
    </div>
  );
};

export default Login;
