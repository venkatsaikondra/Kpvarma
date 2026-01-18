"use client"
import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import ParallaxImage from '@/components/parallax/paralleximage' // Ensure filename matches exactly
import Styles from './parallax.module.css'

const Parallax = () => {
  return (
    <ReactLenis root>
        <div className={Styles.app}>
            <section className={Styles.hero}>
                <ParallaxImage src="/potrait1.jpg" alt="Hero Portrait" />
            </section>

            <section className={Styles.projects}>
                <div className={Styles.col_projects_cover}>
                    <ParallaxImage src="/potrait2.jpg" alt="Project Cover" />
                </div>
                
                <div className={Styles.projects_brief}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                    </p>
                </div>

                <div className={Styles.col_projects_list}>
                    <div style={{ width: '100%', height: '300px', marginBottom: '2em', position: 'relative' }}>
                         <ParallaxImage src="/potrait3.jpg" alt="Detail" />
                    </div>

                    <div className={Styles.project}>
                        <h1>Sunrise</h1>
                        <p>Apple music / Spotify / Youtube</p>
                    </div>
                    {/* ... rest of your projects */}
                </div>
            </section>

            {/* Ensure the About section uses the correct Styles object */}
            <section className={Styles.about}>
                <div className={Styles.col_intro}>
                    <p>Introduction</p>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className={Styles.col_portrait}>
                     <ParallaxImage src="/potrait4.jpg" alt="About Portrait" />
                </div>
            </section>
        </div>
    </ReactLenis>
  )
}

export default Parallax