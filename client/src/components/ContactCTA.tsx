export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-[#26006B] to-[#1a0047]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Ready to Elevate Learning and Performance?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@lxology.com"
            className="inline-block bg-[#FD6A02] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
          <a
            href="#products"
            className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#26006B] transition-all duration-200"
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
}
