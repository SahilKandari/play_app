"use client"
import React, { useState } from "react";
import styles from "./sidenav.module.css";
import SidenavButton from "../sidnavButton/SidenavButton";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { sideNavState } from "@/components/state/atoms/State";

const Sidenav = () => {
  const isOpen = useRecoilValue(sideNavState);
  return (
    <div className={isOpen ? `${styles.container} ${styles.container_open}` : `${styles.container} ${styles.container_close}`}>
      <div className={styles.upperdeck}>
        <SidenavButton isOpen={isOpen}>
          <Image src="/home-icon.png" alt="home" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Home</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/like-icon.png" alt="like" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Liked Videos</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/history-icon.png" alt="history" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>History</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/video-icon.png" alt="content" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>My Content</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/collection-icon.png" alt="collection" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Collection</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/subscribers-icon.png" alt="subcribers" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Subscribers</span>
        </SidenavButton>
      </div>
      <div className={styles.lowerdeck}>
        <SidenavButton isOpen={isOpen}>
          <Image src="/support-icon.png" alt="subcribers" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Support</span>
        </SidenavButton>
        <SidenavButton isOpen={isOpen}>
          <Image src="/settings-icon.png" alt="subcribers" width={24} height={24} />
          <span className={isOpen ? styles.buttonText : styles.buttonHide}>Settings</span>
        </SidenavButton>
      </div>
    </div>
  );
};

export default Sidenav;
