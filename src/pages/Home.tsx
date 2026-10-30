import Hero from '../components/home/Hero';
import ListVsEvidence from '../components/home/ListVsEvidence';
import HowItWorks from '../components/home/HowItWorks';
import SignalLibrary from '../components/home/SignalLibrary';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ListVsEvidence />
      <HowItWorks />
      <SignalLibrary />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
