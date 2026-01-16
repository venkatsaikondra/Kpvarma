import React from 'react'
import Image from 'next/image'
import styles from '@/components/first/first.module.css'
const First = () => {
  return (
    /*<div>
      <h1>Home page</h1>
    </div>*/
     <section className={styles.hero}>
      <div className={styles.inner}>

        {/* LEFT */}
        <div className={styles.left}>

          <p className={styles.intro}>Hello, Its</p>

          <h1>
            PRAVEEN <br />
            KONDRA
          </h1>

          <a href="#about" className={styles.scroll}>
            Scroll Down →
          </a>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <Image
            src="/kpvarma.jpg"
            alt="Praveen Kondra"
            width={420}
            height={520}
            priority
          />
        </div>

      </div>
    </section>
  )
}

export default First
