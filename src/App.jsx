import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dialer from './components/Dialer';
import Analytics from './components/Analytics';
import HowItWorks from './components/HowItWorks';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Dialer />
        <Analytics />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
