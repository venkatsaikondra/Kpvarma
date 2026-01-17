"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from "@/components/projects/project.module.css";

gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, copy, index }) => {
  return (
    <div className={styles.card} id={`card-${index + 1}`}>
      <div className={styles.card_inner}>
        <div className={styles.card_content}>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>

        <div className={styles.card_img}>
          <Image
            src={`/card-${index + 1}.jpg`}
            alt={title}
            width={350}
            height={350}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: `.${styles.intro}`,
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;
        const cardInner = card.querySelector(
          `.${styles.card_inner}`
        ) as HTMLElement;

        if (!isLast && cardInner) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: `.${styles.outro}`,
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - 1) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: `.${styles.outro}`,
              end: "top 65%",
              scrub: true,
            },
          });
        }
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    },
    { scope: container }
  );

  const cards = [
    {
      title: "Brand Foundation",
      copy:
        "The heart of your company's story. It shapes your vision, values, and voice.",
    },
    {
      title: "Design Identity",
      copy:
        "Crafting visual systems that communicate personality and clarity.",
    },
    {
      title: "Design Presence",
      copy:
        "Building a consistent and engaging presence across touchpoints.",
    },
    {
      title: "Brand Strategy",
      copy:
        "Defining direction and messaging that drives long-term success.",
    },
  ];

  return (
    <ReactLenis root>
      <div className={styles.app} ref={container}>
        <section className={styles.hero}>
          <Image
            src="/hero.jpg"
            alt="Hero image"
            fill
            priority
            className={styles.heroImage}
          />
        </section>

        <section className={styles.intro}>
          <h1>
            Creating standout brands for startups that bring joy and leave a
            lasting impression.
          </h1>
        </section>

        <section className={styles.cards}>
          {cards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </section>

        <section className={styles.outro}>
          <h2>Let’s build a brand that leaves a mark.</h2>
        </section>
      </div>
    </ReactLenis>
  );
}
