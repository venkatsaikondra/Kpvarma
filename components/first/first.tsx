"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import styles from "@/components/first/first.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const First = () => {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        /* RESET INITIAL STATE */
        gsap.set(".line", { yPercent: 100 });
        gsap.set(".intro", { opacity: 0, y: 20 });
        gsap.set(".scroll", { opacity: 0, y: 20 });
        gsap.set(".image-mask-target", {
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.set(".image-scale-target", { scale: 1.3 });

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          delay: 0.2,
        });

        tl.to(".intro", {
          opacity: 1,
          y: 0,
          duration: 0.9,
        })
          .to(
            ".line",
            {
              yPercent: 0,
              duration: 1.25,
              stagger: 0.18,
            },
            "-=0.4"
          )
          .to(
            ".image-mask-target",
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.5,
              ease: "expo.inOut",
            },
            "-=1"
          )
          .to(
            ".image-scale-target",
            {
              scale: 1,
              duration: 1.5,
              ease: "expo.out",
            },
            "<"
          )
          .to(
            ".scroll",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.5"
          );
      }, container);

      return () => ctx.revert();
    },
    {
      scope: container,
      dependencies: [pathname], // replay on revisit
    }
  );

  return (
    <section ref={container} className={styles.hero}>
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.left}>
          <p className={`${styles.intro} intro`}>Hello, It&apos;s</p>

          <h1 className={styles.name}>
            <span className={styles.lineMask}>
              <span className="line">PRAVEEN</span>
            </span>
            <span className={styles.lineMask}>
              <span className="line">KONDRA</span>
            </span>
          </h1>

          <a href="#about" className={`${styles.scroll} scroll`}>
            Scroll Down ↓
          </a>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={`${styles.imageMask} image-mask-target`}>
            <Image
              src="/kpvarma.jpg"
              alt="Praveen Kondra"
              width={500}
              height={700}
              className={`${styles.imageScale} image-scale-target`}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default First;
