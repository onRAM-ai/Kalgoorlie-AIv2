import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import ProcessTimeline from './components/ProcessTimeline';
import Footer from './components/Footer';
import FAQItem from './components/FAQItem';
import ContactForm from './components/ContactForm';
import Image from 'next/image';

export default function Home() {
  const services = [
    {
      title: "AI Agents",
      description: "Build specialised AI Agents tailored to your specific business needs.",
      icon: <i className="fas fa-robot" aria-hidden="true" />,
      features: [
        "Customer Service",
        "Email Assistant",
        "Research Assistant"
      ]
    },
    {
      title: "Automation",
      description: "Automate repetitive tasks and free up valuable time. We help businesses implement smart, AI-driven automations to improve efficiency and reduce operational cost.",
      icon: <i className="fas fa-gears" aria-hidden="true" />,
      features: [
        "Cut down on time-consuming admin tasks",
        "Ensure smooth, error-free workflows",
        "Focus on what really matters"
      ]
    },
    {
      title: "AI & IT Training",
      description: "Empower your team with hands-on training and workshops to build organisational capabilities.",
      icon: <i className="fas fa-graduation-cap" aria-hidden="true" />,
      features: [
        "Practical, real-world training—no tech jargon",
        "Learn how to use AI & IT effectively in your business",
        "Customised sessions for individuals, teams, or entire organisations"
      ]
    }
  ];

  const principles = [
    {
      title: "Passion",
      description: "Our passion is to enable the people and organisations of Kalgoorlie to embrace the future of technology.",
      icon: <i className="fas fa-heart" aria-hidden="true" />,
      features: []
    },
    {
      title: "Empower",
      description: "We believe technology should empower, not replace. Our solutions are designed to enhance productivity, inspire creativity, and strengthen the community, ensuring no one is left behind.",
      icon: <i className="fas fa-bolt" aria-hidden="true" />,
      features: []
    },
    {
      title: "Commit",
      description: "Our committment is to bridge the gap, AI doesn't have to be daunting. We are here to help you work smarter, not harder—whether you're a small business owner, an entrepreneur, or someone curious about the future. Together, let's build solutions that empower you to do more with less.",
      icon: <i className="fas fa-handshake" aria-hidden="true" />,
      features: []
    }
  ];

  const faqs = [
    {
      question: "How do I know if I need automation or AI?",
      answer: "If you or your team spend too much time on repetitive tasks, constantly feel behind on admin work, or think \"there has to be a better way\", then Kalgoorlie AI is here to help, with minor adjustments we can help you buy back your time."
    },
    {
      question: "What types of businesses do you help?",
      answer: "Our focus is small-to-medium businesses and business professionals who spend at least 5 hours a day using a computer."
    },
    {
      question: "What is a custom web app, and why would I need one?",
      answer: "A custom web app is a business tool built specifically for your needs—whether it's a client booking system, a CRM, a task manager, or an AI-powered dashboard. Instead of using multiple off-the-shelf software tools, a custom web app streamlines everything into one powerful solution"
    },
    {
      question: "How do I know which service is right for me?",
      answer: "Book a free 15-minute consultation where we assess your needs and recommend the best solution. No commitment—just clarity."
    },
    {
      question: "Do you support Apple products",
      answer: "No"
    },
    {
      question: "What if I already use software like Excel, Google Docs, or Notion?",
      answer: "Great! Instead of replacing your tools, I connect them so they work together seamlessly—saving you hours of manual work."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-6rem)] flex items-center justify-center pt-24 md:pt-32" aria-label="Welcome to Kalgoorlie AI">
          {/* Subtle accent orbs with reduced opacity and size */}
          <div className="floating-orb w-[300px] h-[300px] top-[10%] left-[-5%] opacity-[0.05]" aria-hidden="true" />
          <div className="floating-orb w-[200px] h-[200px] bottom-[20%] right-[5%] opacity-[0.03]" style={{ animationDelay: '-10s' }} aria-hidden="true" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <header className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gradient">
                Empower Your Business
                <span className="block">with AI</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Your Kalgoorlie local partner in Digital Literacy Workshops, Workflow Automation, and AI Agents
              </p>
              
              {/* Lead Magnet Card */}
              <div className="max-w-2xl mx-auto mb-12 transform hover:scale-105 transition-transform duration-300">
                <div className={`bg-primary/10 border border-primary/20 rounded-2xl p-6 backdrop-blur-sm`}>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <i className="fas fa-clipboard-check text-3xl text-primary"></i>
                    <h2 className="text-2xl font-semibold">Is your business ready?</h2>
                  </div>
                  <a 
                    href="/questionnaire"
                    className="btn-primary text-lg px-8 py-4 rounded-full flex items-center justify-center gap-2 w-full"
                  >
                    Find out now
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </header>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 scroll-mt-24" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 id="services-heading" className="text-center text-4xl font-bold mb-3 text-gradient">
              Our Services
            </h2>
            <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
              Comprehensive AI solutions tailored to optimise your business operations and drive innovation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-20 bg-primary/5 scroll-mt-24" aria-labelledby="about-me-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="about-me-heading" className="text-4xl font-bold mb-6 text-gradient">
                  Meet Marno
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    With over a decade in IT, I've worked with high-performing professionals and businesses who, despite their expertise, often feel frustrated and overwhelmed by technology. The problem isn't their skill—it's that they were taught to work the way the person before them did, not necessarily the most efficient way.
                  </p>
                  <p>
                    Technology should make work easier, not harder—but when you're constantly putting out fires, who has time to explore better ways of doing things? That's where I come in.
                  </p>
                  <p>
                    I help businesses and business professionals buy back their time and take control of how they work, through education & automation, so that you can work smarter, not harder. Once you see what's possible, everything changes.
                  </p>
                  <p>
                    Let's make technology work for you.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    <span>Kalgoorlie Local</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <i className="fas fa-building text-primary"></i>
                    <span>On-Site Assistance</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <i className="fas fa-user-group text-primary"></i>
                    <span>No Remote-Only Services</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-primary/10">
                  {/* Updated Image Reference */}
                  <Image
                    src="/Marno-Brits.jpeg"
                    alt="Marno Brits"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Experience highlights */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1F2C] border border-primary/10 rounded-full px-8 py-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">10+</div>
                    <div className="text-sm text-text-secondary">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="about" className="py-20 scroll-mt-24" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 id="process-heading" className="text-center text-4xl font-bold mb-3 text-gradient">
              How We Work
            </h2>
            <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
              Our holistic approach ensures successful implementatio with measurable outcomes.
            </p>
            <ProcessTimeline />
          </div>
        </section>

        {/* Our Principles Section */}
        <section className="py-20" aria-labelledby="principles-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 id="principles-heading" className="text-4xl font-bold mb-3 text-gradient">
              Our Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
              {principles.map((principle, index) => (
                <ServiceCard
                  key={index}
                  title={principle.title}
                  description={principle.description}
                  icon={principle.icon}
                  features={principle.features}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-primary/5" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-4xl font-bold mb-3 text-gradient text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-text-secondary mb-12">
              Get answers to common questions about our services and approach
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="contact-heading" className="text-4xl font-bold mb-3 text-gradient">
                Get in Touch
              </h2>
              <p className="text-xl text-text-secondary">
                Ready to transform your business? Let's talk about your needs.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5" aria-labelledby="cta-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className="text-3xl font-bold mb-6">
              Unsure where to start?
            </h2>
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
              <i className="fas fa-phone-alt text-primary"></i>
              <a 
                href="tel:0409913694" 
                className="text-lg hover:text-primary transition-colors"
              >
                Give Marno a call: 0409 913 694
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
