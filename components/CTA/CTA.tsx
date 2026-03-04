import styles from './CTA.module.css';
import GlitchText from '@/components/GlitchText/GlitchText';

export default function CTA() {
  return (
    <section className={styles.section}>
      <h2>Follow Development</h2>
      <div className={styles.links}>
        <a href="#"><GlitchText text="bse1w" /></a>
        <a href="#"><GlitchText text="bsjbje1w" /></a>
        <a href="#"><GlitchText text="bsj5w" /></a>
      </div>
    </section>
  );
}