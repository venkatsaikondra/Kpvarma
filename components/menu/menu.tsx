"use client"
import React, { useState, useRef, useEffect } from 'react'
import Styles from './menu.module.css'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const menuLinks = [
    { path: '/', label: "Home" },
    { path: '/about', label: "About" },
    { path: '/education', label: "Education" },
    { path: '/experience', label: "Experience" },
    { path: '/projects', label: "Projects" },
    { path: '/photography', label: "Photography" },
]

const Menu = () => {
    const container = useRef<HTMLDivElement>(null);
    const menuBar = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // 1. Ref typed correctly
    const tl = useRef<gsap.core.Timeline | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(() => {
        const showAnim = gsap.from(menuBar.current, { 
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out"
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === 1 ? showAnim.reverse() : showAnim.play();
            }
        });
    }, { scope: container });

    useGSAP(() => {
        gsap.set(`.${Styles.menu_link_item_holder}`, { y: "100%" });
        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to(`.${Styles.menu_overlay}`, {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(`.${Styles.menu_link_item_holder}`, {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: -0.75,
            });
    }, { scope: container });

    // 2. Safely accessing the ref with optional chaining
    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);

    return (
        <div className={Styles.menu_container} ref={container}>
            <div className={Styles.menu_bar} ref={menuBar}>
                <div className={Styles.menu_logo}>
                    <Link href="/"><h1>KPVARMA</h1></Link>
                </div>
                <div className={Styles.menu_open} onClick={toggleMenu}>
                    <p>MENU</p>
                </div>
            </div>

            <div className={Styles.menu_overlay}>
                <div className={Styles.menu_overlay_bar}>
                    <div className={Styles.menu_logo}>
                        <h1>KPVARMA</h1>
                    </div>
                    <div className={Styles.menu_close} onClick={toggleMenu}>
                        <p>CLOSE</p>
                    </div>
                </div>

                <div className={Styles.menu_copy}>
                    <div className={Styles.menu_links}>
                        {menuLinks.map((link, index) => (
                            <div className={Styles.menu_link_item} key={index}>
                                <div className={Styles.menu_link_item_holder}>
                                    <Link href={link.path} className={Styles.menu_link} onClick={toggleMenu}>
                                        {link.label}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={Styles.menu_info}>
                        <div className={Styles.menu_info_col}>
                            <a href="#">X &#8599;</a>
                            <a href="#">Instagram &#8599;</a>
                            <a href="#">LinkedIn &#8599;</a>
                        </div>
                        <div className={Styles.menu_info_col}>
                            <p>info@venkat.com</p>
                            <p>+91 123 456 7890</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;