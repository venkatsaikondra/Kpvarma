"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const explosionContainerRef = useRef<HTMLDivElement>(null)
  
  // Ensure these paths match your /public folder exactly
  const imageParticleCount = 12
  const imagePaths = Array.from({ length: imageParticleCount }, (_, i) => `/footer${(i % 5) + 1}.jpg`)

  useEffect(() => {
    const container = explosionContainerRef.current
    const footer = footerRef.current
    if (!container || !footer) return

    // 1. Clear container and Create particles
    container.innerHTML = '' 
    const particles: HTMLImageElement[] = imagePaths.map((path) => {
      const img = document.createElement("img")
      img.src = path
      img.className = styles.particleImg
      // Start hidden and centered
      gsap.set(img, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 })
      container.appendChild(img)
      return img
    })

    // 2. GSAP Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%", 
        toggleActions: "play none none none",
        once: true,
      }
    })

    particles.forEach((particle) => {
      // Randomize direction: wide X spread, upward Y burst
      const xDist = (Math.random() - 0.5) * 1000 
      const yDist = -300 - Math.random() * 400
      const rotation = (Math.random() - 0.5) * 720

      // The Explosion Burst
      tl.to(particle, {
        opacity: 1,
        x: xDist,
        y: yDist,
        rotation: rotation,
        duration: 1.2,
        ease: "expo.out",
        force3D: true
      }, 0) // All start at time 0

      // The Gravity Fall
      tl.to(particle, {
        y: "+=800",
        opacity: 0,
        duration: 1.5,
        ease: "power1.in",
      }, 0.4) // Starts falling shortly after burst
    })

    return () => {
      if (ScrollTrigger.getById("footerTrigger")) {
        ScrollTrigger.getById("footerTrigger").kill()
      }
    }
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
      {/* Container is now absolute and centered */}
      <div className={styles.explosionContainer} ref={explosionContainerRef}></div>

      <div className={styles.footerContent}>
        <div className={styles.mainSection}>
          <h1 className={styles.title}>THE FUTURE<br/>IS DIGITAL</h1>
          <p className={styles.tagline}>Merging aesthetics with high-performance code.</p>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkSection}>
            <h3>Explore</h3>
            <div className={styles.links}>
              <a href="#home">Home</a>
              <a href="#portfolio">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className={styles.linkSection}>
            <h3>Services</h3>
            <div className={styles.links}>
              <a href="#web">Web Dev</a>
              <a href="#ui">UI Design</a>
              <a href="#seo">Optimization</a>
            </div>
          </div>

          <div className={styles.linkSection}>
            <h3>Social</h3>
            <div className={styles.links}>
              <a href="https://github.com">GitHub</a>
              <a href="https://linkedin.com">LinkedIn</a>
              <a href="https://twitter.com">Twitter</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copy}>&copy; 2026 PORTFOLIO — BUILT WITH NEXT.JS</p>
          <div className={styles.legal}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer