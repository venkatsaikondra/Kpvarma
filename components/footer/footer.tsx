/*"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const explosionContainerRef = useRef<HTMLDivElement>(null)
  
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
      // Start hidden and centered at the trigger point
      gsap.set(img, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 })
      container.appendChild(img)
      return img
    })

    // 2. Create the Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%", 
        // "restart" ensures the animation starts over every time you scroll down
        toggleActions: "restart none none none", 
        once: false, 
      }
    })

    particles.forEach((particle) => {
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
      }, 0)

      // The Gravity Fall
      tl.to(particle, {
        y: "+=800",
        opacity: 0,
        duration: 1.5,
        ease: "power1.in",
      }, 0.4) 
    })

    // Cleanup: Kill the ScrollTrigger and the timeline on unmount
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.explosionContainer} ref={explosionContainerRef}></div>

      <div className={styles.footerContent}>
        <div className={styles.mainSection}>
          <h1 className={styles.title} style={{ cursor: 'pointer' }}>
            THE FUTURE<br/>IS DIGITAL
          </h1>
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
          <p className={styles.copy}>&copy; 2026 PORTFOLIO — BUILT WITH NEXT.JS AND GSAP</p>
          <div className={styles.legal}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer*/

"use client"
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const explosionContainerRef = useRef<HTMLDivElement>(null)
  
  const imageParticleCount = 12
  const imagePaths = Array.from({ length: imageParticleCount }, (_, i) => `/footer${(i % 5) + 1}.jpg`)

  // useLayoutEffect prevents flickering before the paint
  useLayoutEffect(() => {
    const container = explosionContainerRef.current
    const footer = footerRef.current
    if (!container || !footer) return

    // Create a GSAP context to manage memory and cleanup
    let ctx = gsap.context(() => {
      // 1. Clear and Create particles
      container.innerHTML = '' 
      const particles: HTMLImageElement[] = imagePaths.map((path) => {
        const img = document.createElement("img")
        img.src = path
        img.className = styles.particleImg
        gsap.set(img, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 })
        container.appendChild(img)
        return img
      })

      // 2. Create the Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%", 
          // Use "play" instead of "restart" if you want it to trigger once 
          // OR keep "restart" but ensure overwrite is active
          toggleActions: "restart none none none", 
          invalidateOnRefresh: true,
        }
      })

      particles.forEach((particle) => {
        const xDist = (Math.random() - 0.5) * 800 
        const yDist = -200 - Math.random() * 300
        const rotation = (Math.random() - 0.5) * 720

        tl.to(particle, {
          opacity: 1,
          x: xDist,
          y: yDist,
          rotation: rotation,
          duration: 1,
          ease: "expo.out",
          // Overwrite ensures that if a new animation starts, the old one stops
          overwrite: "auto", 
        }, 0)

        tl.to(particle, {
          y: "+=600",
          opacity: 0,
          duration: 1.2,
          ease: "power1.in",
        }, 0.5) 
      })
    }, footerRef) // Scope the context to the footer

    return () => ctx.revert() // This kills all animations and ScrollTriggers safely
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.explosionContainer} ref={explosionContainerRef}></div>

      <div className={styles.footerContent}>
        <div className={styles.mainSection}>
          <h1 className={styles.title} style={{ cursor: 'pointer' }}>
            THE FUTURE<br/>IS DIGITAL
          </h1>
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
          <p className={styles.copy}>&copy; 2026 PORTFOLIO — BUILT WITH NEXT.JS AND GSAP</p>
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