"use client"
import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { ReactLenis } from "lenis/react"
import AnimatedCopy from '@/components/text/AnimatedCopy';
import Styles from '@/components/text/text.module.css'

const TextPage = () => {
    const lenisRef = useRef();
    
    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }
        gsap.ticker.add(update);
        return () => gsap.ticker.remove(update);
    }, []);

    return (
        <div className={Styles.container}>
            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
            
            <section className={`${Styles.section} ${Styles.hero}`}>
                <img src="/potrait7.jpg" alt="Hero" />
            </section>

            <section className={`${Styles.section} ${Styles.about}`}>
                <div className={Styles.header}>
                    <h1 className={Styles.heading_main}>A new chapter of engineering system</h1>
                </div>
                <div className={Styles.copy}>
                    <AnimatedCopy>
                        <p className={Styles.paragraph}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                        </p>
                    </AnimatedCopy>
                </div>
            </section>

            <section className={`${Styles.section} ${Styles.banner_img}`}>
                <img className={Styles.text2} src="/text2.jpg" alt="Banner" />
            </section>

            <section className={`${Styles.section} ${Styles.services}`}>
                {/* Example of one service block - Repeat for others */}
                <div className={Styles.service}>
                    <div className={Styles.col}>
                        <div className={Styles.service_copy}>
                            <h3 className={Styles.heading_sub}>Precision Engineering</h3>
                            <AnimatedCopy>
                                <p className={Styles.paragraph}>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                                </p>
                            </AnimatedCopy>
                        </div>
                    </div>
                    <div className={Styles.col}>
                        <img src="/text3.jpg" alt="Service" />
                    </div>
                </div>
                {/* ... other services follow same pattern ... */}
            </section>

            <section className={`${Styles.section} ${Styles.outro}`}>
                <h3 className={Styles.heading_main}>Innovation has no finish line</h3>
            </section>
        </div>
    )
}

export default TextPage;