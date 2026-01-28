import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import Footer from '../components/Footer';
import './globals.css';

export default function Home() {
  return (
    <div className="app">
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
