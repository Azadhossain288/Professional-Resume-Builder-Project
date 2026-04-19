import { useState } from "react";

const sections = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "summary", label: "Summary", icon: "✍️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
];

const FormPanel = ({ data, handlers }) => {
  const [activeSection, setActiveSection] = useState("personal");
  const [skillInput, setSkillInput] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      handlers.addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Nav */}
      <div className="w-48 bg-[#0a0a16] border-r border-white/5 flex flex-col py-5 px-3 gap-1 shrink-0">
        <p className="text-[10px] text-white/20 uppercase tracking-widest px-3 mb-3 font-medium">Sections</p>
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{ animationDelay: `${i * 0.05}s` }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left relative overflow-hidden
              ${activeSection === s.id
                ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                : "text-white/35 hover:text-white/70 hover:bg-white/5 border border-transparent hover:translate-x-1"
              }`}
          >
            {activeSection === s.id && (
              <span className="absolute left-0 top-[20%] h-[60%] w-[3px] bg-pink-500 rounded-r-full" />
            )}
            <span className="text-sm">{s.icon}</span>
            <span>{s.label}</span>
            {activeSection === s.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            )}
          </button>
        ))}
        
        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            onClick={handlers.saveResume}
            disabled={handlers.saveStatus === "saving"}
            className={`w-full py-2.5 rounded-xl text-[12px] font-medium transition-all hover:-translate-y-0.5
              ${handlers.saveStatus === "saved"
                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                : handlers.saveStatus === "error"
                ? "bg-red-500/20 border border-red-500/30 text-red-400"
                : handlers.saveStatus === "saving"
                ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                : "bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20"
              }`}
          >
            {handlers.saveStatus === "saving" ? "⏳ Saving..." :
             handlers.saveStatus === "saved" ? "✅ Saved!" :
             handlers.saveStatus === "error" ? "❌ Error!" :
             "💾 Save Resume"}
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-7">

        {/* Personal Section */}
        {activeSection === "personal" && (
          <div className="animate-fadeUp">
            <SectionHead title="Personal info" sub="Fill in your basic details" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { field: "name", label: "👤 Full Name", placeholder: "Azad Hossain" },
                { field: "title", label: "💼 Job Title", placeholder: "Frontend Developer" },
                { field: "email", label: "✉️ Email", placeholder: "you@email.com" },
                { field: "phone", label: "📞 Phone", placeholder: "+880 1XXX-XXXXXX" },
                { field: "location", label: "📍 Location", placeholder: "Dhaka, Bangladesh" },
                { field: "linkedin", label: "🔗 LinkedIn", placeholder: "linkedin.com/in/..." },
              ].map(({ field, label, placeholder }) => (
                <Field key={field} label={label}>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={data.personalInfo[field]}
                    onChange={e => handlers.updatePersonalInfo(field, e.target.value)}
                    className="input-style"
                  />
                </Field>
              ))}
            </div>
          </div>
        )}

        {/* Summary Section with AI ✨ */}
        {activeSection === "summary" && (
          <div className="animate-fadeUp">
            <SectionHead title="Professional Summary" sub="Write or generate with AI" />
            
            {/* AI Magic Box */}
            <div className="bg-gradient-to-br from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white text-[10px]">✨</div>
                <span className="text-white/80 text-[13px] font-semibold">AI Summary Generator</span>
                <span className="ml-auto text-[10px] bg-green-500/15 border border-green-500/25 text-green-400 px-2 py-0.5 rounded-full font-bold">Free</span>
              </div>
              
              <p className="text-white/40 text-[11px] mb-4">
                আপনার Job Title আর Skills থেকে AI সুন্দর একটি সামারি লিখে দেবে।
              </p>

              <button
                onClick={async () => {
                  if (!data.personalInfo.title) {
                    alert("Please fill in your Job Title first!");
                    return;
                  }
                  handlers.setAiLoading(true);
                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch("http://localhost:5000/api/ai/generate-summary", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        jobTitle: data.personalInfo.title,
                        skills: data.skills,
                        name: data.personalInfo.name,
                      }),
                    });
                    const result = await res.json();
                    if (result.summary) {
                      handlers.updateSummary(result.summary);
                    }
                  } catch (err) {
                    alert("API connection failed!");
                  } finally {
                    handlers.setAiLoading(false);
                  }
                }}
                disabled={handlers.aiLoading || !data.personalInfo.title}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  handlers.aiLoading
                    ? "bg-white/5 text-white/20 cursor-wait"
                    : "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-pink-500/20"
                }`}
              >
                {handlers.aiLoading ? "Generating..." : "✨ Generate with AI"}
              </button>
            </div>

            <Field label="✍️ Summary">
              <textarea
                rows={7}
                placeholder="Write manually or use the AI generator above..."
                value={data.summary}
                onChange={e => handlers.updateSummary(e.target.value)}
                className="input-style resize-none"
              />
              <p className="text-[10px] text-white/20 text-right mt-1 font-mono">{data.summary.length} chars</p>
            </Field>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <div className="animate-fadeUp">
            <SectionHead title="Work Experience" sub="Add your professional history" />
            <div className="flex flex-col gap-4">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-medium text-white">Experience #{idx + 1}</span>
                    {data.experience.length > 1 && (
                      <button onClick={() => handlers.removeExperience(exp.id)} className="text-[11px] text-red-400">✕ Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ f: "role", l: "Role" }, { f: "company", l: "Company" }, { f: "duration", l: "Duration" }].map(item => (
                      <Field key={item.f} label={item.l}>
                        <input
                          type="text"
                          value={exp[item.f]}
                          onChange={e => handlers.updateExperience(exp.id, item.f, e.target.value)}
                          className="input-style"
                        />
                      </Field>
                    ))}
                    <Field label="Description" className="col-span-2">
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={e => handlers.updateExperience(exp.id, "description", e.target.value)}
                        className="input-style resize-none"
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button onClick={handlers.addExperience} className="w-full py-3 border border-dashed border-pink-500/25 text-pink-400 rounded-2xl text-[13px]">+ Add Experience</button>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === "education" && (
          <div className="animate-fadeUp">
            <SectionHead title="Education" sub="Your academic background" />
            <div className="flex flex-col gap-4">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-medium text-white">Education #{idx + 1}</span>
                    {data.education.length > 1 && (
                      <button onClick={() => handlers.removeEducation(edu.id)} className="text-[11px] text-red-400">✕ Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ f: "degree", l: "Degree" }, { f: "school", l: "University" }, { f: "year", l: "Year" }].map(item => (
                      <Field key={item.f} label={item.l}>
                        <input
                          type="text"
                          value={edu[item.f]}
                          onChange={e => handlers.updateEducation(edu.id, item.f, e.target.value)}
                          className="input-style"
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handlers.addEducation} className="w-full py-3 border border-dashed border-blue-500/25 text-blue-400 rounded-2xl text-[13px]">+ Add Education</button>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="animate-fadeUp">
            <SectionHead title="Skills" sub="Add your technical skills" />
            <Field label="⚡ Add Skill">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. React, Node.js"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSkillAdd()}
                  className="input-style flex-1"
                />
                <button onClick={handleSkillAdd} className="px-6 bg-pink-500/15 border border-pink-500/25 text-pink-400 rounded-xl text-[12px] font-medium transition-all">+ Add</button>
              </div>
            </Field>
            <div className="flex flex-wrap gap-2 mt-4">
              {data.skills.map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] bg-pink-500/10 border border-pink-500/25 text-pink-400">
                  {skill}
                  <button onClick={() => handlers.removeSkill(skill)} className="text-[10px]">✕</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="animate-fadeUp">
            <SectionHead title="Projects" sub="Showcase your work" />
            <div className="flex flex-col gap-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-medium text-white">Project #{idx + 1}</span>
                    {data.projects.length > 1 && (
                      <button onClick={() => handlers.removeProject(proj.id)} className="text-[11px] text-red-400">✕ Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ f: "name", l: "Name" }, { f: "tech", l: "Tech" }, { f: "link", l: "Link" }].map(item => (
                      <Field key={item.f} label={item.l}>
                        <input
                          type="text"
                          value={proj[item.f]}
                          onChange={e => handlers.updateProject(proj.id, item.f, e.target.value)}
                          className="input-style"
                        />
                      </Field>
                    ))}
                    <Field label="Description" className="col-span-2">
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={e => handlers.updateProject(proj.id, "description", e.target.value)}
                        className="input-style resize-none"
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button onClick={handlers.addProject} className="w-full py-3 border border-dashed border-orange-500/25 text-orange-400 rounded-2xl text-[13px]">+ Add Project</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// UI Components
const SectionHead = ({ title, sub }) => (
  <div className="mb-6 group">
    <h2 className="text-[17px] font-medium text-white">{title}</h2>
    <p className="text-[12px] text-white/30 mt-1">{sub}</p>
    <div className="h-[2px] w-7 group-hover:w-12 bg-pink-500 rounded mt-2 transition-all duration-300" />
  </div>
);

const Field = ({ label, children, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[10.5px] font-medium text-white/30 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export default FormPanel;