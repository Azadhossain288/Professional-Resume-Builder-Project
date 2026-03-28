import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080812] overflow-x-hidden">
      <Navbar navigate={navigate} />
      <Hero navigate={navigate} />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

// =====================
// NAVBAR
// =====================
const Navbar = ({ navigate }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#080812]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">R</div>
      <span className="text-white font-semibold text-lg">ResumeFlow</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      {["Features", "Testimonials", "Contact"].map(item => (
        <a key={item} href={`#${item.toLowerCase()}`}
          className="text-white/50 hover:text-white text-sm transition-colors duration-200">
          {item}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="px-5 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-medium rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all"
      >
        Get Started
      </button>
    </div>
  </nav>
);

// =====================
// HERO
// =====================
const Hero = ({ navigate }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    {/* Background blobs */}
    <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

    <div className="text-center px-6 relative z-10 max-w-4xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fadeUp">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-white/60 text-xs">Professional Resume Builder</span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fadeUp" style={{ animationDelay: "0.1s" }}>
        Build Your{" "}
        <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          Dream Resume
        </span>
        <br />in Minutes
      </h1>

      <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fadeUp" style={{ animationDelay: "0.2s" }}>
        Create professional resumes with live preview, multiple templates, and AI-powered suggestions. Land your dream job faster.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeUp" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-2xl hover:opacity-90 hover:-translate-y-1 transition-all shadow-lg shadow-pink-500/25 text-lg"
        >
          Create Free Resume →
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all text-lg"
        >
          Login
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-12 mt-16 animate-fadeUp" style={{ animationDelay: "0.4s" }}>
        {[
          { num: "10K+", label: "Resumes Created" },
          { num: "3", label: "Templates" },
          { num: "100%", label: "Free to Use" },
        ].map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-bold text-white">{num}</div>
            <div className="text-white/30 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// =====================
// FEATURES
// =====================
const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Live Preview",
      desc: "See your resume update in real-time as you type. No more guessing how it will look.",
      color: "from-pink-500/20 to-pink-500/5",
      border: "border-pink-500/20",
    },
    {
      icon: "🎨",
      title: "Multiple Templates",
      desc: "Choose from Modern, Classic, and Minimal templates to match your style.",
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/20",
    },
    {
      icon: "📄",
      title: "PDF Download",
      desc: "Download your resume as a professional PDF with one click.",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/20",
    },
    {
      icon: "☁️",
      title: "Cloud Save",
      desc: "Your resumes are saved securely. Access them from anywhere, anytime.",
      color: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/20",
    },
    {
      icon: "🚀",
      title: "Projects Section",
      desc: "Showcase your best projects with tech stack, live links, and descriptions.",
      color: "from-orange-500/20 to-orange-500/5",
      border: "border-orange-500/20",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "Your data is protected with JWT authentication and secure MongoDB storage.",
      color: "from-red-500/20 to-red-500/5",
      border: "border-red-500/20",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-pink-400 text-sm font-medium uppercase tracking-wider">Features</span>
        <h2 className="text-4xl font-bold text-white mt-3">Everything you need</h2>
        <p className="text-white/40 mt-4 max-w-xl mx-auto">Powerful tools to help you create the perfect resume and land your dream job.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// =====================
// TESTIMONIALS
// =====================
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Frontend Developer",
      avatar: "SA",
      text: "ResumeFlow helped me land my dream job at a top tech company. The live preview feature is absolutely amazing!",
      color: "bg-pink-500",
    },
    {
      name: "Rahim Khan",
      role: "Full Stack Engineer",
      avatar: "RK",
      text: "I created my resume in under 30 minutes. The templates look so professional and the PDF export is perfect.",
      color: "bg-blue-500",
    },
    {
      name: "Priya Das",
      role: "UI/UX Designer",
      avatar: "PD",
      text: "The minimal template is exactly what I needed. Clean, professional, and easy to customize.",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-white/2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl font-bold text-white mt-3">Loved by job seekers</h2>
          <p className="text-white/40 mt-4">Join thousands who have already landed their dream jobs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================
// CONTACT
// =====================
const Contact = () => {
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields!");
      return;
    }

    setStatus("sending");

    try {
      
      await axios.post("http://localhost:5000/api/contact/send", form);
      
      setStatus("sent");
      setForm({ name: "", email: "", message: "" }); 
      
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Email error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Contact</span>
        <h2 className="text-4xl font-bold text-white mt-3 mb-4">Get in touch</h2>
        <p className="text-white/40 mb-10">Have questions or feedback? We'd love to hear from you.</p>

        <div className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-pink-500 transition-all placeholder:text-white/20"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-pink-500 transition-all placeholder:text-white/20"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-pink-500 transition-all placeholder:text-white/20 resize-none"
            />
            
            <button 
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-3 font-semibold rounded-xl transition-all hover:-translate-y-0.5 
                ${status === "sent" ? "bg-green-500" : status === "error" ? "bg-red-500" : "bg-gradient-to-r from-pink-500 to-blue-500"} 
                text-white hover:opacity-90 disabled:opacity-50`}
            >
              {status === "sending" ? "⏳ Sending..." : 
               status === "sent" ? "✅ Message Sent!" : 
               status === "error" ? " Failed! Try again" : 
               "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
// =====================
// FOOTER
// =====================
const Footer = () => (
  <footer className="border-t border-white/5 py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">R</div>
        <span className="text-white/50 text-sm">ResumeFlow</span>
      </div>
      <p className="text-white/25 text-sm">© 2026 ResumeFlow. Built with React & Node.js</p>
      <div className="flex gap-6">
        {["Features", "Testimonials", "Contact"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-white/30 hover:text-white/60 text-sm transition-colors">
            {item}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Home;