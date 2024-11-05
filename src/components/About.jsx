import React from "react";
import styles from "../styles/about.module.scss";
import banner4 from "../assets/img/banners/banner-4.jpeg";
import banner5 from "../assets/img/banners/banner-5.jpeg";

const About = () => {
  return (
    <main className={styles.main}>
      <section className={styles.sobreMi}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.cardFront}>
              <img src={banner4} alt="Sobre mí" />
            </div>
            <div className={styles.cardBack}>
              <h2>Sobre mí</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corrupti cumque repellat praesentium provident expedita
                temporibus! Ut at corrupti ullam neque modi ipsa. Odio ea totam
                nulla repellat magnam voluptate veritatis cumque fuga ipsum
                dolorem assumenda repellendus, tenetur quo, iure alias
                recusandae cum natus! Commodi ipsum eveniet error quod vitae
                tenetur..
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.cardFront}>
              <img src={banner5} alt="Chromáti.ca" />
            </div>
            <div className={styles.cardBack}>
              <h2>Chromáti.ca</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore ullam placeat repellat accusamus voluptate impedit, aut
                sequi voluptatibus officia minus, corrupti, nam odit
                necessitatibus aliquid doloribus unde tempora illum maiores quae
                a! Commodi, sunt quibusdam itaque quia fugiat repudiandae ipsa
                alias. Quisquam eaque minima quas, laudantium voluptatum libero
                vel voluptas!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
