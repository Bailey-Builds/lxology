import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VisualTiles from '@/components/VisualTiles';
import SocialProof from '@/components/SocialProof';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

/**
 * LXOLOGY Website - Main Home Page
 * 
 * Restructured around Four Pillars:
 * 1. 🛍️ Shop - Digital products
 * 2. 🎓 Programs - Complete learning solutions
 * 3. 🤝 Services - Customization and advisory
 * 4. 📚 Resources - Thought leadership and lead generation
 * 
 * Design Philosophy: Modern Warmth with Purposeful Depth
 * - Deep purple (#26006B) as primary anchor for trust and expertise
 * - Bright orange (#FD6A02) for CTAs and action moments
 * - Soft blush pink (#F5C2D9) for warmth and approachability
 * - Generous whitespace and layered depth throughout
 * - Responsive design with mobile-first approach
 * 
 * Navigation Hub: Clean, minimal scrolling experience
 * - Four visual tiles guide visitors to their path
 * - Social proof builds credibility
 * - Contact CTA drives conversion
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <VisualTiles />
        <SocialProof />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
