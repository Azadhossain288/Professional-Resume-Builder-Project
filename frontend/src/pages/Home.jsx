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
const Navbar = ({ navigate }) => {
  
  const menuItems = ["Home", "Features", "Testimonials", "Contact"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#080812]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
      {/* Left: Logo */}
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

      {/* Center: Navigation Links (Including Home) */}
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

      {/* Right: Auth Buttons */}
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

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/12 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/12 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/6 blur-3xl pointer-events-none" />

      <div className="text-center px-6 relative z-10 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/4 border border-white/10 rounded-full px-5 py-2 mb-10 hover:bg-white/8 transition-all cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-white/50 text-xs font-medium">Free Professional Resume Builder</span>
          <span className="text-white/20">·</span>
          <span className="text-pink-400 text-xs font-semibold">No signup required to preview</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-4 tracking-tight">
          Build Your
        </h1>

        {/* Typewriter */}
        <div className="h-20 md:h-24 flex items-center justify-center mb-4">
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="text-pink-400 animate-pulse">|</span>
          </h1>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white/20 leading-none mb-10 tracking-tight">
          in Minutes
        </h1>

        {/* Subtitle */}
        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Create professional resumes with{" "}
          <span className="text-white/60">live preview</span>,{" "}
          <span className="text-white/60">multiple templates</span>, and{" "}
          <span className="text-white/60">one-click PDF export</span>.
          Land your dream job faster.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate("/register")}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-2xl text-lg overflow-hidden hover:-translate-y-1 transition-all shadow-2xl shadow-pink-500/30"
          >
            <span className="relative z-10">Create Free Resume →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-lg hover:bg-white/10 hover:-translate-y-1 transition-all"
          >
            Sign In
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mb-16">
          {[
            { num: "10K+", label: "Resumes Created", icon: "📄" },
            { num: "3", label: "Pro Templates", icon: "🎨" },
            { num: "100%", label: "Free to Use", icon: "✨" },
            { num: "5★", label: "User Rating", icon: "⭐" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="text-center group cursor-default">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-2xl md:text-3xl font-black text-white group-hover:text-pink-400 transition-colors">{num}</div>
              <div className="text-white/25 text-xs md:text-sm mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* App Mockup */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 blur-2xl rounded-3xl" />
          <div className="relative bg-[#0d0d1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-white/5 rounded-md h-5 mx-2 flex items-center px-3">
                <span className="text-white/20 text-[10px]">resumeflow.app</span>
              </div>
            </div>

            {/* App preview */}
            <div className="flex h-48">
              {/* Sidebar */}
              <div className="w-28 bg-[#080812] border-r border-white/5 p-3 flex flex-col gap-2">
                {["👤 Personal", "✍️ Summary", "💼 Experience", "🎓 Education", "⚡ Skills"].map((item, i) => (
                  <div key={item} className={`text-[9px] px-2 py-1.5 rounded-lg ${i === 0 ? "bg-pink-500/15 text-pink-400 border border-pink-500/20" : "text-white/25"}`}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {["Full Name", "Job Title", "Email", "Phone"].map(p => (
                    <div key={p} className="bg-white/4 border border-white/8 rounded-lg h-7 px-2 flex items-center">
                      <span className="text-white/20 text-[9px]">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="w-36 bg-white/95 p-3 flex flex-col gap-1.5">
                <div className="h-8 bg-gradient-to-r from-[#111130] to-[#0d2a48] rounded-md flex items-center px-2">
                  <div>
                    <div className="h-1.5 bg-white/60 rounded w-12" />
                    <div className="h-1 bg-pink-400/60 rounded w-8 mt-0.5" />
                  </div>
                </div>
                <div className="flex gap-1 flex-1">
                  <div className="w-10 bg-purple-50 rounded p-1 flex flex-col gap-0.5">
                    <div className="h-1 bg-gray-300/60 rounded" />
                    <div className="h-1 bg-gray-200/60 rounded" />
                  </div>
                  <div className="flex-1 p-1 flex flex-col gap-0.5">
                    <div className="h-1 bg-gray-300/60 rounded w-3/4" />
                    <div className="h-1 bg-gray-200/60 rounded" />
                    <div className="h-1 bg-gray-200/60 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            ✓ Live Preview
          </div>
          <div className="absolute -bottom-3 -left-3 bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            ⬇ PDF Export
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================
// FEATURES
// =====================
const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Live Preview",
      desc: "See your resume update in real-time as you type.",
      gradient: "from-pink-500 to-rose-600",
      glow: "shadow-pink-500/25",
      bg: "rgba(236,72,153,0.06)",
      border: "rgba(236,72,153,0.15)",
      tag: "Popular",
      mockup: "live-preview",
    },
    {
      icon: "🎨",
      title: "Multiple Templates",
      desc: "Choose from Modern, Classic, and Minimal templates.",
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/25",
      bg: "rgba(59,130,246,0.06)",
      border: "rgba(59,130,246,0.15)",
      tag: "3 Templates",
      mockup: "templates",
    },
    {
      icon: "📄",
      title: "PDF Download",
      desc: "Download your resume as a professional PDF instantly.",
      gradient: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/25",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.15)",
      tag: "One Click",
      mockup: "pdf",
    },
    {
      icon: "☁️",
      title: "Cloud Save",
      desc: "Your resumes are saved securely. Access anywhere.",
      gradient: "from-purple-500 to-violet-600",
      glow: "shadow-purple-500/25",
      bg: "rgba(139,92,246,0.06)",
      border: "rgba(139,92,246,0.15)",
      tag: "Secure",
      mockup: "cloud",
    },
    {
      icon: "🚀",
      title: "Projects Section",
      desc: "Showcase your best projects with tech stack and links.",
      gradient: "from-orange-500 to-amber-500",
      glow: "shadow-orange-500/25",
      bg: "rgba(249,115,22,0.06)",
      border: "rgba(249,115,22,0.15)",
      tag: "Unique",
      mockup: "projects",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "JWT auth and encrypted MongoDB keep your data safe.",
      gradient: "from-red-500 to-pink-600",
      glow: "shadow-red-500/25",
      bg: "rgba(239,68,68,0.06)",
      border: "rgba(239,68,68,0.15)",
      tag: "Protected",
      mockup: "secure",
    },
  ];

  return (
    <section id="features" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-pink-400 text-xs font-semibold uppercase tracking-widest">Features</span>
          </div>
          <h2 className="text-5xl font-bold text-white mt-2">
            Everything you{" "}
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">need</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
            Powerful tools to help you create the perfect resume and land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                background: `linear-gradient(135deg, ${f.bg}, rgba(255,255,255,0.01))`,
                borderColor: f.border,
              }}
              className="group relative border rounded-3xl p-7 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top row */}
              <div className="relative z-10 flex items-start justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl shadow-lg ${f.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {f.icon}
                </div>
                <span style={{ background: f.bg, borderColor: f.border }} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border text-white/60">
                  {f.tag}
                </span>
              </div>

              {/* Animated Mockup */}
              <div className="relative z-10 my-5 h-28 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
                <FeatureMockup type={f.mockup} gradient={f.gradient} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors">{f.desc}</p>
              </div>

              {/* Bottom bar */}
              <div className="relative z-10 flex items-center justify-end mt-4 pt-3 border-t border-white/5">
                <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                  <div className={`w-8 h-0.5 bg-gradient-to-r ${f.gradient} rounded`} />
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${f.gradient}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-white/25 text-sm mb-4">Join thousands building their dream resumes</p>
          <button
            onClick={() => window.location.href = "/register"}
            className="px-10 py-3.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-2xl hover:opacity-90 hover:-translate-y-1 transition-all shadow-xl shadow-pink-500/20"
          >
            Start for Free →
          </button>
        </div>
      </div>
    </section>
  );
};

// =====================
// FEATURE MOCKUPS
// =====================
const FeatureMockup = ({ type, gradient }) => {
  if (type === "live-preview") return (
    <div className="p-3 h-full flex gap-2">
      {/* Form side */}
      <div className="flex-1 flex flex-col gap-1.5">
        {["Name", "Email", "Skills"].map((label, i) => (
          <div key={label} className="flex flex-col gap-0.5">
            <div className="w-8 h-1 bg-white/20 rounded" />
            <div
              className="h-4 bg-white/10 rounded border border-white/10 animate-pulse"
              style={{ animationDelay: `${i * 0.3}s`, width: `${60 + i * 15}%` }}
            />
          </div>
        ))}
      </div>
      {/* Divider */}
      <div className="w-px bg-white/10" />
      {/* Preview side */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-3 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded w-3/4 animate-pulse" />
        <div className="h-2 bg-white/20 rounded w-1/2" />
        <div className="h-1.5 bg-white/10 rounded w-full mt-1" />
        <div className="h-1.5 bg-white/10 rounded w-5/6" />
        <div className="h-1.5 bg-white/10 rounded w-4/6" />
      </div>
    </div>
  );

  if (type === "templates") return (
    <div className="p-3 h-full flex gap-2 items-center justify-center">
      {[
        { name: "Modern", color: "from-pink-500/40 to-purple-500/40", w: "w-16" },
        { name: "Classic", color: "from-blue-500/40 to-cyan-500/40", w: "w-16", scale: "scale-110 z-10" },
        { name: "Minimal", color: "from-emerald-500/40 to-teal-500/40", w: "w-16" },
      ].map((t, i) => (
        <div key={t.name} className={`${t.w} ${t.scale || ""} h-20 rounded-lg bg-gradient-to-br ${t.color} border border-white/10 flex flex-col overflow-hidden transition-transform`}>
          <div className="h-4 bg-black/20" />
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            <div className="h-1 bg-white/30 rounded w-3/4" />
            <div className="h-1 bg-white/15 rounded w-full" />
            <div className="h-1 bg-white/15 rounded w-5/6" />
          </div>
          <div className="text-[7px] text-white/40 text-center pb-1">{t.name}</div>
        </div>
      ))}
    </div>
  );

  if (type === "pdf") return (
    <div className="p-3 h-full flex items-center justify-center">
      <div className="relative">
        {/* PDF document */}
        <div className="w-16 h-20 bg-white/10 rounded-lg border border-white/20 flex flex-col overflow-hidden shadow-lg">
          <div className="h-5 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 flex items-center justify-center">
            <div className="text-[8px] text-white/70 font-bold">PDF</div>
          </div>
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            <div className="h-1 bg-white/30 rounded w-3/4" />
            <div className="h-1 bg-white/15 rounded w-full" />
            <div className="h-1 bg-white/15 rounded w-5/6" />
            <div className="h-1 bg-white/10 rounded w-4/6 mt-0.5" />
          </div>
        </div>
        {/* Download arrow */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white text-xs">↓</span>
        </div>
      </div>
    </div>
  );

  if (type === "cloud") return (
    <div className="p-3 h-full flex items-center justify-center gap-4">
      {/* Device 1 */}
      <div className="w-12 h-16 bg-white/10 rounded-lg border border-white/15 flex flex-col items-center justify-center gap-1">
        <div className="text-lg">💻</div>
        <div className="w-8 h-1 bg-purple-400/50 rounded animate-pulse" />
      </div>
      {/* Sync arrows */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-purple-400/60 text-xs animate-pulse">→</div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/40 to-violet-500/40 flex items-center justify-center text-xs border border-purple-500/30">☁</div>
        <div className="text-purple-400/60 text-xs animate-pulse">←</div>
      </div>
      {/* Device 2 */}
      <div className="w-8 h-16 bg-white/10 rounded-lg border border-white/15 flex flex-col items-center justify-center gap-1">
        <div className="text-sm">📱</div>
        <div className="w-5 h-1 bg-purple-400/50 rounded animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );

  if (type === "projects") return (
    <div className="p-3 h-full flex flex-col gap-2">
      {[
        { name: "Portfolio", tech: "React · Firebase", color: "bg-orange-500/30" },
        { name: "Resume Builder", tech: "Node · MongoDB", color: "bg-amber-500/30" },
      ].map((p, i) => (
        <div key={p.name} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5 border border-white/8">
          <div className={`w-2 h-2 rounded-full ${p.color} flex-shrink-0`} />
          <div className="flex-1">
            <div className="text-[10px] text-white/70 font-medium">{p.name}</div>
            <div className="text-[8px] text-white/30">{p.tech}</div>
          </div>
          <div className="text-[8px] text-orange-400/60">🔗</div>
        </div>
      ))}
      <div className="flex items-center gap-1 opacity-50">
        <div className="w-3 h-3 rounded border border-dashed border-white/20 flex items-center justify-center">
          <span className="text-[8px] text-white/40">+</span>
        </div>
        <span className="text-[8px] text-white/25">Add project</span>
      </div>
    </div>
  );

  if (type === "secure") return (
    <div className="p-3 h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Lock animation */}
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/20 flex items-center justify-center">
          <span className="text-2xl">🔒</span>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-2xl border border-red-500/20 animate-ping" />
        </div>
        {/* Auth badges */}
        <div className="flex gap-2">
          {["JWT", "MongoDB", "HTTPS"].map(badge => (
            <span key={badge} className="text-[8px] bg-white/5 border border-white/10 text-white/40 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
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