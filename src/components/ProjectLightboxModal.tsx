import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { StarWareProject } from '../data/starwareData';
import { ResilientImage } from './ResilientImage';

interface ProjectLightboxModalProps {
  project: StarWareProject | null;
  onClose: () => void;
  onSelectProject: (project: StarWareProject) => void;
  allProjects: StarWareProject[];
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [copiedClone, setCopiedClone] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const idx = allProjects.findIndex((p) => p.id === project.id);
        const next = allProjects[(idx + 1) % allProjects.length];
        onSelectProject(next);
      } else if (e.key === 'ArrowLeft') {
        const idx = allProjects.findIndex((p) => p.id === project.id);
        const prev =
          allProjects[(idx - 1 + allProjects.length) % allProjects.length];
        onSelectProject(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const cloneCommand = `git clone https://gitflic.ru/user/starware/${project.repoSlug}.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0B0B0D] border border-zinc-800 rounded-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Lightbox Header Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800/80 bg-[#08080A]">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-zinc-300">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(allProjects.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.platformLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.stackLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.license}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              aria-label={`Previous project: ${prevProject.name}`}
              title={`Previous: ${prevProject.name}`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              aria-label={`Next project: ${nextProject.name}`}
              title={`Next: ${nextProject.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              aria-label="Close project monograph"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Lightbox Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual / Architectural Media Column */}
          <div className="lg:col-span-6 bg-[#050505] border-b lg:border-b-0 lg:border-r border-zinc-800/80 flex flex-col justify-between">
            {project.image ? (
              <div className="relative h-72 sm:h-80 lg:h-96 w-full overflow-hidden bg-zinc-950">
                <ResilientImage
                  src={project.image}
                  alt={`${project.name} showcase preview`}
                  fallbackTitle={project.name}
                  fallbackSubtitle={project.subtitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-zinc-300">
                  <span>StarWare Reference Build</span>
                  <span className="font-mono text-zinc-400">
                    {project.repoSlug}.git
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-br from-zinc-900/50 via-[#070709] to-[#050505] flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>StarWare Ecosystem Utility</span>
                  <span>{project.platformLabel}</span>
                </div>
                <div className="my-8">
                  <Terminal className="w-9 h-9 text-[#F2B705] mb-4" />
                  <p className="font-display text-2xl font-semibold text-zinc-100 tracking-tight">
                    {project.name}
                  </p>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
                <div className="text-xs text-zinc-400">
                  Key Focus: <span className="text-zinc-200">{project.keyFocus}</span>
                </div>
              </div>
            )}

            {/* Quantitative Metrics Row inside Lightbox */}
            <div className="grid grid-cols-3 divide-x divide-zinc-800/80 border-t border-zinc-800/80 bg-[#09090B]">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="p-4">
                  <div className="text-xs text-zinc-500">{metric.label}</div>
                  <div className="font-mono text-base font-semibold text-zinc-100 mt-1 tabular-nums">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specification & Clone Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs text-zinc-400 mb-2">
                <span>
                  {project.tier === 'flagship'
                    ? 'Flagship Architecture'
                    : 'Specialized Ecosystem Utility'}
                </span>
                <span aria-hidden="true"> · </span>
                <span>{project.year}</span>
                <span aria-hidden="true"> · </span>
                <span>Zero Telemetry</span>
              </div>

              <h2
                id="modal-project-title"
                className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
              >
                {project.name}
              </h2>
              {project.subtitle && (
                <p className="text-sm text-zinc-400 mt-1">{project.subtitle}</p>
              )}

              <p className="text-sm text-zinc-300 leading-relaxed mt-5">
                {project.architectureOverview}
              </p>

              <div className="mt-6 pt-5 border-t border-zinc-800/80">
                <h3 className="text-xs font-semibold text-zinc-400 tracking-wide mb-3">
                  Engineering Highlights
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#F2B705] mt-1 shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Clone & GitFlic Action Footer */}
            <div className="mt-8 pt-5 border-t border-zinc-800/80 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                  <span>GitFlic Source Mirror</span>
                  <span className="font-mono text-zinc-500">GPLv3 Sovereign</span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-[#050505] border border-zinc-800 rounded-lg px-3.5 py-2.5">
                  <code className="text-xs text-zinc-200 font-mono truncate">
                    {cloneCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyClone}
                    className="px-3 py-1.5 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-md flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedClone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F2B705]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Clone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={project.gitflicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-[#F2B705] hover:bg-[#eab000] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inspect Repository on GitFlic</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
