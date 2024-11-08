import React, { useEffect } from "react";
import styles from "../styles/tiktok.module.scss";

const TikTok = () => {
  useEffect(() => {
    // Cargar el script de incrustación de TikTok después de que el componente esté montado
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Remover el script al desmontar el componente si es necesario
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.tiktok}>
      <div className={styles["titulo-tiktok"]}>
        <h2 className={styles["tiktok-titulo"]}>TikTok</h2>
      </div>
      <div className={styles["caja-tiktok"]}>
        <article className={styles.tt1}>
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@chromati.ca/video/7347371493220764934"
            data-video-id="7347371493220764934"
            style={{ maxWidth: "605px", minWidth: "325px" }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="@chromati.ca"
                href="https://www.tiktok.com/@chromati.ca?refer=embed"
              >
                @chromati.ca
              </a>
              Acrílico con hoja de oro sobre espejo ✨🎨 Por cierto, es el
              espejo más grande que he pintado 👀
              <a
                title="mirrorselfie"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/tag/mirrorselfie?refer=embed"
              >
                #mirrorselfie
              </a>
            </section>
          </blockquote>
        </article>

        <article className={styles.tt2}>
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@chromati.ca/video/7155540620923260165"
            data-video-id="7155540620923260165"
            style={{ maxWidth: "605px", minWidth: "325px" }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="@chromati.ca"
                href="https://www.tiktok.com/@chromati.ca?refer=embed"
              >
                @chromati.ca
              </a>
              Room/Studio tour ✨
              <a
                title="roomtour"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/tag/roomtour?refer=embed"
              >
                #roomtour
              </a>
            </section>
          </blockquote>
        </article>

        <article className={styles.tt3}>
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@chromati.ca/video/7354858723140963589"
            data-video-id="7354858723140963589"
            style={{ maxWidth: "605px", minWidth: "325px" }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="@chromati.ca"
                href="https://www.tiktok.com/@chromati.ca?refer=embed"
              >
                @chromati.ca
              </a>
              I hope you guys enjoy the process as much as I do! 🥰✨
              <a
                title="handmade"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/tag/handmade?refer=embed"
              >
                #handmade
              </a>
            </section>
          </blockquote>
        </article>
      </div>
    </div>
  );
};

export default TikTok;
