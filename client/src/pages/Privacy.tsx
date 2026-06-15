import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-[#26006B] mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-12">Effective Date: June 2026</p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Lxology respects your privacy. This Privacy Policy explains what information we collect
            through lxology.com, how we use it, and how you can contact us with questions.
          </p>

          {[
            {
              heading: 'Information We Collect',
              content: (
                <>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    We may collect information you choose to provide through our website forms, including:
                  </p>
                  <ul className="space-y-1 mb-3">
                    {['Name', 'Email address', 'Organization or company name', 'Topic requests', 'Service inquiries', 'Business challenges or needs you choose to share', 'Other information submitted through contact forms'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#FD6A02] mt-0.5">•</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    We may also collect basic website usage information, such as pages visited,
                    general traffic patterns, and device or browser information, if analytics tools
                    are used on the website.
                  </p>
                </>
              ),
            },
            {
              heading: 'How We Use Your Information',
              content: (
                <>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">Lxology may use the information you submit to:</p>
                  <ul className="space-y-1">
                    {['Respond to your inquiries', 'Review topic requests', 'Follow up about products, services, tools, or potential support', 'Improve future Lxology offerings', 'Understand what workplace learning and performance challenges visitors are trying to solve', 'Maintain and improve the website'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#FD6A02] mt-0.5">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              heading: 'Email Communications',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  If you submit a form, Lxology may contact you using the email address you provide.
                  We will use your email to respond to your inquiry, follow up on your request, or
                  share relevant information related to your submission. We do not sell your personal
                  information.
                </p>
              ),
            },
            {
              heading: 'How We Share Information',
              content: (
                <>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    Lxology does not sell personal information. We may share information only when needed to:
                  </p>
                  <ul className="space-y-1">
                    {['Operate the website', 'Manage email or form submissions', 'Use trusted service providers that support business operations', 'Comply with legal obligations, if required'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#FD6A02] mt-0.5">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              heading: 'Data Security',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  Lxology takes reasonable steps to protect the information submitted through the
                  website. However, no website, email system, or online transmission is completely
                  secure. Please avoid submitting sensitive personal information through website forms.
                </p>
              ),
            },
            {
              heading: 'Third-Party Services',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  The Lxology website may use third-party tools or platforms to support website
                  hosting, forms, analytics, email, or business operations. These providers may
                  process information as needed to deliver their services.
                </p>
              ),
            },
            {
              heading: 'Links to Other Websites',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  The Lxology website may include links to other websites. Lxology is not responsible
                  for the privacy practices, content, or policies of third-party websites.
                </p>
              ),
            },
            {
              heading: "Children's Privacy",
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  Lxology.com is intended for adults and business users. We do not knowingly collect
                  personal information from children.
                </p>
              ),
            },
            {
              heading: 'Updates to This Policy',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  Lxology may update this Privacy Policy from time to time. Any updates will be
                  posted on this page with a revised effective date.
                </p>
              ),
            },
            {
              heading: 'Contact Us',
              content: (
                <p className="text-gray-600 leading-relaxed text-sm">
                  If you have questions about this Privacy Policy or how your information is used,
                  please contact:<br /><br />
                  <strong className="text-[#26006B]">Lxology</strong><br />
                  Email:{' '}
                  <a href="mailto:info@lxology.com" className="text-[#FD6A02] hover:underline">
                    info@lxology.com
                  </a>
                </p>
              ),
            },
          ].map(({ heading, content }) => (
            <div key={heading} className="mb-10">
              <h2 className="text-xl font-bold text-[#26006B] mb-3">{heading}</h2>
              {content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
