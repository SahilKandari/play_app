import React from 'react';
import styles from './sidenavButton.module.css'; 

const SidenavButton = ({ children, onClick, isOpen }) => {
  const buttonClassName = isOpen ? `${styles.button} ${styles.button_open}` : `${styles.button} ${styles.button_close}`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default SidenavButton;
