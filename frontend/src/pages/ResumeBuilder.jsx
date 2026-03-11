import { useState } from "react";
import FormPanel from "../components/FormPanel";
import PreviewPanel from "../components/PreviewPanel";

const initialData = {
  personalInfo: { name: "", title: "", email: "", phone: "", location: "", linkedin: "" },
  summary: "",
  experience: [{ id: 1, role: "", company: "", duration: "", description: "" }],
  education: [{ id: 1, degree: "", school: "", year: "" }],
  skills: [],
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(initialData);
  const [activeTemplate, setActiveTemplate] = useState("modern");

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), role: "", company: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), degree: "", school: "", year: "" }]
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    if (!skill || resumeData.skills.includes(skill)) return;
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const removeSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handlers = {
    updatePersonalInfo, updateSummary,
    updateExperience, addExperience, removeExperience,
    updateEducation, addEducation, removeEducation,
    addSkill, removeSkill,
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-gray-950 relative">
      {/* Template Selector */}
      <div className="absolute top-3 right-4 z-10 flex gap-2">
        {["modern", "classic", "minimal"].map(t => (
          <button
            key={t}
            onClick={() => setActiveTemplate(t)}
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
              activeTemplate === t
                ? "bg-pink-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Left — Form */}
      <div className="w-1/2 overflow-y-auto border-r border-white/10">
        <FormPanel data={resumeData} handlers={handlers} />
      </div>

      {/* Right — Preview */}
      <div className="w-1/2 overflow-y-auto bg-gray-100">
        <PreviewPanel data={resumeData} template={activeTemplate} />
      </div>
    </div>
  );
};

export default ResumeBuilder;