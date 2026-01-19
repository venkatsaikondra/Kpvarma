"use client"
import { useGSAP } from "@gsap/react"
import Styles from '@/hooks/useRevealer.module.css'
import gsap from "gsap"
import CustomEase from "gsap/dist/CustomEase"

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

export function useRevealer() {
    useGSAP(() => {
        const tl = gsap.timeline();

        // Target the specific class names from CSS Modules
        tl.to(`.${Styles.revealer}`, {
            scaleY: 0,
            duration: 1.25,
            delay: 0.8, // Slightly reduced delay for snappier feel
            ease: "hop",
            onComplete: () => {
                // Completely remove from layout so it doesn't block interactions
                gsap.set(`.${Styles.revealer}`, { display: "none" });
            }
        });
        
        tl.to(`.${Styles.revealer_text}`, {
            y: -40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
        }, "-=0.2"); // Start slightly before the scale finishes
        
    }, {});
}