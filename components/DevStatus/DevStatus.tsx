import styles from './DevStatus.module.css';
import GlitchText from '@/components/GlitchText/GlitchText';


export default function DevStatus() {
  return (
    <section className={styles.section}>
      <h2>Development Status</h2>
      <ul>
        <li>Pre-alpha</li>
        <li><GlitchText text="bsjbj5ukeg2h2om9h5re1w" /></li>
        <li><GlitchText text="bsjbj5ukeg2h2om9h5re1w" /></li>
      </ul>
    </section>
  );
}