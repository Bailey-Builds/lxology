export default function ContactCTA() {
  return (
    <section id="contact" className="pt-20 md:pt-28" style={{ backgroundColor: '#26006B' }}>
      <div className="max-w-6xl mx-auto px-8 text-center pb-20 md:pb-28">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Ready to Elevate Learning and Performance?
        </h2>
        <a
          href="mailto:info@lxology.com"
          className="inline-block bg-[#FD6A02] text-white px-10 py-4 font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-lg"
          style={{ borderRadius: '4px' }}
        >
          Contact Us
        </a>
      </div>
      <div className="border-t border-white" />
    </section>
  );
}
