/*"use client"
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const explosionContainerRef = useRef<HTMLDivElement>(null)
  
  // Define how many images will "explode" and their paths
  const imageParticleCount = 12
  const imagePaths = Array.from({ length: imageParticleCount }, (_, i) => `/footer${(i % 5) + 1}.jpg`)

  useLayoutEffect(() => {
    const container = explosionContainerRef.current
    const footer = footerRef.current
    if (!container || !footer) return

    // gsap.context handles cleanup of all ScrollTriggers and timelines automatically
    let ctx = gsap.context(() => {
      
      // 1. Setup: Clear existing and create new image particles
      container.innerHTML = '' 
      const particles: HTMLImageElement[] = imagePaths.map((path) => {
        const img = document.createElement("img")
        img.src = path
        img.className = styles.particleImg
        // Initialize state: Hidden and centered
        gsap.set(img, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 })
        container.appendChild(img)
        return img
      })

      // 2. Timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%", 
          toggleActions: "restart none none none", 
          invalidateOnRefresh: true,
        }
      })

      particles.forEach((particle) => {
        // Randomize physics for the explosion
        const xDist = (Math.random() - 0.5) * 800 
        const yDist = -200 - Math.random() * 300
        const rotation = (Math.random() - 0.5) * 720

        // Phase A: The Burst Out
        tl.to(particle, {
          opacity: 1,
          x: xDist,
          y: yDist,
          rotation: rotation,
          duration: 1,
          ease: "expo.out",
          overwrite: "auto", 
        }, 0)

        // Phase B: The Gravity Drop
        tl.to(particle, {
          y: "+=600",
          opacity: 0,
          duration: 1.2,
          ease: "power1.in",
        }, 0.5) // Starts mid-way through the burst
      })
    }, footerRef) 

    return () => ctx.revert() 
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
      {/* Container where images are injected *//*}
      <div className={styles.explosionContainer} ref={explosionContainerRef}></div>

      <div className={styles.footerContent}>
        <div className={styles.mainSection}>
          <h1 className={styles.title}>
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
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";
import styles from './footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const explosionContainerRef = useRef<HTMLDivElement>(null)
  
  const imageParticleCount = 12
  const imagePaths = Array.from({ length: imageParticleCount }, (_, i) => `/footer${(i % 5) + 1}.jpg`)

  useLayoutEffect(() => {
    const container = explosionContainerRef.current
    const footer = footerRef.current
    if (!container || !footer) return

    let ctx = gsap.context(() => {
      container.innerHTML = '' 
      const particles: HTMLImageElement[] = imagePaths.map((path) => {
        const img = document.createElement("img")
        img.src = path
        img.className = styles.particleImg
        gsap.set(img, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 })
        container.appendChild(img)
        return img
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%", 
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
          overwrite: "auto", 
        }, 0)

        tl.to(particle, {
          y: "+=600",
          opacity: 0,
          duration: 1.2,
          ease: "power1.in",
        }, 0.5) 
      })
    }, footerRef) 

    return () => ctx.revert() 
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.explosionContainer} ref={explosionContainerRef}></div>

      <div className={styles.footerContent}>
        {/* --- Contact Section (From Image) --- */}
        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Contact Me</h2>
            <div className={styles.infoItem}>
              <FaPaperPlane className={styles.icon} />
              <span>contact@example.com</span>
            </div>
            <div className={styles.infoItem}>
              <FaPhoneAlt className={styles.icon} />
              <span>0123456789</span>
            </div>
            <div className={styles.socialIcons}>
              <FaFacebookF /> <FaTwitter /> <FaInstagram /> <FaLinkedinIn />
            </div>
            <button className={styles.cvButton}>Download CV</button>
          </div>

          <form className={styles.contactForm}>
            <input type="text" placeholder="Your Name" className={styles.inputField} />
            <input type="email" placeholder="Your Email" className={styles.inputField} />
            <textarea placeholder="Your Message" className={styles.textArea}></textarea>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>

        {/* --- Branding Section (From Code) --- */}
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
            </div>
          </div>
          <div className={styles.linkSection}>
            <h3>Social</h3>
            <div className={styles.links}>
              <a href="https://github.com">GitHub</a>
              <a href="https://linkedin.com">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copy}>&copy; 2026 PORTFOLIO — BUILT WITH NEXT.JS AND GSAP</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer