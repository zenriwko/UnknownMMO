import styles from './Features.module.css';
import GlitchText from '@/components/GlitchText/GlitchText';

export default function Features() {
  return (
    <section className={styles.section}>
      <h2>Core Features</h2>
      <ul className={styles.features}>
        <li><GlitchText text="bm9h5re1w" /></li>
        <li><GlitchText text="bs2om9h5re1w" /></li>
        <li><GlitchText text="bsjbj5ukeh2om9h5re1w" /></li>
        <li><GlitchText text="bsjbom9h5re1w" /></li>
      </ul>
    </section>
  );
}