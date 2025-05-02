import React from "react";
import styles from "./IconCard.module.css";


interface IconCardProps {
  icon: React.ReactNode; 
  title: string;
  text: string;
  url: string;
}

const IconCard: React.FC<IconCardProps> = ({ icon, title, text, url }) => {
  return (
    <section className={styles.activitieCardContainer}>
      <header className={styles.activitieHeader}>
        {icon}
        <h1 className={styles.activitieTitle}>{title}</h1>
      </header>
      <div className={styles.activitieBody}>
        <p className={styles.activitieText}>{text}</p>
      </div>
      <footer className={styles.activitieFooter}>
        <a href={url} className={styles.activitieAcessURL}>
          Acessar
        </a>
      </footer>
    </section>
  );
};

export default IconCard;
