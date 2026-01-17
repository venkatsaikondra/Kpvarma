import React from 'react';
import Styles from '@/components/photography/photography.module.css';
import TrailContainer from '@/components/photography/TrailContainer';

const Photography = () => {
  return (
    <div>
      <section className={Styles.hero}>
        <div className={Styles.hero_img}>
            {/* Note: Ensure hero1.jpg exists in your /public folder */}
            <img src='/hero1.jpg' alt="Hero Background" />
        </div>
        <p>
          [ Future Moves in frames ]
        </p>
        <p>Experiment 457 by Venkat Sai Kondra</p>
        
        <TrailContainer />
      </section>
    </div>
  );
};

export default Photography;