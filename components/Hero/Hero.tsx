import styles from './Hero.module.css';


export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        <h1 className={styles.title}>MMORPG</h1>


        <p className={styles.tagline}>
          A persistent online world built for long-term progression.
        </p>


        <div className={styles.actions}>
          <a href="#news" className={styles.primary}>
            News
          </a>
          <a href="#newsletter" className={styles.secondary}>
            Get Updates
          </a>
        </div>
      </div>
    </section>
  );
}