"use client"
import {ReactLenis} from '@studio-freight/react-lenis';
import ParallexImage from '@/components/parallax/paralleximage';
import React from 'react'
import Styles from '@/components/parallax/parallax.module.css'
const parallax = () => {
  return (
    <div className={Styles.app}>
      <section className={Styles.hero}>
        <div className={Styles.img}>
            <ParallexImage src="/potrait1.jpg" alt="" />
        </div>
      </section>
      <section className={Styles.projects}>
         <div className={Styles.img}>
            <ParallexImage src="/potrait2.jpg" alt="" />
        </div>
        <div className={Styles.projects_brief}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum ea dolore praesentium asperiores ducimus, sed, quos dolorem blanditiis ipsam aliquam voluptatem ullam a, sint quod!.
            </p>
        </div>
        <div className={Styles.col_projects_cover}>
            <div className={Styles.img}>
                <ParallexImage src="/potrait3.jpg" alt="" />
            </div>
        </div>
        <div className={Styles.col_projects_list}>
            <div className={Styles.project}>
                <h1>Sunrise</h1>
                <p>Apple music/ Spotify/ Youtube</p>
            </div>
            <div className={Styles.project}>
                <h1>Echoes Within</h1>
                <p>Apple music/ Spotify/ Youtube</p>
            </div>
            <div className={Styles.project}>
                <h1>Fading Memories</h1>
                <p>Apple music/ Spotify/ Youtube</p>
            </div>
            <div className={Styles.project}>
                <h1>Shadow's Edge</h1>
                <p>Apple music/ Spotify/ Youtube</p>
            </div>
        </div>
      </section>
      <section className={Styles.about}>
        <div className={Styles.col_intro}>
            <p>Introduction</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas blanditiis perspiciatis nihil facere quo optio temporibus cum similique. Vitae ipsum, harum nostrum nobis alias delectus porro! Quod maxime libero odio?</p>
        </div>
        <div className='Styles.col_portrait'>
            <div className='Styles.portrait_container'>
                <div className='Styles.img'>
                    <ParallexImage src="/potrait4.jpg" alt="" />
                </div>
            </div>
        </div>
      </section>
      <section className={Styles.banner}>
        <div className={Styles.img}>
            <ParallexImage src="/potrait5.jpg" alt="" />
        </div>
        <div className={Styles.banner_copy}>
            <p>Be the</p>
            <h1>First to know</h1>
            <p>
                Want to hear the latest news on my upcoming music releases , touring and march?
            </p>
            <button>Join the newsletter</button>
        </div>
      </section>
    </div>
  )
}

export default parallax
