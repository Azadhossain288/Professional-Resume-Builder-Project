import { useState } from "react";

const sections = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "summary", label: "Summary", icon: "✍️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "customize", label: "Customize", icon: "🎨" },
];

const FormPanel = ({ data, handlers }) => {
  const activeSection = handlers.activeSection;
  const setActiveSection = handlers.setActiveSection;
  const [skillInput, setSkillInput] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      handlers.addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  return (
    <div className="flex h-full bg-[#05050a]">
      {/* Sidebar Nav */}
      <div className="w-48 bg-[#0a0a16] border-r border-white/5 flex flex-col py-5 px-3 gap-1 shrink-0">
        <p className="text-[10px] text-white/20 uppercase tracking-widest px-3 mb-3 font-medium">Sections</p>
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
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
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            onClick={handlers.saveResume}
            disabled={handlers.saveStatus === "saving"}
            className={`w-full py-2.5 rounded-xl text-[12px] font-medium transition-all ${
              handlers.saveStatus === "saved" ? "bg-green-500/20 text-green-400" : "bg-pink-500/10 text-pink-400"
            }`}
          >
            {handlers.saveStatus === "saving" ? "⏳ Saving..." : handlers.saveStatus === "saved" ? "✅ Saved!" : "💾 Save Resume"}
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-7 custom-scrollbar">
        
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
                    value={data.personalInfo[field] || ""}
                    onChange={e => handlers.updatePersonalInfo(field, e.target.value)}
                    className="input-style"
                  />
                </Field>
              ))}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {activeSection === "summary" && (
          <div className="animate-fadeUp">
            <SectionHead title="Professional Summary" sub="Write or generate with AI" />
            <div className="bg-gradient-to-br from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-2xl p-5 mb-6">
              <button
                onClick={async () => {
                  if (!data.personalInfo.title) return alert("Please fill Job Title first!");
                  handlers.setAiLoading(true);
                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch("http://localhost:5000/api/ai/generate-summary", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                      body: JSON.stringify({ jobTitle: data.personalInfo.title, skills: data.skills, name: data.personalInfo.name }),
                    });
                    const result = await res.json();
                    if (result.summary) handlers.updateSummary(result.summary);
                  } catch (err) { alert("API failed!"); }
                  finally { handlers.setAiLoading(false); }
                }}
                disabled={handlers.aiLoading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white"
              >
                {handlers.aiLoading ? "Generating..." : "✨ Generate with AI"}
              </button>
            </div>
            <Field label="✍️ Summary">
              <textarea
                rows={7}
                value={data.summary || ""}
                onChange={e => handlers.updateSummary(e.target.value)}
                className="input-style resize-none"
              />
            </Field>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <div className="animate-fadeUp">
            <SectionHead title="Work Experience" sub="Add history" />
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-[#0e0e1e] border border-white/10 rounded-2xl p-5 mb-4">
                <div className="flex justify-between mb-4">
                  <span className="text-white/50 text-xs uppercase">Job Block</span>
                  <button onClick={() => handlers.removeExperience(exp.id)} className="text-red-400 text-xs">✕ Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Role"><input value={exp.role || ""} onChange={e => handlers.updateExperience(exp.id, "role", e.target.value)} className="input-style" /></Field>
                  <Field label="Company"><input value={exp.company || ""} onChange={e => handlers.updateExperience(exp.id, "company", e.target.value)} className="input-style" /></Field>
                  <Field label="Duration"><input value={exp.duration || ""} onChange={e => handlers.updateExperience(exp.id, "duration", e.target.value)} className="input-style" /></Field>
                  <Field label="Description" className="col-span-2">
                    <textarea rows={3} value={exp.description || ""} onChange={e => handlers.updateExperience(exp.id, "description", e.target.value)} className="input-style resize-none" />
                  </Field>
                </div>
              </div>
            ))}
            <button onClick={handlers.addExperience} className="w-full py-3 border border-dashed border-pink-500/25 text-pink-400 rounded-2xl">+ Add Experience</button>
          </div>
        )}

        {/* Education Section */}
        {activeSection === "education" && (
          <div className="animate-fadeUp">
            <SectionHead title="Education" sub="Add academic" />
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-[#0e0e1e] border border-white/10 rounded-2xl p-5 mb-4">
                <div className="flex justify-between mb-4">
                  <span className="text-white/50 text-xs">Degree Block</span>
                  <button onClick={() => handlers.removeEducation(edu.id)} className="text-red-400 text-xs">✕ Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Degree"><input value={edu.degree || ""} onChange={e => handlers.updateEducation(edu.id, "degree", e.target.value)} className="input-style" /></Field>
                  <Field label="School/Uni"><input value={edu.school || ""} onChange={e => handlers.updateEducation(edu.id, "school", e.target.value)} className="input-style" /></Field>
                  <Field label="Year"><input value={edu.year || ""} onChange={e => handlers.updateEducation(edu.id, "year", e.target.value)} className="input-style" /></Field>
                </div>
              </div>
            ))}
            <button onClick={handlers.addEducation} className="w-full py-3 border border-dashed border-blue-500/25 text-blue-400 rounded-2xl">+ Add Education</button>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="animate-fadeUp">
            <SectionHead title="Skills" sub="Add technical" />
            <div className="flex gap-3 mb-5">
              <input type="text" placeholder="React" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSkillAdd()} className="input-style flex-1" />
              <button onClick={handleSkillAdd} className="px-6 bg-pink-500 text-white rounded-xl text-xs font-bold">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs flex items-center gap-2">
                  {s} <button onClick={() => handlers.removeSkill(s)} className="text-pink-500">✕</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="animate-fadeUp">
            <SectionHead title="Projects" sub="Showcase work" />
            {data.projects?.map((proj) => (
              <div key={proj.id} className="bg-[#0e0e1e] border border-white/10 rounded-2xl p-5 mb-4">
                <div className="flex justify-between mb-4">
                  <span className="text-white/50 text-xs">Project Block</span>
                  <button onClick={() => handlers.removeProject(proj.id)} className="text-red-400 text-xs">✕ Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name"><input value={proj.name || ""} onChange={e => handlers.updateProject(proj.id, "name", e.target.value)} className="input-style" /></Field>
                  <Field label="Tech"><input value={proj.tech || ""} onChange={e => handlers.updateProject(proj.id, "tech", e.target.value)} className="input-style" /></Field>
                  <Field label="Link"><input value={proj.link || ""} onChange={e => handlers.updateProject(proj.id, "link", e.target.value)} className="input-style" /></Field>
                  <Field label="Description" className="col-span-2">
                    <textarea rows={2} value={proj.description || ""} onChange={e => handlers.updateProject(proj.id, "description", e.target.value)} className="input-style resize-none" />
                  </Field>
                </div>
              </div>
            ))}
            <button onClick={handlers.addProject} className="w-full py-3 border border-dashed border-orange-500/25 text-orange-400 rounded-2xl">+ Add Project</button>
          </div>
        )}

        {activeSection === "customize" && (
          <div className="animate-fadeUp text-center p-10 text-white/40">
             🎨 ডিজাইন প্যানেল থেকে কালার পরিবর্তন করুন।
          </div>
        )}
      </div>
    </div>
  );
};

const SectionHead = ({ title, sub }) => (
  <div className="mb-6">
    <h2 className="text-[17px] font-medium text-white">{title}</h2>
    <p className="text-[12px] text-white/30">{sub}</p>
    <div className="h-[2px] w-7 bg-pink-500 rounded mt-2" />
  </div>
);

const Field = ({ label, children, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[10.5px] font-medium text-white/30 uppercase">{label}</label>
    {children}
  </div>
);

export default FormPanel;