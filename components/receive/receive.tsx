"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./receive.module.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Receive() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "words",
      wordsClass: styles.word,
    });

    const tl = gsap.from(split.words, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reset",
      },
    });

    return () => {
      split.revert();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className={styles.receive} ref={sectionRef}>
      <h2 ref={textRef}>
        WHAT I HAVE <br />
        RECEIVED IN THIS <br />
        JOURNEY
      </h2>
    </section>
  );
}
