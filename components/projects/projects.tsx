"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from "@/components/projects/project.module.css";

gsap.registerPlugin(ScrollTrigger);

// 1. Define the Interface for Props
interface CardProps {
  title: string;
  copy: string;
  index: number;
  color: string;
}

const Card = ({ title, copy, index, color }: CardProps) => (
  <div className={styles.card} id={`card-${index + 1}`} data-card={index + 1}>
    <div 
      className={styles.card_inner} 
      style={{ backgroundColor: color }}
    >
      <div className={styles.card_content}>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.card_img}>
        <Image
          src={`/card-${index + 1}.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className={styles.cardImage}
        />
      </div>
    </div>
  </div>
);

export default function Projects() {
  // 2. Type the Refs
  const container = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
    
    cards.forEach((card, index) => {
      const cardInner = card.querySelector(`.${styles.card_inner}`) as HTMLElement;
      const isLastCard = index === cards.length - 1;

      // 1. Entrance Animation
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Pinning & Stacking Logic
      if (!isLastCard && cardInner) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 25%", 
          endTrigger: `.${styles.cards}`,
          end: "bottom bottom", 
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
             const progress = self.progress;
             gsap.to(cardInner, {
               scale: 1 - (progress * 0.05),
               filter: `brightness(${1 - (progress * 0.2)})`,
               overwrite: true,
               ease: "power1.out"
             });
          }
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, { scope: container });

  const cardData = [
    { title: "Brand Foundation", copy: "The heart of your company's story, built to resonate and endure.", color: "#e8d5ff" },
    { title: "Design Identity", copy: "Crafting visual systems that communicate with precision and elegance.", color: "#f8f9fa" },
    { title: "Digital Presence", copy: "Building engaging brand touchpoints that convert and captivate.", color: "#fff3cd" },
    { title: "Brand Strategy", copy: "Defining long-term direction with clarity and strategic foresight.", color: "#1a1a1a" },
  ];

  return (
    <ReactLenis root>
      <div className={styles.app} ref={container}>
        <section className={styles.cards}>
          {cardData.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </section>

        <section className={styles.outro} ref={outroRef}>
          <h2>Let&apos;s build a brand that leaves a mark.</h2>
        </section>
      </div>
    </ReactLenis>
  );
}