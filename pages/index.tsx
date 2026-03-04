import Header from '@/components/Header/Header';
import RulerTimeline from '@/components/Timeline/RulerTimeline';
import { timeline } from '@/data/timeline';

import Hero from '@/components/Hero/Hero';
import GameOverview from '@/components/GameOverview/GameOverview';
import Features from '@/components/Features/Features';
import DevStatus from '@/components/DevStatus/DevStatus';
import CTA from '@/components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Header title="Unknown MMO" />

      <RulerTimeline />;

      <section id="hero">
        <Hero />
      </section>


      <section id="overview">
        <GameOverview />
      </section>


      <section id="features">
        <Features />
      </section>


      <section id="dev-status">
        <DevStatus />
      </section>


      <section id="cta">
        <CTA />
      </section>
    </>
  );
}