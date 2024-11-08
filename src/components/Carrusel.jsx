import React, { useEffect, useState } from "react";
import styles from "../styles/carousel.module.scss";
import image1 from "../assets/img/banners/banner_n_1.png";
import image2 from "../assets/img/banners/banner_n_2.png";
import image3 from "../assets/img/banners/banner_n_3.png";

const Carousel = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (!isPaused && !loading) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, images.length, isPaused, loading]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando carrusel...</p>
      </div>
    );
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`${styles.slide} ${
            currentIndex === index ? styles.active : styles.inactive
          }`}
        />
      ))}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={
              currentIndex === index
                ? `${styles.dot} ${styles.active}`
                : styles.dot
            }
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
