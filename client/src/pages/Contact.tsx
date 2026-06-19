import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [form, setForm] = useState({
    topic: '', audience: '', businessChallenge: '', preferredFormat: '',
    email: '', name: '', organization: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `New Topic Request%0A%0ATopic Requested: ${form.topic}%0AAudience: ${form.audience}%0ABusiness Challenge: ${form.businessChallenge}%0APreferred Format: ${form.preferredFormat}%0AName: ${form.name}%0AOrganization: ${form.organization}%0AEmail Address: ${form.email}`;
    window.location.href = `mailto:info@lxology.com?subject=New Topic Request from Lxology Website&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-5">
              Let's Start a Conversation
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Whether you're looking for a product, service, specialist support, or a custom
              solution, we'd love to hear from you.
            </p>
            <a
              href="/contact#topic-request"
              className="inline-block mt-6 bg-[#FD6A02] text-white px-8 py-3 font-semibold hover:bg-[#e55a00] transition-colors duration-200"
              style={{ borderRadius: '4px' }}
            >
              Contact Lxology
            </a>
          </div>
        </section>

        {/* Topic Request Form */}
        <section id="topic-request" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#26006B] mb-2">Need a Specific Topic?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tell us what workplace challenge you're trying to solve. Lxology uses customer
                requests to guide future learning products, tools, and service offerings.
              </p>

              {submitted ? (
                <div
                  className="p-8 text-center border border-gray-100 shadow-sm"
                  style={{ borderRadius: '6px', backgroundColor: '#F6F9FF' }}
                >
                  <p className="text-[#26006B] font-semibold text-lg mb-2">Thank you for sharing your request.</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lxology uses customer input to guide future learning products, tools, and service
                    offerings. If follow-up is needed, we'll contact you using the email provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">
                      Topic Requested <span className="text-[#FD6A02]">*</span>
                    </label>
                    <input
                      type="text" name="topic" value={form.topic} onChange={handleChange} required
                      placeholder="What topic do you need?"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">Audience</label>
                    <input
                      type="text" name="audience" value={form.audience} onChange={handleChange}
                      placeholder="Who is this for?"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">Business Challenge</label>
                    <textarea
                      name="businessChallenge" value={form.businessChallenge} onChange={handleChange}
                      rows={3} placeholder="What business problem are you trying to solve?"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B] resize-none"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">Preferred Format</label>
                    <select
                      name="preferredFormat" value={form.preferredFormat} onChange={handleChange}
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    >
                      <option value="">Select a format</option>
                      <option>Learning product</option>
                      <option>Workshop or training program</option>
                      <option>Toolkit or job aid</option>
                      <option>Advisory support</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">Organization</label>
                    <input
                      type="text" name="organization" value={form.organization} onChange={handleChange}
                      placeholder="Organization or company name"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#26006B] mb-1.5">
                      Email Address <span className="text-[#FD6A02]">*</span>
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="Where should we follow up?"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 focus:border-[#26006B]"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FD6A02] text-white py-4 font-bold text-base hover:bg-[#e55a00] transition-colors duration-200"
                    style={{ borderRadius: '4px' }}
                  >
                    Submit Topic Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer minimal />
    </div>
  );
}
