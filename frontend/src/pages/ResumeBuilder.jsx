import { useState, useEffect } from "react";
import axios from "axios";
import FormPanel from "../components/FormPanel";
import PreviewPanel from "../components/PreviewPanel";

const initialData = {
  personalInfo: { name: "", title: "", email: "", phone: "", location: "", linkedin: "" },
  summary: "",
  experience: [{ id: 1, role: "", company: "", duration: "", description: "" }],
  education: [{ id: 1, degree: "", school: "", year: "" }],
  skills: [],
  projects: [{ id: 1, name: "", tech: "", link: "", description: "" }],
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(initialData);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [resumeId, setResumeId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error

  // Login করলে আগের resume load করো
  useEffect(() => {
    const loadResume = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/resume/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.length > 0) {
          const latest = res.data[res.data.length - 1];
          setResumeId(latest._id);
          setResumeData({
            personalInfo: latest.personalInfo || initialData.personalInfo,
            summary: latest.summary || "",
            experience: latest.experience || initialData.experience,
            education: latest.education || initialData.education,
            skills: latest.skills || [],
            projects: latest.projects || initialData.projects,
          });
        }
      } catch (err) {
        console.log("No resume found");
      }
    };
    loadResume();
  }, []);

  // Save resume
  const saveResume = async () => {
    setSaveStatus("saving");
    try {
      const token = localStorage.getItem("token");
      const payload = {
        personalInfo: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
        template: activeTemplate,
      };

      if (resumeId) {
        // আগে save করা থাকলে update করো
        await axios.put(`http://localhost:5000/api/resume/${resumeId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // নতুন save করো
        const res = await axios.post("http://localhost:5000/api/resume/save", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResumeId(res.data.resume._id);
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

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

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now(), name: "", tech: "", link: "", description: "" }]
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handlers = {
    updatePersonalInfo, updateSummary,
    updateExperience, addExperience, removeExperience,
    updateEducation, addEducation, removeEducation,
    addSkill, removeSkill,
    updateProject, addProject, removeProject,
    saveResume, saveStatus, // ← FormPanel এ pass করো
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-[#080812] relative">
      {/* Template Selector */}
      <div className="absolute top-3 right-4 z-10 flex gap-2">
        {["modern", "classic", "minimal"].map(t => (
          <button
            key={t}
            onClick={() => setActiveTemplate(t)}
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
              activeTemplate === t
                ? "bg-pink-500 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Left — Form */}
      <div className="w-1/2 overflow-y-auto border-r border-white/5">
        <FormPanel data={resumeData} handlers={handlers} />
      </div>

      {/* Right — Preview */}
      <div className="w-1/2 overflow-y-auto bg-[#111118]">
        <PreviewPanel data={resumeData} template={activeTemplate} />
      </div>
    </div>
  );
};

export default ResumeBuilder;