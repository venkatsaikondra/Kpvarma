"use client"
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Styles from './parallax.module.css'

// Register plugins to ensure they work
gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt = "image" }) => {
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    useGSAP(() => {
        // The Parallax Logic
        // We move the image on the Y axis from -15% to 15% 
        // as the container moves across the viewport.
        gsap.fromTo(imgRef.current, 
            {
                y: "-15%", // Start position (pulled up)
            },
            {
                y: "15%", // End position (pushed down)
                ease: "none", // Linear movement is best for parallax
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // When container top enters viewport bottom
                    end: "bottom top", // When container bottom leaves viewport top
                    scrub: true, // Link animation progress to scrollbar
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div className={Styles.img_container} ref={containerRef}>
            <img 
                ref={imgRef} 
                src={src} 
                alt={alt} 
                className={Styles.parallax_img} 
            />
        </div>
    )
}

export default ParallaxImage