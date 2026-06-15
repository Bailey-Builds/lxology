import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ThreeWaysWeHelp from '@/components/ThreeWaysWeHelp';
import FeaturedOfferings from '@/components/FeaturedOfferings';
import TopicRequest from '@/components/TopicRequest';
import WhyLxology from '@/components/WhyLxology';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <ThreeWaysWeHelp />
        <FeaturedOfferings />
        <TopicRequest />
        <WhyLxology />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
