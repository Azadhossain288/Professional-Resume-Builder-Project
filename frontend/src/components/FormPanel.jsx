import { useState } from "react";

const FormPanel = ({ data, handlers }) => {
  const [skillInput, setSkillInput] = useState("");
  const [activeSection, setActiveSection] = useState("personal");

  const sections = [
    { id: "personal", label: "👤 Personal" },
    { id: "summary", label: "✍️ Summary" },
    { id: "experience", label: "💼 Experience" },
    { id: "education", label: "🎓 Education" },
    { id: "skills", label: "⚡ Skills" },
  ];

  const handleSkillAdd = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      handlers.addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  return (
    <div className="p-6">
      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === s.id
                ? "bg-pink-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeSection === "personal" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { field: "name", label: "Full Name", placeholder: "Azad Hossain" },
            { field: "title", label: "Job Title", placeholder: "Frontend Developer" },
            { field: "email", label: "Email", placeholder: "you@email.com" },
            { field: "phone", label: "Phone", placeholder: "+880 1XXX-XXXXXX" },
            { field: "location", label: "Location", placeholder: "Dhaka, Bangladesh" },
            { field: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/..." },
          ].map(({ field, label, placeholder }) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={data.personalInfo[field]}
                onChange={e => handlers.updatePersonalInfo(field, e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all"
              />
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {activeSection === "summary" && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 uppercase tracking-wider">Professional Summary</label>
          <textarea
            rows={6}
            placeholder="A passionate developer with 3+ years of experience..."
            value={data.summary}
            onChange={e => handlers.updateSummary(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all resize-none"
          />
        </div>
      )}

      {/* Experience */}
      {activeSection === "experience" && (
        <div className="flex flex-col gap-4">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-pink-400">Experience #{idx + 1}</span>
                {data.experience.length > 1 && (
                  <button
                    onClick={() => handlers.removeExperience(exp.id)}
                    className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-1 rounded"
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
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={exp[field]}
                      onChange={e => handlers.updateExperience(exp.id, field, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pink-500 transition-all"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
                  <textarea
                    rows={3}
                    placeholder="What did you accomplish here?"
                    value={exp.description}
                    onChange={e => handlers.updateExperience(exp.id, "description", e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-pink-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handlers.addExperience}
            className="w-full py-2 border border-dashed border-pink-500/50 text-pink-400 rounded-xl text-sm hover:bg-pink-500/10 transition-all"
          >
            + Add Experience
          </button>
        </div>
      )}

      {/* Education */}
      {activeSection === "education" && (
        <div className="flex flex-col gap-4">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-blue-400">Education #{idx + 1}</span>
                {data.education.length > 1 && (
                  <button
                    onClick={() => handlers.removeEducation(edu.id)}
                    className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-1 rounded"
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
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={edu[field]}
                      onChange={e => handlers.updateEducation(edu.id, field, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handlers.addEducation}
            className="w-full py-2 border border-dashed border-blue-500/50 text-blue-400 rounded-xl text-sm hover:bg-blue-500/10 transition-all"
          >
            + Add Education
          </button>
        </div>
      )}

      {/* Skills */}
      {activeSection === "skills" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Add Skill (Enter চাপো)</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, Python..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleSkillAdd}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 focus:bg-green-500/5 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span
                key={skill}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => handlers.removeSkill(skill)}
                  className="hover:text-red-400 transition-colors"
                >×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPanel;