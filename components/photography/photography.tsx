import React from 'react'
import Styles from '@/components/photography/photography.module.css'
const photography = () => {
  return (
    <div>
      <section className={Styles.hero}>
        <div className={Styles.hero_img}>
            <img src='/hero1.jpg' ></img>
        </div>
        <p>
          [ Future Moves in frames ]
        </p>
        <p>Experiment 457 by Venkat Sai Kondra</p>
      </section>
    </div>
  )
}

export default photography
