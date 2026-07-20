import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import SocialProofBar from './sections/SocialProofBar';
import WhyVixa from './sections/WhyVixa';
import LiveDemo from './sections/LiveDemo';
import HowItWorks from './sections/HowItWorks';
import TrustSecurity from './sections/TrustSecurity';
import Coverage from './sections/Coverage';
import Testimonials from './sections/Testimonials';
import Comparison from './sections/Comparison';
import CoreMessage from './sections/CoreMessage';
import FinalCta from './sections/FinalCta';
import Footer from './sections/Footer';
import ThreadPlayground from './dev/ThreadPlayground';
import { ScrollTrigger, useGSAP } from './lib/gsap';
import { setupReveals, setupCounters, setupScatter, setupParallax } from './lib/mechanics';

function App() {
  const main = useRef<HTMLElement>(null);

  // late-loading fonts/assets shift layout and desync every pin (§2)
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // shared §5 mechanics, applied via data attributes across all sections
  useGSAP(
    () => {
      if (!main.current) return;
      setupReveals(main.current);
      setupCounters(main.current);
      setupScatter(main.current);
      setupParallax(main.current);
    },
    { scope: main },
  );

  // dev playground stays reachable at ?playground (client-only; SSR skips)
  if (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('playground')
  ) {
    return <ThreadPlayground />;
  }

  return (
    <>
      <Navbar />
      <main ref={main}>
        <Hero />
        <SocialProofBar />
        <WhyVixa />
        <LiveDemo />
        <HowItWorks />
        <TrustSecurity />
        <Coverage />
        <Testimonials />
        <Comparison />
        <CoreMessage />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
