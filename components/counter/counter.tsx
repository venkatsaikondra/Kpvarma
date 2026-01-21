"use client"
import React, { useLayoutEffect, useRef } from 'react'
import Styles from './counter.module.css'
import gsap from 'gsap'

interface CounterProps {
  onComplete?: () => void;
}

const Counter = ({ onComplete }: CounterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const counterElement = document.querySelector(`.${Styles.counter}`);
      let currentValue = 0;

      // 1. Digital Counter Logic
      function updateCounter() {
        if (currentValue >= 100) {
          currentValue = 100;
          if (counterElement) counterElement.textContent = "100";
          return;
        }
        currentValue += Math.floor(Math.random() * 10) + 1;
        if (currentValue > 100) currentValue = 100;
        if (counterElement) counterElement.textContent = String(currentValue);
        setTimeout(updateCounter, Math.floor(Math.random() * 200) + 50);
      }
      updateCounter();

      // 2. Reveal Animation Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete(); // This tells the parent/hero to start
        }
      });

      tl.to(`.${Styles.counter}`, { 
          opacity: 0, 
          duration: 0.25, 
          delay: 3.5 
        })
        .to(`.${Styles.bar}`, {
          height: 0,
          duration: 1.5,
          stagger: { amount: 0.5 },
          ease: "power4.inOut",
        })
        .set(`.${Styles.overlay}`, { display: "none" }); // Remove overlay entirely
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef}>
      <h1 className={Styles.counter}>0</h1>
      <div className={Styles.overlay}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={Styles.bar}></div>
        ))}
      </div>
    </div>
  )
}

export default Counter;