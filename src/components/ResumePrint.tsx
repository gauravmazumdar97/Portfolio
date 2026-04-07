import React from 'react';
import resumeData from '../resume.json';

export const ResumePrint: React.FC = () => {
  return (
    <div className="hidden print:block p-12 bg-white text-black font-serif">
      <header className="border-b-2 border-black pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase mb-2">{resumeData.basics.name}</h1>
        <p className="text-lg mb-4">{resumeData.basics.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{resumeData.basics.location}</span>
          <span>{resumeData.basics.email}</span>
          <span>{resumeData.basics.phone}</span>
          {resumeData.basics.links.map((link, i) => (
            <span key={i}>{link.url}</span>
          ))}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase border-b border-black mb-4">Summary</h2>
        <p className="leading-relaxed">{resumeData.basics.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase border-b border-black mb-4">Experience</h2>
        <div className="space-y-6">
          {resumeData.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between font-bold">
                <span>{exp.role} | {exp.company}</span>
                <span>{exp.dates}</span>
              </div>
              <p className="italic text-sm mb-2">{exp.location}</p>
              {exp.bullets.length > 0 && (
                <ul className="list-disc ml-5 space-y-1">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase border-b border-black mb-4">Education</h2>
        <div className="space-y-4">
          {resumeData.education.map((edu, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <p className="font-bold">{edu.institution}</p>
                <p>{edu.degree}</p>
              </div>
              <span className="font-bold">{edu.dates}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold uppercase border-b border-black mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {resumeData.skills.map((group, i) => (
            <div key={i}>
              <p className="font-bold mb-1">{group.category}</p>
              <p>{group.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
