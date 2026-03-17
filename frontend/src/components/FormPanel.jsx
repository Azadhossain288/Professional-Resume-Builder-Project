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
          <button className="w-full py-2.5 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 text-[12px] font-medium hover:bg-pink-500/20 transition-all hover:-translate-y-0.5">
            💾 Save Resume
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-7">

        {/* Personal */}
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

        {/* Summary */}
        {activeSection === "summary" && (
          <div className="animate-fadeUp">
            <SectionHead title="Professional Summary" sub="Write a compelling overview" />
            <Field label="✍️ About You">
              <textarea
                rows={7}
                placeholder="A passionate developer with 3+ years of experience building modern web applications..."
                value={data.summary}
                onChange={e => handlers.updateSummary(e.target.value)}
                className="input-style resize-none"
              />
              <p className="text-[10px] text-white/20 text-right mt-1">{data.summary.length} characters</p>
            </Field>
          </div>
        )}

        {/* Experience */}
        {activeSection === "experience" && (
          <div className="animate-fadeUp">
            <SectionHead title="Work Experience" sub="Add your professional history" />
            <div className="flex flex-col gap-4">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[11px] text-pink-400 font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-[13px] font-medium text-white">
                        {exp.role || <span className="text-white/30">New Experience</span>}
                      </span>
                    </div>
                    {data.experience.length > 1 && (
                      <button
                        onClick={() => handlers.removeExperience(exp.id)}
                        className="text-[11px] text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { field: "role", label: "Job Role", placeholder: "Frontend Developer" },
                      { field: "company", label: "Company", placeholder: "TechCorp Ltd." },
                      { field: "duration", label: "Duration", placeholder: "2022 – Present" },
                    ].map(({ field, label, placeholder }) => (
                      <Field key={field} label={label}>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={exp[field]}
                          onChange={e => handlers.updateExperience(exp.id, field, e.target.value)}
                          className="input-style"
                        />
                      </Field>
                    ))}
                    <Field label="Description" className="col-span-2">
                      <textarea
                        rows={3}
                        placeholder="What did you accomplish here?"
                        value={exp.description}
                        onChange={e => handlers.updateExperience(exp.id, "description", e.target.value)}
                        className="input-style resize-none"
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                onClick={handlers.addExperience}
                className="w-full py-3 border border-dashed border-pink-500/25 text-pink-400/70 rounded-2xl text-[13px] hover:bg-pink-500/5 hover:border-pink-500/40 hover:text-pink-400 hover:-translate-y-0.5 transition-all"
              >
                + Add Experience
              </button>
            </div>
          </div>
        )}

        {/* Education */}
        {activeSection === "education" && (
          <div className="animate-fadeUp">
            <SectionHead title="Education" sub="Your academic background" />
            <div className="flex flex-col gap-4">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[11px] text-blue-400 font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-[13px] font-medium text-white">
                        {edu.degree || <span className="text-white/30">New Education</span>}
                      </span>
                    </div>
                    {data.education.length > 1 && (
                      <button
                        onClick={() => handlers.removeEducation(edu.id)}
                        className="text-[11px] text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { field: "degree", label: "Degree", placeholder: "B.Sc. in CSE" },
                      { field: "school", label: "University", placeholder: "BUET, Dhaka" },
                      { field: "year", label: "Year", placeholder: "2018 – 2022" },
                    ].map(({ field, label, placeholder }) => (
                      <Field key={field} label={label}>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={edu[field]}
                          onChange={e => handlers.updateEducation(edu.id, field, e.target.value)}
                          className="input-style"
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={handlers.addEducation}
                className="w-full py-3 border border-dashed border-blue-500/25 text-blue-400/70 rounded-2xl text-[13px] hover:bg-blue-500/5 hover:border-blue-500/40 hover:text-blue-400 hover:-translate-y-0.5 transition-all"
              >
                + Add Education
              </button>
            </div>
          </div>
        )}

        {/* Skills */}
        {activeSection === "skills" && (
          <div className="animate-fadeUp">
            <SectionHead title="Skills" sub="Add your technical skills" />
            <Field label="⚡ Add Skill (Enter চাপো)">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, Python..."
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSkillAdd()}
                  className="input-style flex-1"
                />
                <button
                  onClick={handleSkillAdd}
                  className="px-4 bg-pink-500/15 border border-pink-500/25 text-pink-400 rounded-xl text-[12px] font-medium hover:bg-pink-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  + Add
                </button>
              </div>
            </Field>
            {data.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] text-white/20 mb-3">{data.skills.length} skills added</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span key={skill} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium border animate-popIn
                      ${i % 4 === 0 ? "bg-pink-500/10 border-pink-500/25 text-pink-400" :
                        i % 4 === 1 ? "bg-blue-500/10 border-blue-500/25 text-blue-400" :
                        i % 4 === 2 ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" :
                        "bg-amber-500/10 border-amber-500/25 text-amber-400"}`}
                    >
                      {skill}
                      <button
                        onClick={() => handlers.removeSkill(skill)}
                        className="opacity-40 hover:opacity-100 hover:rotate-90 transition-all text-[10px]"
                      >✕</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {activeSection === "projects" && (
          <div className="animate-fadeUp">
            <SectionHead title="Projects" sub="Showcase your best work" />
            <div className="flex flex-col gap-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="bg-[#0e0e1e] border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[11px] text-orange-400 font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-[13px] font-medium text-white">
                        {proj.name || <span className="text-white/30">New Project</span>}
                      </span>
                    </div>
                    {data.projects.length > 1 && (
                      <button
                        onClick={() => handlers.removeProject(proj.id)}
                        className="text-[11px] text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Project Name">
                      <input
                        type="text"
                        placeholder="Portfolio Website"
                        value={proj.name}
                        onChange={e => handlers.updateProject(proj.id, "name", e.target.value)}
                        className="input-style"
                      />
                    </Field>
                    <Field label="Tech Used">
                      <input
                        type="text"
                        placeholder="React, Firebase"
                        value={proj.tech}
                        onChange={e => handlers.updateProject(proj.id, "tech", e.target.value)}
                        className="input-style"
                      />
                    </Field>
                    <Field label="🔗 Live Link" className="col-span-2">
                      <input
                        type="text"
                        placeholder="https://myproject.com"
                        value={proj.link}
                        onChange={e => handlers.updateProject(proj.id, "link", e.target.value)}
                        className="input-style"
                      />
                    </Field>
                    <Field label="Description" className="col-span-2">
                      <textarea
                        rows={3}
                        placeholder="What does this project do? What problem does it solve?"
                        value={proj.description}
                        onChange={e => handlers.updateProject(proj.id, "description", e.target.value)}
                        className="input-style resize-none"
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                onClick={handlers.addProject}
                className="w-full py-3 border border-dashed border-orange-500/25 text-orange-400/70 rounded-2xl text-[13px] hover:bg-orange-500/5 hover:border-orange-500/40 hover:text-orange-400 hover:-translate-y-0.5 transition-all"
              >
                + Add Project
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

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