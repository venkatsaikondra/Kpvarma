import Image from "next/image";
import styles from "./about.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>

        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <h2>ABOUT ME</h2>

          <p className={styles.description}>
            I lead the Executive Development Center at Sukkur IBA University,
            leading projects with global partners like USAID, UNDP, UNICEF,
            and the EU. With 15,000+ lives impacted, my work drives
            entrepreneurship, climate action, youth empowerment, and rural
            development — recognized by the UN for its impact.
          </p>

          <div className={styles.metric}>
            <span className={styles.icon}>🌍</span>
            <div>
              <strong>25+</strong>
              <p>
                Collaborated with 20+ international partners, with 4
                partnerships involving UN affiliated and globally recognized
                organizations.
              </p>
            </div>
          </div>

          <div className={styles.arrow}>↗</div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          <div className={styles.imageLarge}>
            <Image
              src="/about-1.jpg"
              alt="Leadership"
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.imageSmall}>
            <Image
              src="/about-2.jpg"
              alt="Collaboration"
              fill
              className={styles.image}
            />
          </div>

          <ul className={styles.points}>
            <li>
              <strong>Transformative Leadership</strong> — Guided AACSB-accredited
              universities to become catalysts for community empowerment and
              innovation.
            </li>

            <li>
              <strong>Bridge Builder & Connector</strong> — Built impactful
              networks by fostering partnerships with USAID, UNDP, UNICEF, and
              global universities.
            </li>

            <li>
              <strong>Future-Forward Visionary</strong> — Pioneered green
              entrepreneurship programs that align business success with
              environmental responsibility.
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
