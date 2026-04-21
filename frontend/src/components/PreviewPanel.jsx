import { useRef } from "react";

const PreviewPanel = ({ data, template, customize = {} }) => {
  const resumeRef = useRef();
  const c = customize.primaryColor || "#c45a8a";

  // ১. font size and spacing map
  const fontSizes = { small: "12px", medium: "14px", large: "18px" };
  const lineHeights = { tight: "1.2", normal: "1.6", loose: "2.2" };

  const dynamicStyle = {
    fontSize: fontSizes[customize.fontSize] || "14px",
    lineHeight: lineHeights[customize.spacing] || "1.6",
    color: "#374151", // Default gray-700
  };

  const downloadPDF = () => {
    const printWindow = window.open("", "_blank");
    const resumeHTML = resumeRef.current.outerHTML;
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
        } catch { return ""; }
      }).join("\n");

    printWindow.document.write(`
      <html>
        <head>
          <title>${data.personalInfo.name || "Resume"}</title>
          <style>
            ${styles}
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          </style>
        </head>
        <body>${resumeHTML}</body>
        <script>setTimeout(() => { window.print(); window.close(); }, 800);</script>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-5">
      <button
        onClick={downloadPDF}
        className="w-full mb-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-bold rounded-xl hover:opacity-90 shadow-lg transition-all"
      >
        ⬇ Download PDF
      </button>

      {/* main container where given dynamic style */}
      <div ref={resumeRef} style={dynamicStyle} className="resume-container shadow-2xl">
        {template === "modern" && <ModernTemplate data={data} c={c} />}
        {template === "classic" && <ClassicTemplate data={data} c={c} />}
        {template === "minimal" && <MinimalTemplate data={data} c={c} />}
        {template === "executive" && <ExecutiveTemplate data={data} c={c} />}
      </div>
    </div>
  );
};

// =====================
// MODERN TEMPLATE
// =====================
const ModernTemplate = ({ data, c }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;
  return (
    <div className="bg-white rounded-2xl overflow-hidden font-sans min-h-[1000px]">
      <div style={{ background: "#1a1a3e" }} className="p-8">
        <h1 className="text-3xl font-bold text-white leading-tight">{p.name || "Your Name"}</h1>
        <p style={{ color: c }} className="font-medium mt-1 uppercase tracking-wider">{p.title || "Job Title"}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-white/70 text-[11px] leading-none">
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.8fr]">
        <div className="bg-slate-50 p-6 border-r border-gray-100">
          {summary && <Section title="Summary" c={c}><p className="whitespace-pre-line">{summary}</p></Section>}
          {skills.length > 0 && (
            <Section title="Skills" c={c}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => <span key={s} style={{ background: `${c}15`, color: c }} className="px-2 py-1 rounded text-[10px] font-bold">{s}</span>)}
              </div>
            </Section>
          )}
          {education.length > 0 && (
            <Section title="Education" c={c}>
              {education.map(e => (
                <div key={e.id} className="mb-3">
                  <p className="font-bold text-gray-800">{e.degree}</p>
                  <p className="text-gray-500 text-[0.9em]">{e.school} | {e.year}</p>
                </div>
              ))}
            </Section>
          )}
        </div>
        <div className="p-6">
          <Section title="Experience" c={c}>
            {experience.map(e => (
              <div key={e.id} className="mb-5 pl-4 border-l-2 border-slate-100">
                <p className="font-bold text-gray-800 text-[1.1em]">{e.role}</p>
                <p style={{ color: c }} className="text-[0.9em] font-semibold">{e.company} | {e.duration}</p>
                <p className="mt-2 whitespace-pre-line text-gray-600">{e.description}</p>
              </div>
            ))}
          </Section>
          {projects?.length > 0 && (
            <Section title="Projects" c={c}>
              {projects.map(pr => (
                <div key={pr.id} className="mb-4 pl-4 border-l-2 border-slate-100">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">{pr.name}</p>
                    {pr.link && <a href={pr.link} className="text-[10px] text-blue-500 underline">Link</a>}
                  </div>
                  <p style={{ color: c }} className="text-[0.9em] font-medium">{pr.tech}</p>
                  <p className="text-gray-600 mt-1">{pr.description}</p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

// =====================
// CLASSIC TEMPLATE
// =====================
const ClassicTemplate = ({ data, c }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;
  return (
    <div className="bg-white p-10 font-sans min-h-[1000px]">
      <div className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: c }}>
        <h1 className="text-4xl font-bold text-gray-900 uppercase leading-none">{p.name}</h1>
        <p className="font-bold tracking-widest mt-2" style={{ color: c }}>{p.title}</p>
        <div className="flex justify-center gap-4 mt-3 text-[11px] text-gray-500">
          <span>{p.email}</span><span>|</span><span>{p.phone}</span><span>|</span><span>{p.location}</span>
        </div>
      </div>
      {summary && <div className="mb-8 text-center italic px-10 border-l-4 border-r-4 border-transparent">"{summary}"</div>}
      <ClassicSection title="EXPERIENCE" c={c}>
        {experience.map(e => (
          <div key={e.id} className="mb-6">
            <div className="flex justify-between font-bold text-gray-900">
              <span>{e.role}</span><span style={{ color: c }}>{e.duration}</span>
            </div>
            <p className="text-[0.9em] font-semibold uppercase text-gray-500 mb-2">{e.company}</p>
            <p className="text-gray-600 whitespace-pre-line">{e.description}</p>
          </div>
        ))}
      </ClassicSection>
      {projects?.length > 0 && (
        <ClassicSection title="PROJECTS" c={c}>
          {projects.map(pr => (
            <div key={pr.id} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{pr.name}</span>{pr.link && <span className="text-blue-500 text-[10px]">{pr.link}</span>}
              </div>
              <p style={{ color: c }} className="text-[0.9em] font-medium">{pr.tech}</p>
              <p className="text-gray-600">{pr.description}</p>
            </div>
          ))}
        </ClassicSection>
      )}
      <div className="grid grid-cols-2 gap-10 mt-8">
        <ClassicSection title="EDUCATION" c={c}>
          {education.map(e => (
            <div key={e.id} className="mb-3">
              <p className="font-bold text-gray-900">{e.degree}</p>
              <p className="text-[0.9em] text-gray-500">{e.school} | {e.year}</p>
            </div>
          ))}
        </ClassicSection>
        <ClassicSection title="SKILLS" c={c}>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="px-2 py-1 border text-[10px] font-bold uppercase" style={{ borderColor: `${c}40`, color: c }}>{s}</span>)}
          </div>
        </ClassicSection>
      </div>
    </div>
  );
};

// =====================
// MINIMAL TEMPLATE
// =====================
const MinimalTemplate = ({ data, c }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;
  return (
    <div className="bg-white p-12 font-sans min-h-[1000px] border-t-[15px]" style={{ borderColor: c }}>
      <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">{p.name}</h1>
      <p className="text-xl font-bold mt-2 uppercase tracking-[0.2em]" style={{ color: c }}>{p.title}</p>
      <div className="mt-12 grid grid-cols-[1fr_2.5fr] gap-12">
        <div className="space-y-10">
           <div>
             <h3 className="text-[11px] font-black uppercase mb-4 border-b-2 pb-1" style={{ borderColor: c }}>Contact</h3>
             <div className="space-y-1 text-gray-500 text-[0.9em]">
               <p>{p.email}</p><p>{p.phone}</p><p>{p.location}</p>
             </div>
           </div>
           <div>
             <h3 className="text-[11px] font-black uppercase mb-4 border-b-2 pb-1" style={{ borderColor: c }}>Expertise</h3>
             <div className="flex flex-col gap-2">
                {skills.map(s => <span key={s} className="font-bold text-gray-700 text-[0.9em]">• {s}</span>)}
             </div>
           </div>
           <div>
             <h3 className="text-[11px] font-black uppercase mb-4 border-b-2 pb-1" style={{ borderColor: c }}>Education</h3>
             {education.map(e => (
               <div key={e.id} className="mb-4">
                 <p className="font-bold text-gray-800 leading-tight">{e.degree}</p>
                 <p className="text-gray-500 text-[0.85em] mt-1">{e.year}</p>
               </div>
             ))}
           </div>
        </div>
        <div className="space-y-10">
          {summary && <p className="text-gray-600 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: `${c}40` }}>{summary}</p>}
          <div>
            <h3 className="text-lg font-black uppercase mb-6 tracking-widest border-b-2" style={{ borderColor: '#eee' }}>Work History</h3>
            {experience.map(e => (
              <div key={e.id} className="mb-8">
                <p className="font-bold text-gray-900 text-lg">{e.role} <span className="text-gray-300 mx-2">/</span> <span style={{ color: c }}>{e.company}</span></p>
                <p className="text-[10px] text-gray-400 mb-3 uppercase font-black tracking-widest">{e.duration}</p>
                <p className="text-gray-600 whitespace-pre-line">{e.description}</p>
              </div>
            ))}
          </div>
          {projects?.length > 0 && (
            <div>
              <h3 className="text-lg font-black uppercase mb-6 tracking-widest border-b-2" style={{ borderColor: '#eee' }}>Projects</h3>
              {projects.map(pr => (
                <div key={pr.id} className="mb-6">
                  <p className="font-bold text-gray-900">{pr.name}</p>
                  <p className="text-[11px] font-bold mb-2 uppercase" style={{ color: c }}>{pr.tech}</p>
                  <p className="text-gray-600">{pr.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =====================
// EXECUTIVE TEMPLATE
// =====================
const ExecutiveTemplate = ({ data, c }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;
  return (
    <div className="bg-slate-100 p-8 min-h-[1000px]">
      <div className="bg-white p-12 shadow-sm border border-slate-200">
        <div className="flex justify-between items-end border-b-8 pb-8 mb-10" style={{ borderColor: c }}>
          <div>
            <h1 className="text-4xl font-black text-slate-800 leading-none">{p.name}</h1>
            <p className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-tighter">{p.title}</p>
          </div>
          <div className="text-right text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
             <p>{p.email}</p><p>{p.phone}</p><p>{p.location}</p>
          </div>
        </div>
        {summary && <div className="mb-12 text-slate-700 bg-slate-50 p-6 border-l-8" style={{ borderColor: c }}>{summary}</div>}
        <div className="space-y-12">
          <Section title="Professional Career" c={c}>
            {experience.map(e => (
              <div key={e.id} className="mb-8">
                <div className="flex justify-between mb-2">
                  <p className="font-black text-slate-800 uppercase tracking-tight">{e.role}</p>
                  <p className="text-[11px] font-bold text-slate-400">{e.duration}</p>
                </div>
                <p className="font-bold text-sm mb-3" style={{ color: c }}>{e.company}</p>
                <p className="text-slate-600 text-justify">{e.description}</p>
              </div>
            ))}
          </Section>
          {projects?.length > 0 && (
            <Section title="Key Initiatives" c={c}>
              {projects.map(pr => (
                <div key={pr.id} className="mb-6">
                  <p className="font-black text-slate-800 uppercase">{pr.name}</p>
                  <p className="text-[11px] font-bold mb-2 uppercase" style={{ color: c }}>{pr.tech}</p>
                  <p className="text-slate-600">{pr.description}</p>
                </div>
              ))}
            </Section>
          )}
          <div className="grid grid-cols-2 gap-12">
            <Section title="Academic Background" c={c}>
              {education.map(e => (
                <div key={e.id} className="mb-4">
                  <p className="font-black text-slate-800 uppercase text-[0.9em]">{e.degree}</p>
                  <p className="text-[11px] text-slate-500 font-bold mt-1">{e.school} | {e.year}</p>
                </div>
              ))}
            </Section>
            <Section title="Core Competencies" c={c}>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => <span key={s} className="text-[10px] font-bold text-slate-600 border-2 px-3 py-1 uppercase tracking-tighter" style={{ borderColor: '#eee' }}>{s}</span>)}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================
// HELPERS
// =====================
const Section = ({ title, children, c }) => (
  <div className="mb-8">
    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
      <span className="w-8 h-[2px]" style={{ background: c }} /> {title}
    </h3>
    <div className="text-inherit">{children}</div>
  </div>
);

const ClassicSection = ({ title, children, c }) => (
  <div className="mb-8">
    <h3 className="text-sm font-black tracking-[0.2em] border-b-2 pb-1 mb-5" style={{ color: c, borderColor: `${c}20` }}>{title}</h3>
    <div className="text-inherit">{children}</div>
  </div>
);

export default PreviewPanel;