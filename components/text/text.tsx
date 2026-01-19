"use client"
import React from 'react'
import { useEffect,useRef } from 'react'
import gsap from "gsap";
import {ReactLenis} from "lenis/react"
import AnimatedCopy from '@/components/text/AnimatedCopy';
import Styles from '@/components/text/text.module.css'

const text = () => {
    const lenisRef=useRef();
    useEffect(()=>{
        function update(time){
            lenisRef.current?.lenis?.raf(time*1000);
        }
        gsap.ticker.add(update);
        return ()=> gsap.ticker.remove(update);
    },[]);
  return (
    <div>
        <ReactLenis root options={{autoRaf:false}} ref={lenisRef}/>
        <section className={Styles.hero}>
            <img src="/potrait7.jpg"/>
        </section>
         <section className={Styles.about}>
            <div className={Styles.header}>
                <h1>A new chapter of engineering system</h1>
            </div>
            <div className={Styles.copy}>
                <AnimatedCopy>
                    <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                </p>
                </AnimatedCopy>
                
            </div>
         </section>
          <section className={Styles.banner_img}>
            <img src="/potrait8.jpg" alt="" />
          </section>
           <section className={Styles.services}>
            <div className={Styles.service}>
                <div className={Styles.col}>
                    <div className={Styles.service_copy}>
                        <h3>Precision Engineering</h3>
                        <AnimatedCopy>
                    <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                </p>
                </AnimatedCopy>
                    </div>

                </div>
                <div className={Styles.col}>
                    <img src="/potrait9.jpg" alt="" />
                </div>
            </div>
             <div className={Styles.service}>
                <div className={Styles.col}>
                    <div className={Styles.service_copy}>
                        <h3>Precision Engineering</h3>
                        <AnimatedCopy>
                    <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                </p>
                </AnimatedCopy>
                    </div>

                </div>
                <div className={Styles.col}>
                    <img src="/potrait10.jpg" alt="" />
                </div>
            </div>
             <div className={Styles.service}>
                <div className={Styles.col}>
                    <div className={Styles.service_copy}>
                        <h3>Precision Engineering</h3>
                        <AnimatedCopy>
                    <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                </p>
                </AnimatedCopy>
                    </div>

                </div>
                <div className={Styles.col}>
                    <img src="/text1.jpg" alt="" />
                </div>
            </div>
            <div className={Styles.service}>
                <div className={Styles.col}>
                    <div className={Styles.service_copy}>
                        <h3>Precision Engineering</h3>
                       <AnimatedCopy>
                    <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident fugiat aut natus libero assumenda quaerat labore consectetur dignissimos ad reiciendis vitae iure non quod qui minus dolorum ab, aliquam optio?
                </p>
                </AnimatedCopy>
                    </div>

                </div>
                <div className={Styles.col}>
                    <img src="/text2.jpg" alt="" />
                </div>
            </div>
           </section>
            <section className={Styles.outro}>
                <h3>Innovation has no finish line</h3>
            </section>
    </div>
  )
}

export default text
