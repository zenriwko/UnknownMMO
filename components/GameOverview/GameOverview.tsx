import GlitchText from '@/components/GlitchText/GlitchText';
import styles from './GameOverview.module.css';

export default function GameOverview() {
  return (
    <section className={styles.section} id="overview">
      <h2>What kind of MMO is this?</h2>

      <ul className={styles.list}>
        <li>Unreal Engine 5</li>
        <li>PC Platform</li>
        <li>PvP Competition</li>

        <li><GlitchText text="bsjbj5ukeg2h2om9h5re1w" /></li>
        <li><GlitchText text="wf4*dzlf3hw?fu7pm?oc1" /></li>
        <li><GlitchText text="y%n4n99vx4f22@rusmz" /></li>
      </ul>
    </section>
  );
}