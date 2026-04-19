import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
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
  const [saveStatus, setSaveStatus] = useState("idle");
  
  
  const [aiLoading, setAiLoading] = useState(false); 
  
  const location = useLocation(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const isNew = params.get("new");

    if (isNew) {
      setResumeData(initialData);
      setResumeId(null);
    } else if (id) {
      loadResumeById(id);
    } else {
      loadLatestResume();
    }
  }, [location.search]);

  const loadResumeById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumeId(res.data._id);
      setResumeData(res.data);
      setActiveTemplate(res.data.template || "modern");
    } catch (err) {
      console.log("Error loading specific resume");
    }
  };

  const loadLatestResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/resume/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setResumeId(latest._id);
        setResumeData(latest);
        setActiveTemplate(latest.template || "modern");
      }
    } catch (err) {
      console.log("No resume found");
    }
  };

  const saveResume = async () => {
    setSaveStatus("saving");
    try {
      const token = localStorage.getItem("token");
      const payload = { ...resumeData, template: activeTemplate };

      if (resumeId) {
        await axios.put(`http://localhost:5000/api/resume/${resumeId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
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

  // --- Handlers ---
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
    saveResume, saveStatus,
    
    aiLoading, setAiLoading, 
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-[#080812] relative">
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

      <div className="w-1/2 overflow-y-auto border-r border-white/5">
        <FormPanel data={resumeData} handlers={handlers} />
      </div>

      <div className="w-1/2 overflow-y-auto bg-[#111118]">
        <PreviewPanel data={resumeData} template={activeTemplate} />
      </div>
    </div>
  );
};

export default ResumeBuilder;