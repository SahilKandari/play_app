"use client"
import React from 'react'
import { useState } from 'react';
import styles from './signupPage.module.css'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { apiError } from '@/components/api/ApiError';
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Client Side Signup Logic
    if (
      [username, email, fullName, password, confirmPassword].some((field) => field?.trim() === "")
    ) {
      toast.error('All fields are required');
    }

    if (password.trim() !== confirmPassword.trim()) {
      toast.error('Password does not match'); 
      return;
    } 

    const data = {
      username, 
      email, 
      fullname: fullName, 
      password, 
      avatar: avatarImage,
      coverImage
    } 

    setIsLoading(true);
    
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then((res) => {
      console.log(res,'res');
      toast.success(res.message);
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
        <h2 className={styles.title}>Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_input}  required/>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.text_input}  required/>
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.text_input} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.text_input} required/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.text_input} required/>
        <div className={styles.file_container}>
          <label className={styles.file_label}>Avatar Image</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatarImage(e.target.files[0])} className={styles.file_input} />
        </div>
        <div className={styles.file_container}>
          <label className={styles.file_label}>Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className={styles.file_input} />
        </div>
        <button type="submit" className={isLoading ? `${styles.button} ${styles.disabled}` : `${styles.button}`}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
