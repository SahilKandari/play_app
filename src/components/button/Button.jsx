import React from 'react';
import styles from './button.module.css'; 
import Link from 'next/link';

const CustomButton = ({ children, onClick, variant, href, color }) => {
  // Determine the variant style based on the prop passed
  const buttonStyle = variant === 'shadow' ? styles.shadow : styles.icon;
  return (
    <Link style={{color}} className={`${styles.button} ${buttonStyle}`} onClick={onClick} href={href}>
      {children}
    </Link>
  );
};

export default CustomButton;