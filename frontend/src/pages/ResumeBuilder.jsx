import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import axios from "axios";
import FormPanel from "../components/FormPanel";
import PreviewPanel from "../components/PreviewPanel";
import CustomizePanel from "../components/CustomizePanel";

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
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeId, setResumeId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  
  const [customize, setCustomize] = useState({
    fontSize: "medium",
    spacing: "normal",
    primaryColor: "#c45a8a",
  });
  
  const [aiLoading, setAiLoading] = useState(false); 
  const location = useLocation(); 

  // --- LOCAL STORAGE LOGIC ---
  // data load
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (err) {
        console.error("Local storage parse error:", err);
      }
    }
  }, []);

  // if data change than save storage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // --- URL PARAMS & API LOGIC ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const isNew = params.get("new");

    if (isNew) {
      setResumeData(initialData);
      setResumeId(null);
      localStorage.removeItem("resumeData"); // for new resume clean storage
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

  // --- HANDLERS ---
  const handlers = {
    updatePersonalInfo: (field, value) => setResumeData(p => ({ ...p, personalInfo: { ...p.personalInfo, [field]: value } })),
    updateSummary: (v) => setResumeData(p => ({ ...p, summary: v })),
    updateExperience: (id, f, v) => setResumeData(p => ({ ...p, experience: p.experience.map(e => e.id === id ? { ...e, [f]: v } : e) })),
    addExperience: () => setResumeData(p => ({ ...p, experience: [...p.experience, { id: Date.now(), role: "", company: "", duration: "", description: "" }] })),
    removeExperience: (id) => setResumeData(p => ({ ...p, experience: p.experience.filter(e => e.id !== id) })),
    updateEducation: (id, f, v) => setResumeData(p => ({ ...p, education: p.education.map(e => e.id === id ? { ...e, [f]: v } : e) })),
    addEducation: () => setResumeData(p => ({ ...p, education: [...p.education, { id: Date.now(), degree: "", school: "", year: "" }] })),
    removeEducation: (id) => setResumeData(p => ({ ...p, education: p.education.filter(e => e.id !== id) })),
    addSkill: (s) => !resumeData.skills.includes(s) && setResumeData(p => ({ ...p, skills: [...p.skills, s] })),
    removeSkill: (s) => setResumeData(p => ({ ...p, skills: p.skills.filter(sk => sk !== s) })),
    updateProject: (id, f, v) => setResumeData(p => ({ ...p, projects: p.projects.map(pr => pr.id === id ? { ...pr, [f]: v } : pr) })),
    addProject: () => setResumeData(p => ({ ...p, projects: [...p.projects, { id: Date.now(), name: "", tech: "", link: "", description: "" }] })),
    removeProject: (id) => setResumeData(p => ({ ...p, projects: p.projects.filter(pr => pr.id !== id) })),
    saveResume,
    saveStatus,
    activeSection,
    setActiveSection,
    customize,
    setCustomize,
    aiLoading,
    setAiLoading,
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-[#080812] overflow-hidden">
      
      {/* Aditor panel */}
      <div className="w-[45%] overflow-y-auto border-r border-white/5 relative">
        {activeSection === 'customize' ? (
          <div className="p-6">
             <button 
               onClick={() => setActiveSection('personal')}
               className="text-pink-500 text-xs mb-4 flex items-center gap-1 hover:underline font-bold"
             >
               ← Back to Sections
             </button>
             <CustomizePanel customize={customize} setCustomize={setCustomize}/>
          </div>
        ) : (
          <FormPanel data={resumeData} handlers={handlers} />
        )}
      </div>

      {/* Preview panel */}
      <div className="flex-1 overflow-y-auto bg-[#111118] relative p-4">
        
        {/* template */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {["modern", "classic", "minimal", "executive"].map(t => (
              <button
                key={t}
                onClick={() => setActiveTemplate(t)}
                className={`px-5 py-1.5 rounded-full text-[11px] font-bold capitalize transition-all ${
                  activeTemplate === t
                    ? "bg-pink-500 text-white shadow-lg"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* preview panel for resume */}
        <div className="flex justify-center pb-20">
           <div className="w-full max-w-[800px]">
              <PreviewPanel data={resumeData} template={activeTemplate} customize={customize} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;