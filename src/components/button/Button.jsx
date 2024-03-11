import React from 'react';
import styles from './button.module.css'; 
import Link from 'next/link';

const CustomButton = ({ children, onClick, variant, href }) => {
  // Determine the variant style based on the prop passed
  const buttonStyle = variant === 'shadow' ? styles.shadow : styles.icon;

  return (
    <Link className={`${styles.button} ${buttonStyle}`} onClick={onClick} href={href}>
      {children}
    </Link>
  );
};

export default CustomButton;