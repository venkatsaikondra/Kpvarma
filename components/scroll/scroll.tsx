"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react' // Optimized hook for React
import { ReactLenis } from 'lenis/react'
import Styles from '@/components/scroll/scroll.module.css'

gsap.registerPlugin(ScrollTrigger);

const ScrollComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Data for the flying effect
    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    // 2. Select rows using the scoped class name from Styles
    const rows = gsap.utils.toArray(`.${Styles.row}`);

    rows.forEach((row: any, index: number) => {
      // Look for cards within each scoped row
      const cardLeft = row.querySelector(`.${Styles.card_left}`);
      const cardRight = row.querySelector(`.${Styles.card_right}`);

      // Scrubbing card animations
      if (cardLeft && cardRight) {
        gsap.to(cardLeft, {
          x: leftXValues[index],
          y: yValues[index],
          rotation: leftRotationValues[index],
          scrollTrigger: {
            trigger: `.${Styles.main}`, // The parent section
            start: "top center",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.to(cardRight, {
          x: rightXValues[index],
          y: yValues[index],
          rotation: rightRotationValues[index],
          scrollTrigger: {
            trigger: `.${Styles.main}`,
            start: "top center",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

    // 3. Central Content Reveal
    const contentTrigger = {
      trigger: `.${Styles.main}`,
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    gsap.to(`.${Styles.logo}`, {
      scale: 1,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: contentTrigger,
    });

    gsap.to(`.${Styles.line} p`, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: contentTrigger,
    });

    gsap.to(`.${Styles.btn} button`, {
      y: 0,
      opacity: 1,
      delay: 0.4,
      scrollTrigger: contentTrigger,
    });

  }, { scope: containerRef }); // Auto-scopes all selectors to this container

  return (
    <div ref={containerRef} className={Styles.page_wrapper}>
      <ReactLenis root>
        <section className={Styles.hero}>
          <div className={Styles.img_hero}>
            <img src="/text3.jpg" alt="Hero" />
          </div>
        </section>

        <section className={Styles.main}>
          <div className={Styles.cards_bg}>
            {[1, 2, 3].map((i) => (
              <div className={Styles.row} key={i}>
                <div className={`${Styles.card} ${Styles.card_left}`}>
                  <img src={`/img-${2 * i - 1}.jpg`} alt="" />
                </div>
                <div className={`${Styles.card} ${Styles.card_right}`}>
                  <img src={`/img-${2 * i}.jpg`} alt="" />
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.main_content}>
            <div className={Styles.logo}>
              <h1>KPVARMA</h1>
            </div>
            <div className={Styles.copy}>
              <div className={Styles.line}><p>Visual Architect</p></div>
              <div className={Styles.line}><p>Frames in Motion</p></div>
              <div className={Styles.line}><p>Based in India</p></div>
            </div>
            <div className={Styles.btn}>
              <button>Explore Work</button>
            </div>
          </div>
        </section>
      </ReactLenis>
    </div>
  )
}

export default ScrollComponent;