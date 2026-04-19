import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
const Navbar = ({ navigate }) => {
  const menuItems = ["Home", "Features", "Testimonials", "Contact"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#080812]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => {
          navigate("/home");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">R</div>
        <span className="text-white font-semibold text-lg">ResumeFlow</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => (
          <a
            key={item}
            href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
            onClick={(e) => {
              if (item === "Home") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200"
          >
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
};

// =====================
// HERO
// =====================
const Hero = ({ navigate }) => {
  const [typedText, setTypedText] = useState("");
  const texts = ["Dream Resume", "Perfect CV", "Career Story"];
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.slice(0, typedText.length + 1));
        if (typedText === current) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setTypedText(current.slice(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/12 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/12 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
      
      <div className="text-center px-6 relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/4 border border-white/10 rounded-full px-5 py-2 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-white/50 text-xs font-medium">Free Professional Resume Builder</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-4 tracking-tight">Build Your</h1>
        <div className="h-20 md:h-24 flex items-center justify-center mb-4">
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">{typedText}</span>
            <span className="text-pink-400 animate-pulse">|</span>
          </h1>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white/20 leading-none mb-10 tracking-tight">in Minutes</h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={() => navigate("/register")} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-2xl text-lg hover:-translate-y-1 transition-all shadow-2xl shadow-pink-500/30">
            Create Free Resume →
          </button>
          <button onClick={() => navigate("/login")} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-lg hover:bg-white/10 transition-all">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

// =====================
// FEATURES (Optimized & Linked with your Dashboard)
// =====================
const Features = () => {
  const features = [
    { title: "Live Preview", desc: "See your resume update in real-time as you type, just like the dashboard.", tag: "Real-time", mockup: "live-preview" },
    { title: "Pro Templates", desc: "Switch between Modern, Classic, and Minimal layouts instantly.", tag: "ATS-Ready", mockup: "templates" },
    { title: "Instant PDF", desc: "Download high-quality, professional PDFs with a single click.", tag: "Fast", mockup: "pdf" },
    { title: "Cloud Save", desc: "Your data is saved securely with JWT auth and MongoDB.", tag: "Secure", mockup: "cloud" },
    { title: "Dynamic Projects", desc: "Add tech stacks and live links to make your projects stand out.", tag: "Custom", mockup: "projects" },
    { title: "Privacy First", desc: "Encrypted data ensures your personal info stays safe.", tag: "Protected", mockup: "secure" },
  ];

  return (
    <section id="features" className="py-24 px-6 relative bg-[#0B0E14]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful <span className="text-pink-500">Features</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Optimized tools to land your dream job faster.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group bg-[#131720] border border-white/5 rounded-2xl p-6 transition-all hover:border-pink-500/30">
              <div className="flex justify-end mb-4">
                <span className="text-[10px] font-bold uppercase text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">{f.tag}</span>
              </div>
              <div className="h-32 bg-[#0B0E14] rounded-xl border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-pink-500/20">
                <FeatureMockup type={f.mockup} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-pink-500 transition-colors">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// SINGLE DECLARATION OF MOCKUP COMPONENT
const FeatureMockup = ({ type }) => {
  const inputStyle = "h-4 bg-white/5 rounded border border-white/10 w-full";
  
  if (type === "live-preview") return (
    <div className="flex gap-4 p-4 w-full">
      <div className="flex-1 space-y-2">
        <div className="h-1 w-8 bg-pink-500/40 rounded" />
        <div className={inputStyle} />
        <div className={inputStyle} />
      </div>
      <div className="w-[1px] bg-white/10 h-full" />
      <div className="flex-1 space-y-2 animate-pulse">
        <div className="h-3 w-full bg-pink-500/20 rounded" />
        <div className="h-1 w-3/4 bg-white/10 rounded" />
      </div>
    </div>
  );

  if (type === "templates") return (
    <div className="flex gap-2 items-center">
       <div className="w-12 h-16 bg-pink-500/10 border border-pink-500/20 rounded scale-90" />
       <div className="w-14 h-20 bg-white/5 border border-pink-500/40 rounded shadow-lg z-10" />
       <div className="w-12 h-16 bg-blue-500/10 border border-blue-500/20 rounded scale-90" />
    </div>
  );

  if (type === "pdf") return (
    <div className="relative">
        <div className="w-14 h-18 bg-white/5 border border-white/10 rounded flex flex-col p-2 gap-2">
            <div className="h-1.5 w-full bg-pink-500/30 rounded" />
            <div className="h-1 w-full bg-white/5 rounded" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-pink-500 p-1 rounded animate-bounce">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </div>
    </div>
  );

  if (type === "projects") return (
    <div className="w-full px-6 space-y-2">
        <div className="flex gap-2">
            <div className="h-3 w-10 bg-orange-500/20 rounded border border-orange-500/30 text-[6px] text-center text-orange-500">React</div>
            <div className="h-3 w-10 bg-blue-500/20 rounded border border-blue-500/30 text-[6px] text-center text-blue-500">Tailwind</div>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded" />
    </div>
  );

  if (type === "cloud") return (
    <div className="flex flex-col items-center gap-2">
        <span className="text-2xl">☁️</span>
        <div className="flex gap-1 animate-pulse">
            <div className="w-1 h-1 bg-pink-500 rounded-full" />
            <div className="w-1 h-1 bg-pink-500 rounded-full" />
        </div>
    </div>
  );

  if (type === "secure") return (
    <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
        <span className="text-xl">🛡️</span>
    </div>
  );

  return <div className="text-pink-500 opacity-20">✨</div>;
};

// =====================
// TESTIMONIALS
// =====================
const Testimonials = () => {
  const testimonials = [
    { name: "Sarah Ahmed", role: "Frontend Developer", avatar: "SA", text: "ResumeFlow helped me land my dream job! The live preview is amazing.", color: "bg-pink-500" },
    { name: "Rahim Khan", role: "Full Stack Engineer", avatar: "RK", text: "Templates look professional and PDF export is perfect.", color: "bg-blue-500" },
    { name: "Priya Das", role: "UI/UX Designer", avatar: "PD", text: "Minimal template is exactly what I needed. Clean and easy.", color: "bg-emerald-500" },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-white/2">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-blue-400 text-sm font-medium uppercase">Testimonials</span>
        <h2 className="text-4xl font-bold text-white mt-3 mb-12">Loved by job seekers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-6 hover:-translate-y-1 transition-all">
              <div className="flex gap-1 mb-4 text-yellow-400">★★★★★</div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold`}>{t.avatar}</div>
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
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post("http://localhost:5000/api/contact/send", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-10">Get in touch</h2>
        <form onSubmit={handleSubmit} className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-8 flex flex-col gap-4">
          <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500" />
          <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500" />
          <textarea rows={4} placeholder="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 resize-none" />
          <button type="submit" disabled={status === "sending"} className={`w-full py-3 font-semibold rounded-xl text-white ${status === "sent" ? "bg-green-500" : "bg-gradient-to-r from-pink-500 to-blue-500"}`}>
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

// =====================
// FOOTER
// =====================
const Footer = () => (
  <footer className="border-t border-white/5 bg-[#080812] py-12 text-center">
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white text-[10px]">R</div>
      <span className="text-white font-bold">ResumeFlow</span>
    </div>
    <p className="text-white/20 text-sm">© {new Date().getFullYear()} ResumeFlow. Built with ❤️</p>
  </footer>
);

export default Home;