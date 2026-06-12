import { useState } from 'react';

export default function TopicRequest() {
  const [form, setForm] = useState({
    topic: '',
    audience: '',
    businessChallenge: '',
    preferredFormat: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:hello@lxology.com?subject=Topic Request: ${form.topic}&body=Topic: ${form.topic}%0AAudience: ${form.audience}%0ABusiness Challenge: ${form.businessChallenge}%0APreferred Format: ${form.preferredFormat}%0AEmail: ${form.email}`;
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">
              Need a Specific Topic?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tell us what challenge you're trying to solve. We use customer requests to guide future
              product development and service offerings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lx-card space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#26006B] mb-2">
                Topic Requested <span className="text-[#FD6A02]">*</span>
              </label>
              <input
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                required
                placeholder="What topic do you need?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26006B]/30 focus:border-[#26006B]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26006B] mb-2">Audience</label>
              <input
                type="text"
                name="audience"
                value={form.audience}
                onChange={handleChange}
                placeholder="Who is this for?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26006B]/30 focus:border-[#26006B]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26006B] mb-2">Business Challenge</label>
              <textarea
                name="businessChallenge"
                value={form.businessChallenge}
                onChange={handleChange}
                rows={3}
                placeholder="What business problem are you trying to solve?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26006B]/30 focus:border-[#26006B] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26006B] mb-2">Preferred Format</label>
              <select
                name="preferredFormat"
                value={form.preferredFormat}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26006B]/30 focus:border-[#26006B]"
              >
                <option value="">Select a format</option>
                <option>Workshop / Instructor-Led</option>
                <option>Self-Paced / eLearning</option>
                <option>Toolkit / Templates</option>
                <option>Job Aid / Quick Reference</option>
                <option>Advisory / Coaching</option>
                <option>No preference</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26006B] mb-2">
                Email Address <span className="text-[#FD6A02]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26006B]/30 focus:border-[#26006B]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FD6A02] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200"
            >
              Request a Topic
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
