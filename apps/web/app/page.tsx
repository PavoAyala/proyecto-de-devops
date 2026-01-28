import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
