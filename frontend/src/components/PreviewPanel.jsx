import { useRef } from "react";

const PreviewPanel = ({ data, template }) => {
  const resumeRef = useRef();

 const downloadPDF = () => {
  const printWindow = window.open("", "_blank");
  
  
  const resumeHTML = resumeRef.current.outerHTML;
  
  
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.personalInfo.name || "Resume"}</title>
      <style>
        ${styles}
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          background: white;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        @media print {
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      ${resumeHTML}
    </body>
    </html>
  `);

  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 1000);
};

  return (
    <div className="p-5">
      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="w-full mb-4 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-pink-500/20"
      >
        ⬇ Download PDF
      </button>

      {/* Resume */}
      <div ref={resumeRef}>
        {template === "modern" && <ModernTemplate data={data} />}
        {template === "classic" && <ClassicTemplate data={data} />}
        {template === "minimal" && <MinimalTemplate data={data} />}
      </div>
    </div>
  );
};

// =====================
// MODERN TEMPLATE
// =====================
const ModernTemplate = ({ data }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a3e] to-[#1a3a5c] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-500/20 -translate-y-1/2 translate-x-1/2" />
        <h1 className="text-3xl font-bold text-white relative z-10">
          {p.name || <span className="text-white/30">Your Name</span>}
        </h1>
        <p className="text-pink-400 font-medium mt-1 relative z-10">
          {p.title || <span className="text-white/20">Job Title</span>}
        </p>
        <div className="flex flex-wrap gap-4 mt-4 relative z-10">
          {p.email && <ContactChip icon="✉" text={p.email} />}
          {p.phone && <ContactChip icon="📞" text={p.phone} />}
          {p.location && <ContactChip icon="📍" text={p.location} />}
          {p.linkedin && <ContactChip icon="🔗" text={p.linkedin} />}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_1.6fr]">
        {/* Sidebar */}
        <div className="bg-purple-50 p-6">
          {summary && (
            <Section title="Summary">
              <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
            </Section>
          )}
          {skills.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">{s}</span>
                ))}
              </div>
            </Section>
          )}
          {education.some(e => e.degree || e.school) && (
            <Section title="Education">
              {education.filter(e => e.degree || e.school).map(e => (
                <div key={e.id} className="mb-3">
                  <p className="font-semibold text-gray-800 text-sm">{e.degree}</p>
                  <p className="text-gray-500 text-xs">{e.school}</p>
                  {e.year && <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full mt-1 inline-block">{e.year}</span>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Main */}
        <div className="p-6 border-l border-gray-100">
          {experience.some(e => e.role || e.company) && (
            <Section title="Experience">
              {experience.filter(e => e.role || e.company).map(e => (
                <div key={e.id} className="mb-4 pl-4 border-l-2 border-pink-200">
                  <p className="font-bold text-gray-800 text-sm">{e.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-gray-500 text-xs">{e.company}</p>
                    {e.duration && <span className="text-xs bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full">{e.duration}</span>}
                  </div>
                  {e.description && <p className="text-gray-600 text-xs mt-2 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects?.some(p => p.name) && (
            <Section title="Projects">
              {projects.filter(p => p.name).map(p => (
                <div key={p.id} className="mb-4 pl-4 border-l-2 border-orange-200">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer"
                        className="text-[10px] bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                        🔗 Live
                      </a>
                    )}
                  </div>
                  {p.tech && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.tech.split(",").map(t => (
                        <span key={t} className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  {p.description && <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">{p.description}</p>}
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
const ClassicTemplate = ({ data }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl font-sans">
      <div className="bg-gray-900 p-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          {p.name || <span className="text-white/30">Your Name</span>}
        </h1>
        <p className="text-yellow-400 mt-1 font-medium">
          {p.title || <span className="text-white/20">Job Title</span>}
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-3">
          {p.email && <span className="text-gray-400 text-xs">✉ {p.email}</span>}
          {p.phone && <span className="text-gray-400 text-xs">📞 {p.phone}</span>}
          {p.location && <span className="text-gray-400 text-xs">📍 {p.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {summary && (
          <ClassicSection title="PROFILE">
            <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
          </ClassicSection>
        )}
        {experience.some(e => e.role || e.company) && (
          <ClassicSection title="EXPERIENCE">
            {experience.filter(e => e.role || e.company).map(e => (
              <div key={e.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800 text-sm">{e.role}</p>
                  {e.duration && <span className="text-xs text-gray-400">{e.duration}</span>}
                </div>
                <p className="text-yellow-600 text-xs font-medium">{e.company}</p>
                {e.description && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{e.description}</p>}
              </div>
            ))}
          </ClassicSection>
        )}
        {projects?.some(p => p.name) && (
          <ClassicSection title="PROJECTS">
            {projects.filter(p => p.name).map(p => (
              <div key={p.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-yellow-600">🔗 Live</a>}
                </div>
                {p.tech && <p className="text-yellow-600 text-xs font-medium">{p.tech}</p>}
                {p.description && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{p.description}</p>}
              </div>
            ))}
          </ClassicSection>
        )}
        {education.some(e => e.degree || e.school) && (
          <ClassicSection title="EDUCATION">
            {education.filter(e => e.degree || e.school).map(e => (
              <div key={e.id} className="mb-3 flex justify-between">
                <div>
                  <p className="font-bold text-gray-800 text-sm">{e.degree}</p>
                  <p className="text-gray-500 text-xs">{e.school}</p>
                </div>
                {e.year && <span className="text-xs text-gray-400">{e.year}</span>}
              </div>
            ))}
          </ClassicSection>
        )}
        {skills.length > 0 && (
          <ClassicSection title="SKILLS">
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs">{s}</span>
              ))}
            </div>
          </ClassicSection>
        )}
      </div>
    </div>
  );
};

// =====================
// MINIMAL TEMPLATE
// =====================
const MinimalTemplate = ({ data }) => {
  const { personalInfo: p, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl font-sans p-10">
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          {p.name || <span className="text-gray-200">Your Name</span>}
        </h1>
        <p className="text-gray-500 mt-1">
          {p.title || <span className="text-gray-200">Job Title</span>}
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          {p.email && <span className="text-gray-400 text-xs">{p.email}</span>}
          {p.phone && <span className="text-gray-400 text-xs">{p.phone}</span>}
          {p.location && <span className="text-gray-400 text-xs">{p.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        </div>
      )}
      {experience.some(e => e.role || e.company) && (
        <MinimalSection title="Experience">
          {experience.filter(e => e.role || e.company).map(e => (
            <div key={e.id} className="mb-4">
              <div className="flex justify-between">
                <p className="font-bold text-gray-800 text-sm">{e.role} — <span className="font-normal text-gray-500">{e.company}</span></p>
                {e.duration && <span className="text-xs text-gray-400">{e.duration}</span>}
              </div>
              {e.description && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{e.description}</p>}
            </div>
          ))}
        </MinimalSection>
      )}
      {projects?.some(p => p.name) && (
        <MinimalSection title="Projects">
          {projects.filter(p => p.name).map(p => (
            <div key={p.id} className="mb-4">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800 text-sm">
                  {p.name}
                  {p.tech && <span className="font-normal text-gray-400 text-xs"> — {p.tech}</span>}
                </p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-gray-400">🔗</a>}
              </div>
              {p.description && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{p.description}</p>}
            </div>
          ))}
        </MinimalSection>
      )}
      {education.some(e => e.degree || e.school) && (
        <MinimalSection title="Education">
          {education.filter(e => e.degree || e.school).map(e => (
            <div key={e.id} className="mb-2 flex justify-between">
              <p className="text-sm text-gray-700">{e.degree} — <span className="text-gray-500">{e.school}</span></p>
              {e.year && <span className="text-xs text-gray-400">{e.year}</span>}
            </div>
          ))}
        </MinimalSection>
      )}
      {skills.length > 0 && (
        <MinimalSection title="Skills">
          <p className="text-sm text-gray-600">{skills.join(" · ")}</p>
        </MinimalSection>
      )}
    </div>
  );
};

// =====================
// HELPER COMPONENTS
// =====================
const ContactChip = ({ icon, text }) => (
  <div className="flex items-center gap-1.5 text-white/70 text-xs">
    <span>{icon}</span><span>{text}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
      <span className="w-4 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded" />
      {title}
    </h3>
    {children}
  </div>
);

const ClassicSection = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="text-xs font-black text-gray-900 tracking-widest border-b border-gray-200 pb-1 mb-3">{title}</h3>
    {children}
  </div>
);

const MinimalSection = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">{title}</h3>
    {children}
  </div>
);

export default PreviewPanel;