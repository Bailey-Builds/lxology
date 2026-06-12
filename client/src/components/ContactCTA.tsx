export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-[#26006B] to-[#1a0047]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Build Better Learning Experiences?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's explore how LXOLOGY can help your organization elevate learning and enhance performance.
        </p>
        <button className="bg-[#FD6A02] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl">
          Start a Conversation
        </button>
        <p className="text-gray-300 mt-8">
          Or reach out directly at <a href="mailto:hello@lxology.com" className="text-[#FD6A02] hover:underline">hello@lxology.com</a>
        </p>
      </div>
    </section>
  );
}
