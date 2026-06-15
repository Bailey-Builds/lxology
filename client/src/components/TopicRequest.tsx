export default function TopicRequest() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F6F9FF' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div
          className="max-w-2xl mx-auto text-center bg-white p-10 border shadow-sm"
          style={{ borderColor: '#E5EAF3', borderRadius: '12px' }}
        >
          <h2 className="text-3xl font-bold text-[#26006B] mb-4">
            Need a Specific Topic?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Tell us what workplace challenge you're trying to solve. Lxology uses customer requests
            to guide future learning products, tools, and service offerings.
          </p>
          <a
            href="/contact#topic-request"
            className="inline-block bg-[#FD6A02] text-white px-8 py-3 font-semibold hover:bg-[#e55a00] transition-colors duration-200"
            style={{ borderRadius: '10px' }}
          >
            Submit a Topic Request
          </a>
        </div>
      </div>
    </section>
  );
}
