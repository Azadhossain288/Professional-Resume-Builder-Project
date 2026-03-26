import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/resume/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(res.data);
    } catch (err) {
      console.log("Error fetching resumes");
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.log("Error deleting");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-[#080812] p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-white">My Resumes</h1>
            <p className="text-white/30 text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-pink-500 text-white text-sm font-medium rounded-xl hover:bg-pink-600 hover:-translate-y-0.5 transition-all"
          >
            + Create New
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && resumes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-white/50 text-lg font-medium">No resumes yet</h2>
            <p className="text-white/25 text-sm mt-2">Create your first resume to get started</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-pink-500/15 border border-pink-500/30 text-pink-400 rounded-xl text-sm hover:bg-pink-500/25 transition-all"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume Grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-[#0d0d1a] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all group"
              >
                {/* Resume Preview Card */}
                <div className="h-40 bg-gradient-to-br from-[#1a1a3e] to-[#0d2a48] relative overflow-hidden p-5">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-500/10 -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <h3 className="text-white font-medium text-lg leading-tight">
                      {resume.personalInfo?.name || "Untitled Resume"}
                    </h3>
                    <p className="text-pink-400 text-sm mt-0.5">
                      {resume.personalInfo?.title || "No title"}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {resume.skills?.slice(0, 3).map(s => (
                        <span key={s} className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                      {resume.skills?.length > 3 && (
                        <span className="text-[10px] bg-white/10 text-white/40 px-2 py-0.5 rounded-full">+{resume.skills.length - 3}</span>
                      )}
                    </div>
                  </div>
                  {/* Template Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded-full capitalize">
                      {resume.template || "modern"}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[11px] text-white/25">Last updated</p>
                      <p className="text-[12px] text-white/50 mt-0.5">{formatDate(resume.updatedAt)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                      <span>{resume.experience?.length || 0} exp</span>
                      <span>·</span>
                      <span>{resume.skills?.length || 0} skills</span>
                      <span>·</span>
                      <span>{resume.projects?.length || 0} projects</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/?id=${resume._id}`)}
                      className="flex-1 py-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-xl text-[12px] font-medium hover:bg-pink-500/20 transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[12px] hover:bg-red-500/20 transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResumes;