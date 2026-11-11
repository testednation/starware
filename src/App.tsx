/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Search,
  Terminal,
  Maximize2,
  Mail,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import {
  STARWARE_PROFILE,
  HERO_METRICS,
  CORE_PRINCIPLES,
  TECHNICAL_STACK,
  STARWARE_PROJECTS,
  StarWareProject,
} from './data/starwareData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';

type FilterMode = 'all' | 'flagship' | 'desktop' | 'mobile_multi';
type WorkflowTab = 'clone' | 'build' | 'contribute';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] =
    useState<StarWareProject | null>(null);
  const [selectedRepoSlug, setSelectedRepoSlug] =
    useState<string>('stardesktop');
  const [workflowTab, setWorkflowTab] = useState<WorkflowTab>('clone');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const flagshipProjects = useMemo(
    () => STARWARE_PROJECTS.filter((p) => p.tier === 'flagship'),
    []
  );

  const filteredProjects = useMemo(() => {
    return STARWARE_PROJECTS.filter((project) => {
      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'flagship'
          ? project.tier === 'flagship'
          : activeFilter === 'desktop'
          ? project.category === 'desktop'
          : project.category === 'mobile' ||
            project.category === 'multiplatform';

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesFilter;

      const matchesSearch =
        project.name.toLowerCase().includes(q) ||
        project.platformLabel.toLowerCase().includes(q) ||
        project.stackLabel.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.keyFocus.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const activeCloneProject = useMemo(
    () =>
      STARWARE_PROJECTS.find((p) => p.repoSlug === selectedRepoSlug) ||
      STARWARE_PROJECTS[0],
    [selectedRepoSlug]
  );

  const terminalSnippet = useMemo(() => {
    const slug = activeCloneProject.repoSlug;
    if (workflowTab === 'clone') {
      return `# Clone ${activeCloneProject.name} from GitFlic
git clone https://gitflic.ru/user/starware/${slug}.git
cd ${slug}`;
    }
    if (workflowTab === 'build') {
      return `# Inspect source integrity and GPLv3 license manifest
git clone https://gitflic.ru/user/starware/${slug}.git
cd ${slug}
git log -n 5 --oneline
# Zero external telemetry endpoints or cloud keys required`;
    }
    return `# Propose a bloat-free, offline-first Merge Request on GitFlic
git checkout -b fix/pragmatic-enhancement
git commit -m "Improve deterministic local execution"
git push origin fix/pragmatic-enhancement`;
  }, [activeCloneProject, workflowTab]);

  return (
    <div id="top" className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-zinc-100 hover:text-[#F2B705] transition-colors whitespace-nowrap shrink-0"
          >
            {STARWARE_PROFILE.brand}
          </a>

          {/* Zone 2: 4–5 single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
          >
            <a
              href="#flagship-works"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-[#F2B705] transition-colors whitespace-nowrap shrink-0"
            >
              Flagship Works
            </a>
            <a
              href="#ecosystem-directory"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-[#F2B705] transition-colors whitespace-nowrap shrink-0"
            >
              Ecosystem
            </a>
            <a
              href="#principles"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-[#F2B705] transition-colors whitespace-nowrap shrink-0"
            >
              Principles
            </a>
            <a
              href="#source-cloner"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-[#F2B705] transition-colors whitespace-nowrap shrink-0"
            >
              Source Clone
            </a>
            <a
              href="#workshop"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-[#F2B705] transition-colors whitespace-nowrap shrink-0"
            >
              Workshop
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href={STARWARE_PROFILE.gitflicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-black bg-[#F2B705] hover:bg-[#eab000] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
            >
              <span>GitFlic Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Split-Screen Hero + Full-Width KPI Strip */}
        <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-5">
                  <span>Independent Software Workshop</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-zinc-300">
                    {STARWARE_PROFILE.handle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{STARWARE_PROFILE.founderName}</span>
                  <span aria-hidden="true">·</span>
                  <span>GPLv3 Sovereign Source</span>
                </div>

                <h1
                  className="font-display font-bold tracking-tight text-zinc-100 leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                    textWrap: 'balance',
                  }}
                >
                  Software that heads for the moon, but finds itself among the
                  stars.
                </h1>

                <p className="mt-6 text-base sm:text-lg font-medium text-zinc-200 leading-relaxed max-w-[64ch]">
                  {STARWARE_PROFILE.missionStatement}
                </p>

                <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[66ch]">
                  {STARWARE_PROFILE.leadNarrative}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4">
                <a
                  href="#flagship-works"
                  className="px-5 py-2.5 text-sm font-semibold text-black bg-[#F2B705] hover:bg-[#eab000] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Flagship Works
                </a>
                <a
                  href="#source-cloner"
                  className="px-5 py-2.5 text-sm font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-[#F2B705]" />
                  <span>Clone Repositories</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(STARWARE_PROJECTS[0])}
                  className="px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inspect StarDesktop Spec →
                </button>
              </div>
            </div>

            {/* Right Column: Matching Height Visual Container */}
            <div className="lg:col-span-5 flex">
              <div
                onClick={() => setSelectedProject(STARWARE_PROJECTS[0])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(STARWARE_PROJECTS[0]);
                  }
                }}
                aria-label="Open StarDesktop / ModernShell flagship monograph"
                className="group relative w-full min-h-[340px] lg:h-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#0B0B0D] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              >
                <ResilientImage
                  src={STARWARE_PROFILE.heroImage}
                  alt="StarWare independent software engineering studio workstation"
                  fallbackTitle="StarWare Engineering Studio"
                  fallbackSubtitle="Offline-First Systems & Native Architecture"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <span className="font-mono bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-800/80">
                    gitflic.ru/user/starware
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-800/80 text-zinc-200 group-hover:border-[#F2B705]/60 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-[#F2B705]" />
                    <span>Open Monograph</span>
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-xs text-zinc-300">
                    <span>Workshop Ethos</span>
                    <span aria-hidden="true"> · </span>
                    <span>Local Hardware Execution</span>
                    <span aria-hidden="true"> · </span>
                    <span>Zero Background Services</span>
                  </div>
                  <p className="font-display text-xl font-semibold text-zinc-100 mt-1 tracking-tight">
                    High-Craft Native Systems Without Cloud Bloat
                  </p>
                  <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2">
                    Click to inspect architectural specifications for
                    StarDesktop, OrbitLauncher, ClearWater, and the StarWare
                    utility suite.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-zinc-800/90 rounded-2xl bg-[#0A0A0C] divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
            {HERO_METRICS.map((item) => (
              <div key={item.value} className="p-6">
                <div className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight tabular-nums">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-[#F2B705] mt-1.5">
                  {item.unit}
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Section Ribbon Divider */}
        <div
          aria-hidden="true"
          className="border-y border-zinc-900 bg-[#08080A] py-3 px-6 overflow-hidden"
        >
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span>selected works · flagship systems · specialized utilities</span>
            <span className="hidden sm:inline">
              win32 native · android jetpack · local media compute
            </span>
            <span className="hidden lg:inline">
              zero telemetry · offline sovereignty · gplv3 open source
            </span>
          </div>
        </div>

        {/* Media-First Bento Grid: Flagship Projects */}
        <section
          id="flagship-works"
          className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs text-zinc-400 mb-2">
                <span>01. Flagship Architecture</span>
                <span aria-hidden="true"> · </span>
                <span>Core Systems in Production</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Flagship Projects Representing the StarWare Ethos
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Click any flagship card to open its full architectural monograph,
              memory & latency benchmarks, and direct GitFlic clone command.
            </p>
          </div>

          {/* Bento Grid: 1 Wide (col-span-2 row-span-2) + 2 Stacked Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wide Flagship Showcase: StarDesktop / ModernShell */}
            {flagshipProjects[0] && (
              <article
                onClick={() => setSelectedProject(flagshipProjects[0])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(flagshipProjects[0]);
                  }
                }}
                className="lg:col-span-2 lg:row-span-2 group rounded-2xl border border-zinc-800 bg-[#0B0B0D] hover:border-zinc-700 transition-colors overflow-hidden flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              >
                <div className="relative h-72 sm:h-96 lg:h-[420px] w-full overflow-hidden bg-zinc-950">
                  <ResilientImage
                    src={flagshipProjects[0].image}
                    alt={flagshipProjects[0].name}
                    fallbackTitle={flagshipProjects[0].name}
                    fallbackSubtitle={flagshipProjects[0].subtitle}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xs border border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-200 flex items-center gap-1.5 group-hover:border-[#F2B705]/60 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-[#F2B705]" />
                    <span>Inspect Spec</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{flagshipProjects[0].platformLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{flagshipProjects[0].stackLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{flagshipProjects[0].license}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 mt-2 tracking-tight group-hover:text-[#F2B705] transition-colors">
                      {flagshipProjects[0].name}
                    </h3>

                    <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed max-w-[68ch]">
                      {flagshipProjects[0].summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-xs">
                      {flagshipProjects[0].metrics.map((m) => (
                        <div key={m.label}>
                          <span className="text-zinc-500">{m.label}: </span>
                          <span className="font-mono font-semibold text-zinc-200 tabular-nums">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-[#F2B705] inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                      <span>Open Technical Monograph</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Right Column Stack: OrbitLauncher & ClearWater */}
            {flagshipProjects.slice(1).map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="col-span-1 row-span-1 group rounded-2xl border border-zinc-800 bg-[#0B0B0D] hover:border-zinc-700 transition-colors overflow-hidden flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2B705]"
              >
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <ResilientImage
                    src={project.image}
                    alt={project.name}
                    fallbackTitle={project.name}
                    fallbackSubtitle={project.subtitle}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/25 to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs border border-zinc-800 px-2.5 py-1 rounded-md text-xs text-zinc-200 flex items-center gap-1 group-hover:border-[#F2B705]/60 transition-colors">
                    <Maximize2 className="w-3 h-3 text-[#F2B705]" />
                    <span>View</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{project.platformLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.stackLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.license}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-zinc-100 mt-2 tracking-tight group-hover:text-[#F2B705] transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <div className="text-zinc-400">
                      <span>{project.metrics[0]?.label}: </span>
                      <span className="font-mono font-semibold text-zinc-200 tabular-nums">
                        {project.metrics[0]?.value}
                      </span>
                    </div>
                    <span className="font-semibold text-[#F2B705] inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                      <span>Inspect Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Full Ecosystem & Specialized Utilities Directory */}
        <section
          id="ecosystem-directory"
          className="border-t border-zinc-900 bg-[#08080A] py-16 lg:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="text-xs text-zinc-400 mb-2">
                  <span>02. Ecosystem & Specialized Utilities</span>
                  <span aria-hidden="true"> · </span>
                  <span>Complete Repository Index</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Focused Utilities Engineered for Workflow Sovereignty
                </h2>
              </div>

              {/* Interactive Filter Controls (Segmented Bar) */}
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-lg self-start lg:self-auto"
              >
                {(
                  [
                    { id: 'all', label: 'All Systems (7)' },
                    { id: 'flagship', label: 'Flagship (3)' },
                    { id: 'desktop', label: 'Desktop & Win32 (3)' },
                    { id: 'mobile_multi', label: 'Mobile & Multiplatform (4)' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#F2B705] text-black font-semibold'
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search & Filter Status Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by project name, C++, Win32, Kotlin, XFA, typography..."
                  aria-label="Search StarWare repositories"
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[#050505] border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#F2B705]"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-mono tabular-nums">
                  Showing {filteredProjects.length} of {STARWARE_PROJECTS.length}{' '}
                  repositories
                </span>
                {(activeFilter !== 'all' || searchQuery.trim() !== '') && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-[#F2B705] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Architectural Index Table */}
            {filteredProjects.length === 0 ? (
              <div className="border border-zinc-800 rounded-2xl p-12 text-center bg-[#050505]">
                <p className="font-display text-lg font-semibold text-zinc-200">
                  No StarWare repositories match “{searchQuery}”
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  Try clearing the search query or switching platform filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-black bg-[#F2B705] rounded-lg hover:bg-[#eab000] transition-colors cursor-pointer"
                >
                  Show All 7 Systems
                </button>
              </div>
            ) : (
              <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-[#050505]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-[#0A0A0D] text-xs font-semibold text-zinc-400">
                        <th className="py-3.5 px-5">Project</th>
                        <th className="py-3.5 px-4">Platform & Stack</th>
                        <th className="py-3.5 px-4">Description</th>
                        <th className="py-3.5 px-4">Key Focus</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/70 text-sm">
                      {filteredProjects.map((project, idx) => {
                        const cloneCmd = `git clone https://gitflic.ru/user/starware/${project.repoSlug}.git`;
                        const copyId = `row-${project.id}`;
                        return (
                          <tr
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="hover:bg-zinc-900/50 transition-colors cursor-pointer group"
                          >
                            <td className="py-4 px-5 align-top">
                              <div className="flex items-baseline gap-2.5">
                                <span className="font-mono text-xs text-zinc-500 tabular-nums">
                                  0{idx + 1}.
                                </span>
                                <div>
                                  <div className="font-display font-semibold text-zinc-100 group-hover:text-[#F2B705] transition-colors whitespace-nowrap">
                                    {project.name}
                                  </div>
                                  <div className="text-xs text-zinc-500 mt-0.5">
                                    {project.tier === 'flagship'
                                      ? 'Flagship System'
                                      : 'Specialized Utility'}{' '}
                                    · {project.license}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 align-top whitespace-nowrap">
                              <div className="text-xs text-zinc-200">
                                {project.platformLabel}
                              </div>
                              <div className="text-xs text-zinc-500 font-mono mt-0.5">
                                {project.stackLabel}
                              </div>
                            </td>
                            <td className="py-4 px-4 align-top max-w-md">
                              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                {project.summary}
                              </p>
                            </td>
                            <td className="py-4 px-4 align-top max-w-xs">
                              <p className="text-xs text-zinc-400 leading-relaxed">
                                {project.keyFocus}
                              </p>
                            </td>
                            <td
                              className="py-4 px-5 align-top text-right whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(cloneCmd, copyId)}
                                  className="px-2.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                  title={`Copy: ${cloneCmd}`}
                                >
                                  {copiedKey === copyId ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-[#F2B705]" />
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                      <span>Clone</span>
                                    </>
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedProject(project)}
                                  className="px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:text-[#F2B705] bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                >
                                  Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Core Principles & Technical Stack Architecture */}
        <section
          id="principles"
          className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 6 Columns: 4 Foundational Tenets */}
            <div className="lg:col-span-6">
              <div className="text-xs text-zinc-400 mb-2">
                <span>03. Core Principles</span>
                <span aria-hidden="true"> · </span>
                <span>Four Foundational Tenets</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Engineered for User Sovereignty, Never Surveillance
              </h2>
              <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                Every tool, utility, and application carrying the StarWare name
                adheres strictly to four non-negotiable engineering tenets:
              </p>

              <div className="mt-8 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
                {CORE_PRINCIPLES.map((principle) => (
                  <div key={principle.index} className="py-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-semibold text-[#F2B705] shrink-0">
                        {principle.index}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-zinc-100">
                          {principle.title}
                        </h3>
                        <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed">
                          {principle.summary}
                        </p>
                        <div className="mt-2.5 text-xs text-zinc-500 font-mono">
                          Standard: {principle.proof}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Columns: Technical Stack & Standards */}
            <div className="lg:col-span-6">
              <div className="text-xs text-zinc-400 mb-2">
                <span>04. Technical Stack & Standards</span>
                <span aria-hidden="true"> · </span>
                <span>Deterministic Execution</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Maximum Control & Low Resource Overhead
              </h2>
              <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                We prioritize languages and runtimes that deliver deterministic
                execution, native hardware sympathy, and zero dependency rot:
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TECHNICAL_STACK.map((stack) => (
                  <div
                    key={stack.domain}
                    className="p-6 rounded-2xl border border-zinc-800/90 bg-[#0B0B0D] flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-zinc-500">
                        {stack.index}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-zinc-100 mt-1">
                        {stack.domain}
                      </h3>
                      <div className="text-xs text-[#F2B705] mt-1.5 font-medium">
                        {stack.technologies}
                      </div>
                      <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                        {stack.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* GPLv3 Sovereign License Callout Box (All-around hairline border, no thick left bar) */}
              <div className="mt-6 p-6 rounded-2xl border border-zinc-800 bg-[#0A0A0C]">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                  <span>Software Freedom & Auditing</span>
                  <span className="font-mono text-zinc-300">
                    GNU GPL v3.0
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-zinc-100 mt-1.5">
                  Distributed Under the GNU General Public License v3.0 (GPLv3)
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  We believe that essential utilities should remain transparent,
                  auditable, and forever under user control. Under GPLv3, you
                  are free to inspect, modify, run, and distribute the code,
                  ensuring the software remains sovereign and community-owned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why GitFlic & Interactive Repository Cloner */}
        <section
          id="source-cloner"
          className="border-t border-zinc-900 bg-[#08080A] py-16 lg:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="text-xs text-zinc-400 mb-2">
                  <span>05. Independent Hosting Infrastructure</span>
                  <span aria-hidden="true"> · </span>
                  <span>Why GitFlic?</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Permanent, Inspectable & Autonomous Repositories
                </h2>
                <p className="text-sm text-zinc-300 mt-4 leading-relaxed">
                  StarWare hosts its core source repositories and distribution
                  mirrors on{' '}
                  <a
                    href={STARWARE_PROFILE.gitflicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F2B705] underline underline-offset-4 hover:text-[#eab000]"
                  >
                    GitFlic
                  </a>{' '}
                  to support independent, resilient, and developer-centric
                  hosting infrastructure. By maintaining clean, accessible Git
                  repositories outside walled gardens, we ensure our tooling
                  remains permanent, inspectable, and autonomous.
                </p>

                <div className="mt-6 space-y-4 border-t border-zinc-800/80 pt-6 text-sm">
                  <div>
                    <div className="font-semibold text-zinc-200">
                      01. Explore Repositories
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Visit the official StarWare GitFlic profile to browse
                      available source trees and release tags.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-200">
                      02. Report Reproducible Issues
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Use each repository’s issue tracker to report reproducible
                      bugs or propose practical workflow enhancements.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-200">
                      03. Submit Bloat-Free Merge Requests
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      We welcome well-tested contributions that align with our
                      offline-first and zero-telemetry philosophy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Git Clone Command Builder */}
              <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-[#050505] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800 bg-[#0B0B0E]">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                    <Terminal className="w-4 h-4 text-[#F2B705]" />
                    <span>gitflic.ru/user/starware/{activeCloneProject.repoSlug}.git</span>
                  </div>

                  {/* Workflow Mode Selector */}
                  <div
                    role="group"
                    aria-label="Repository workflow command mode"
                    className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800"
                  >
                    {(
                      [
                        { id: 'clone', label: 'Clone Source' },
                        { id: 'build', label: 'Audit & Verify' },
                        { id: 'contribute', label: 'Merge Request' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setWorkflowTab(tab.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          workflowTab === tab.id
                            ? 'bg-zinc-800 text-zinc-100'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-zinc-400 mb-3">
                    Select a StarWare repository to generate its GitFlic CLI
                    command:
                  </div>

                  {/* Interactive Repository Selector Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {STARWARE_PROJECTS.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setSelectedRepoSlug(proj.repoSlug)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedRepoSlug === proj.repoSlug
                            ? 'bg-[#F2B705]/15 border-[#F2B705] text-[#F2B705] font-semibold'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {proj.repoSlug}
                      </button>
                    ))}
                  </div>

                  {/* Code Output Block */}
                  <div className="relative rounded-xl bg-[#0A0A0D] border border-zinc-800 p-4">
                    <pre className="text-xs sm:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed">
                      <code>{terminalSnippet}</code>
                    </pre>
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-zinc-400">
                        <span>Selected: </span>
                        <span className="text-zinc-200 font-medium">
                          {activeCloneProject.name}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>{activeCloneProject.platformLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(terminalSnippet, 'main-terminal')
                          }
                          className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[#F2B705] hover:bg-[#eab000] rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {copiedKey === 'main-terminal' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Command</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Command</span>
                            </>
                          )}
                        </button>
                        <a
                          href={STARWARE_PROFILE.gitflicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>Open on GitFlic</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Architect & Vision Monograph Section */}
        <section
          id="workshop"
          className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Founder / Lead Architect Profile Card */}
            <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-[#0B0B0D] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-700 shrink-0 bg-zinc-900">
                    <ResilientImage
                      src={STARWARE_PROFILE.founderAvatar}
                      alt={STARWARE_PROFILE.founderName}
                      fallbackTitle="ND"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">
                      <span>{STARWARE_PROFILE.brand}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="font-mono text-zinc-300">
                        {STARWARE_PROFILE.handle}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-zinc-100 mt-0.5 tracking-tight">
                      {STARWARE_PROFILE.founderName}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      {STARWARE_PROFILE.founderRole} · ★ {STARWARE_PROFILE.starsCount}{' '}
                      GitFlic Rating
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 mt-6 leading-relaxed">
                  Maintainer of the StarWare open-source workshop on GitFlic.
                  Focused on native Win32 desktop shells, zero-permission
                  Android utilities, local media processing engines, and
                  long-term software durability.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Direct Workshop Contact</span>
                  <a
                    href={`mailto:${STARWARE_PROFILE.email}`}
                    className="font-mono text-zinc-200 hover:text-[#F2B705] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F2B705]" />
                    <span>{STARWARE_PROFILE.email}</span>
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Primary Git Registry</span>
                  <a
                    href={STARWARE_PROFILE.gitflicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-zinc-200 hover:text-[#F2B705] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>gitflic.ru/user/starware</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F2B705]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Vision Statement & Quote */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-[#0B0B0D] p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs text-zinc-400 mb-3">
                  <span>06. Workshop Vision</span>
                  <span aria-hidden="true"> · </span>
                  <span>Built With Care, Crafted for Utility</span>
                </div>

                <blockquote className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight leading-snug">
                  “{STARWARE_PROFILE.visionQuote}”
                </blockquote>
                <div className="text-xs text-[#F2B705] mt-2 font-medium">
                  — {STARWARE_PROFILE.visionAuthor}
                </div>

                <p className="text-sm sm:text-base text-zinc-300 mt-6 leading-relaxed max-w-[64ch]">
                  {STARWARE_PROFILE.visionBody}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-zinc-400 italic">
                  {STARWARE_PROFILE.closingSignature}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${STARWARE_PROFILE.email}`}
                    className="px-4 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Email Workshop
                  </a>
                  <a
                    href={STARWARE_PROFILE.gitflicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-black bg-[#F2B705] hover:bg-[#eab000] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                  >
                    <span>Visit GitFlic Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-zinc-900 bg-[#050505] py-8 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-semibold text-zinc-300">
              {STARWARE_PROFILE.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span>{STARWARE_PROFILE.founderName}</span>
            <span aria-hidden="true">·</span>
            <span>All software licensed under GNU GPLv3</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#flagship-works"
              className="hover:text-zinc-300 transition-colors whitespace-nowrap"
            >
              Flagship Works
            </a>
            <a
              href="#ecosystem-directory"
              className="hover:text-zinc-300 transition-colors whitespace-nowrap"
            >
              Ecosystem
            </a>
            <a
              href={`mailto:${STARWARE_PROFILE.email}`}
              className="hover:text-zinc-300 transition-colors whitespace-nowrap"
            >
              {STARWARE_PROFILE.email}
            </a>
            <a
              href={STARWARE_PROFILE.gitflicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors whitespace-nowrap"
            >
              GitFlic
            </a>
          </div>
        </div>
      </footer>

      {/* Fullscreen Project Monograph Lightbox Modal */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        allProjects={STARWARE_PROJECTS}
      />
    </div>
  );
}
