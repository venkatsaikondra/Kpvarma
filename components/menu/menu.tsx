"use client"
import React, { useState, useRef, useEffect } from 'react'
import Styles from './menu.module.css'
import RevealerStyles from '@/hooks/useRevealer.module.css' 
import { Link } from 'next-view-transitions'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react' // Or @gsap/react
import { useRevealer } from '@/hooks/useRevealer'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

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
    useRevealer();
    
    const container = useRef(null);
    const menuBar = useRef(null);
    const revealerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef(null);
    const router = useTransitionRouter();
    const pathname = usePathname();

    function triggerPageTransition() {
        if (!document.startViewTransition) return;

        document.documentElement.animate([
            { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        ], {
            duration: 1000,
            easing: "cubic-bezier(0.9, 0, 0.1, 1)", 
            pseudoElement: "::view-transition-new(root)"
        });
    }

    const handleMenu = (path: string) => (e: React.MouseEvent) => {
        // 1. Prevent the default Link behavior so router.push can control it
        e.preventDefault();

        if (path === pathname) {
            setIsMenuOpen(false);
            return;
        }

        // 2. Close overlay immediately
        setIsMenuOpen(false);

        // 3. Trigger transition after a small delay to allow overlay to start closing
        setTimeout(() => {
            router.push(path, {
                onTransitionReady: triggerPageTransition,
            });
        }, 150);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Scroll Animation
    useGSAP(() => {
        const showAnim = gsap.from(menuBar.current, {
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out"
        }).progress(1);

        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === 1 ? showAnim.reverse() : showAnim.play();
            }
        });
    }, { scope: container });

    // Menu Overlay Timeline
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

    useEffect(() => {
        if (isMenuOpen) tl.current.play();
        else tl.current.reverse();
    }, [isMenuOpen]);

    return (
        <div className={Styles.menu_container} ref={container}>
            
            {/* The initial page revealer */}
            <div className={RevealerStyles.revealer} ref={revealerRef}>
                <h1 className={RevealerStyles.revealer_text}>KPVARMA</h1>
            </div>

            <div className={Styles.menu_bar} ref={menuBar}>
                <div className={Styles.menu_logo}>
                    <Link href="/" onClick={handleMenu('/')}><h1>KPVARMA</h1></Link>
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
                                    <Link 
                                        href={link.path} 
                                        className={Styles.menu_link} 
                                        onClick={handleMenu(link.path)}
                                    >
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

export default Menu