"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from "@/components/projects/project.module.css";

gsap.registerPlugin(ScrollTrigger);

// FIXED: Added inline style for backgroundColor so the cards are not transparent
const Card = ({ title, copy, index, color }) => (
  <div className={styles.card} id={`card-${index + 1}`} data-card={index + 1}>
    <div 
      className={styles.card_inner} 
      style={{ backgroundColor: color }} // <-- THIS FIXES THE VISUAL BUG
    >
      <div className={styles.card_content}>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.card_img}>
        <Image
          src={`/card-${index + 1}.jpg`} // Ensure these images exist in /public
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
  const container = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);

  useGSAP(() => {
    if (!container.current) return;

    // Use a more robust selector for CSS modules
    const cards = gsap.utils.toArray(`.${styles.card}`);
    
    // --- Cards Stacking Animation ---
    cards.forEach((card, index) => {
      const cardInner = card.querySelector(`.${styles.card_inner}`);
      
      // We don't pin the last card because nothing comes after it to cover it
      // but we still want it to participate in the flow.
      const isLastCard = index === cards.length - 1;

      // 1. Entrance Animation (Fade in from bottom)
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Trigger slightly earlier
          toggleActions: "play none none reverse",
        },
      });

      // 2. Pinning & Stacking Logic
      if (!isLastCard && cardInner) {
        ScrollTrigger.create({
          trigger: card,
          // Start pinning when the card top hits 25% down the viewport (adjust as needed)
          start: "top 25%", 
          // Pin until the whole section is scrolled; this calculation ensures 
          // the card stays pinned while the next ones scroll over it.
          endTrigger: `.${styles.cards}`,
          end: "bottom bottom", 
          pin: true,
          pinSpacing: false, // Essential for the "stacking" effect
          scrub: true,
          
          // Optional: Add a slight scale down effect to create depth 
          // as new cards slide over
          onUpdate: (self) => {
             // As the user scrolls past this card, push it back slightly (scale down)
             // to give the illusion that the next card is sliding ON TOP.
             const progress = self.progress;
             gsap.to(cardInner, {
               scale: 1 - (progress * 0.05), // Scale down slightly
               filter: `brightness(${1 - (progress * 0.2)})`, // Darken slightly
               overwrite: true,
               ease: "power1.out"
             });
          }
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, { scope: container });

  const cards = [
    { title: "Brand Foundation", copy: "The heart of your company's story, built to resonate and endure.", color: "#e8d5ff" },
    { title: "Design Identity", copy: "Crafting visual systems that communicate with precision and elegance.", color: "#f8f9fa" },
    { title: "Digital Presence", copy: "Building engaging brand touchpoints that convert and captivate.", color: "#fff3cd" },
    { title: "Brand Strategy", copy: "Defining long-term direction with clarity and strategic foresight.", color: "#1a1a1a" },
  ];

  return (
    <ReactLenis root>
      <div className={styles.app} ref={container}>

        {/* Cards Section */}
        <section className={styles.cards}>
          {cards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </section>

        {/* Outro Section */}
        <section className={styles.outro} ref={outroRef}>
          <h2>Let&apos;s build a brand that leaves a mark.</h2>
        </section>
      </div>
    </ReactLenis>
  );
}