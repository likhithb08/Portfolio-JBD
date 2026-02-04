
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 font-mono text-sm">{subtitle}</p>}
      <div className="h-1 w-12 bg-sky-500 mt-4"></div>
    </div>
  );
};

export default SectionHeading;
