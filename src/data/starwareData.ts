export interface StarWareProject {
  id: string;
  name: string;
  subtitle?: string;
  repoSlug: string;
  tier: 'flagship' | 'ecosystem';
  category: 'desktop' | 'mobile' | 'multiplatform';
  platformLabel: string;
  stackLabel: string;
  year: string;
  license: string;
  summary: string;
  architectureOverview: string;
  keyFocus: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image?: string;
  aspectRatio?: '16:9' | '4:3';
  gitflicUrl: string;
}

export const STARWARE_PROFILE = {
  brand: 'StarWare',
  handle: '@starware',
  founderName: 'Nossy Drelich',
  founderRole: 'Founder & Systems Architect',
  email: 'ishapcha770@gmail.com',
  gitflicUrl: 'https://gitflic.ru/user/starware',
  starsCount: '10',
  licenseName: 'GNU General Public License v3.0 (GPLv3)',
  licenseUrl: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
  heroImage: '/src/assets/images/hero_starware_workstation_1794430019962.jpg',
  founderAvatar: '/src/assets/images/avatar_nossy_drelich_1794430024829.jpg',
  motto: 'Software that heads for the moon, but finds itself among the stars.',
  missionStatement:
    'We are an independent software workshop focused on a simple, timeless mission: making stuff that is genuinely useful.',
  leadNarrative:
    'Modern software often promises the world while delivering background trackers, artificial subscriptions, and bloated cloud dependencies. At StarWare, we set our sights skyward—building ambitious, high-craft systems with precision engineering—while keeping our feet firmly planted in pragmatic utility. We build software that respects your hardware, safeguards your privacy, and just works.',
  visionQuote: 'Aim for the moon. If you miss, you may hit a star.',
  visionAuthor: 'W. Clement Stone',
  visionBody:
    'At StarWare, we shoot for the moon with our engineering standards, but we are thrilled whenever our code finds itself among the stars: running reliably in the background, quietly solving problems, and staying out of your way.',
  closingSignature: 'StarWare — Built with care, crafted for utility.',
};

export const HERO_METRICS = [
  {
    value: '7 Systems',
    unit: '3 Flagship · 4 Specialized Utilities',
    context: 'Complete open-source software suite hosted on GitFlic',
  },
  {
    value: '0 Bytes',
    unit: 'Outbound Telemetry & Analytics',
    context: 'Zero background pings, trackers, or cloud lock-in',
  },
  {
    value: '< 0.8s',
    unit: 'Cold Shell & Utility Startup',
    context: 'Lean native Win32, C/C++, and Android Jetpack execution',
  },
  {
    value: '100% GPLv3',
    unit: 'Free & Sovereign Source Code',
    context: 'Transparent, auditable, and permanently user-owned',
  },
];

export const CORE_PRINCIPLES = [
  {
    index: '01.',
    title: 'Pragmatic Utility First',
    summary:
      'We build solutions for real friction points. If a tool does not save time, eliminate frustration, or provide tangible value, we do not build it.',
    proof: 'Focused single-purpose utilities with zero feature bloat',
  },
  {
    index: '02.',
    title: 'Offline-First & Local Sovereignty',
    summary:
      'Your computer belongs to you. StarWare applications process data locally on your hardware without requiring internet access, remote telemetry, or external server pings.',
    proof: '100% on-device execution with local SQLite & flat-file storage',
  },
  {
    index: '03.',
    title: 'Zero Telemetry, Zero Surveillance',
    summary:
      'We do not collect analytics, track mouse movements, or harvest telemetry. Software should serve the person running it—period.',
    proof: 'Zero network RPCs required for core runtime functionality',
  },
  {
    index: '04.',
    title: 'Lightweight & High-Performance',
    summary:
      'Fast startup times, minimal memory consumption, and clean native codebases. We reject unnecessary framework bloat in favor of lean, responsive architecture.',
    proof: 'Native C/C++, Win32 APIs, and modern Kotlin without Electron overhead',
  },
];

export const TECHNICAL_STACK = [
  {
    index: '01.',
    domain: 'Systems & Performance',
    technologies: 'C · C++ · Win32 APIs · Native Platform Hooks',
    description:
      'Direct hardware and OS kernel interface layers engineered for deterministic latency, minimal RAM footprint, and sub-second cold boot execution.',
  },
  {
    index: '02.',
    domain: 'Automation & Tooling',
    technologies: 'Python 3 · Offline Packaging Pipelines · Binary Patching',
    description:
      'Reproducible build automation, standalone binary inspection, and deterministic release packaging without external cloud CI lock-in.',
  },
  {
    index: '03.',
    domain: 'Mobile Applications',
    technologies: 'Modern Kotlin · Android Jetpack · Clean Local Architecture',
    description:
      'Fluid gesture-driven mobile interfaces designed for battery preservation, strict permission hygiene, and zero background network activity.',
  },
  {
    index: '04.',
    domain: 'Data Integrity',
    technologies: 'Local SQLite · Flat-File Configs · Zero Network RPCs',
    description:
      'Human-inspectable configuration files and resilient embedded databases that keep user libraries portable across decades.',
  },
];

export const STARWARE_PROJECTS: StarWareProject[] = [
  {
    id: 'stardesktop',
    name: 'StarDesktop / ModernShell',
    subtitle: 'Ultra-Lightweight Desktop Shell & WinPE Boot Environment',
    repoSlug: 'stardesktop',
    tier: 'flagship',
    category: 'desktop',
    platformLabel: 'Windows · WinPE',
    stackLabel: 'C++ · Native Win32 API',
    year: '2026',
    license: 'GPLv3',
    summary:
      'A high-speed, ultra-lightweight desktop shell and boot environment engineered for system recovery, embedded deployments, and distraction-free computing. Features native Win32 architecture, sub-second boot times, and zero background services.',
    architectureOverview:
      'StarDesktop replaces heavy default shell processes with a deterministic Win32 window and workspace coordinator. Designed to run seamlessly inside minimal WinPE recovery images as well as daily engineering workstations, it eliminates background indexing daemons and DWM telemetry hooks while retaining full hardware acceleration.',
    keyFocus: 'Native Win32 architecture, sub-second boot times, zero background services',
    highlights: [
      'Sub-second cold initialization in bare-metal Windows and WinPE recovery environments',
      'Direct Win32 message-loop architecture consuming under 14 MB of resident memory',
      'Keyboard-centric workspace tiling, instant command runner, and zero background daemons',
      'Drop-in shell replacement for embedded hardware, rescue media, and low-latency workstations',
    ],
    metrics: [
      { label: 'Boot Time', value: '< 0.6s' },
      { label: 'Idle Memory', value: '12.4 MB' },
      { label: 'Background Services', value: '0' },
    ],
    image: '/src/assets/images/project_stardesktop_shell_1794430020860.jpg',
    aspectRatio: '16:9',
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'orbitlauncher',
    name: 'OrbitLauncher',
    subtitle: 'Privacy-Strict Gesture Mobile Launcher',
    repoSlug: 'orbit-launcher',
    tier: 'flagship',
    category: 'mobile',
    platformLabel: 'Android',
    stackLabel: 'Kotlin · Android Jetpack',
    year: '2026',
    license: 'GPLv3',
    summary:
      'A clean, fluid mobile launcher centered on intuitive gesture navigation, battery efficiency, and strict privacy with zero data harvesting.',
    architectureOverview:
      'Built from the ground up in modern Kotlin without network permissions in its AndroidManifest, OrbitLauncher replaces cluttered icon grids and ad-sponsored news feeds with tactile edge gestures, instant local app indexing, and OLED-optimized monochrome typography.',
    keyFocus: 'Intuitive gesture navigation, battery efficiency, strict zero-telemetry privacy',
    highlights: [
      'Zero internet permission declared in the application manifest—physically incapable of data exfiltration',
      'Sub-millisecond local prefix search across installed packages, contacts, and offline shortcuts',
      'True black OLED surface rendering for measurable daily battery savings',
      'Customizable one-handed spatial gesture bindings for immediate muscle-memory launching',
    ],
    metrics: [
      { label: 'Network Permissions', value: '0' },
      { label: 'Frame Pacing', value: '120 Hz' },
      { label: 'APK Footprint', value: '2.1 MB' },
    ],
    image: '/src/assets/images/project_orbit_launcher_1794430023058.jpg',
    aspectRatio: '4:3',
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'clearwater',
    name: 'ClearWater',
    subtitle: '100% On-Device Media Cleanup & Watermark Removal Engine',
    repoSlug: 'clearwater',
    tier: 'flagship',
    category: 'multiplatform',
    platformLabel: 'Multiplatform',
    stackLabel: 'C++ · Python 3 · Local Compute',
    year: '2026',
    license: 'GPLv3',
    summary:
      'A 100% on-device media cleanup and watermark removal engine that executes entirely on local hardware without uploading your media to remote servers.',
    architectureOverview:
      'ClearWater performs frequency-domain inpainting, artifact reconstruction, and batch overlay removal directly on the user’s local CPU and GPU. Private photographs, archival scans, and production assets never leave the local filesystem or touch third-party cloud APIs.',
    keyFocus: '100% local hardware execution, batch media restoration, zero cloud uploads',
    highlights: [
      'Executes entirely offline on local hardware with zero cloud API keys or per-image credit paywalls',
      'Deterministic spatial and frequency-domain reconstruction for clean texture preservation',
      'Batch directory processing pipeline for archival restoration and document cleanup',
      'Cross-platform desktop and CLI execution with lossless metadata preservation options',
    ],
    metrics: [
      { label: 'Cloud Uploads', value: '0 Bytes' },
      { label: 'Execution Mode', value: '100% Local' },
      { label: 'Batch Throughput', value: '48 img/min' },
    ],
    image: '/src/assets/images/project_clearwater_engine_1794430024934.jpg',
    aspectRatio: '4:3',
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'starexplorer',
    name: 'StarExplorer',
    subtitle: 'High-Velocity Keyboard-First File Manager',
    repoSlug: 'starexplorer',
    tier: 'ecosystem',
    category: 'desktop',
    platformLabel: 'Desktop',
    stackLabel: 'C++ · Win32 · Local Index',
    year: '2026',
    license: 'GPLv3',
    summary:
      'Streamlined, lightning-fast file manager optimized for keyboard workflows, deep filesystem visibility, and instant indexing.',
    architectureOverview:
      'Engineered to eliminate the sluggish ribbon UI and indexing lag of modern OS file explorers, StarExplorer reads NTFS and POSIX directory tables directly with dual-pane keyboard navigation and instant regex filtering.',
    keyFocus: 'Responsive UI, no indexing lag, clean directory navigation',
    highlights: [
      'Instantaneous directory traversal across folders with 100,000+ entries without UI thread blocking',
      'Full modal and chorded keyboard navigation alongside dual-pane split views',
      'Built-in cryptographic hash verification (SHA-256 / BLAKE3) and raw hex inspection',
    ],
    metrics: [
      { label: '100k Dir Listing', value: '18 ms' },
      { label: 'Indexing Lag', value: '0 ms' },
      { label: 'Binary Size', value: '1.8 MB' },
    ],
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'starphoto',
    name: 'StarPhoto / SnapVault',
    subtitle: 'Private Offline Media Manager & High-Speed Image Gallery',
    repoSlug: 'starphoto-snapvault',
    tier: 'ecosystem',
    category: 'multiplatform',
    platformLabel: 'Mobile · Desktop',
    stackLabel: 'Kotlin · C++ · Local SQLite',
    year: '2026',
    license: 'GPLv3',
    summary:
      'High-performance offline media manager and image gallery that organizes libraries locally without cloud dependency.',
    architectureOverview:
      'Combines a memory-mapped thumbnail cache with an embedded SQLite catalog so multi-terabyte photo archives and mobile camera rolls can be sorted, tagged, and searched offline in milliseconds.',
    keyFocus: 'Private indexing, instantaneous thumbnail caching',
    highlights: [
      'Zero cloud sync daemons or mandatory account logins—your photo library stays on your disks',
      'Memory-mapped thumbnail cache delivering 120fps scrolling through tens of thousands of RAW and JPEG assets',
      'Non-destructive local EXIF inspection, batch scrubbing, and deterministic folder organization',
    ],
    metrics: [
      { label: 'Thumbnail Cache', value: '< 2 ms' },
      { label: 'Cloud Dependency', value: 'None' },
      { label: 'Supported Formats', value: '32+ RAW/Img' },
    ],
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'xfa-form-studio',
    name: 'XFA Form Studio',
    subtitle: 'Standalone XFA-Based PDF Rendering & Editing Engine',
    repoSlug: 'xfa-form-studio',
    tier: 'ecosystem',
    category: 'desktop',
    platformLabel: 'Desktop',
    stackLabel: 'C++ · Standalone XML/PDF Parser',
    year: '2026',
    license: 'GPLv3',
    summary:
      'Specialized document engine engineered to render, interact with, and edit complex XFA-based PDF structures effortlessly.',
    architectureOverview:
      'Solves one of enterprise and government computing’s most notorious headaches: dynamic XML Forms Architecture (XFA) PDFs that modern browsers and lightweight readers fail to open. XFA Form Studio parses the embedded XML template, datasets, and form logic locally without requiring proprietary Adobe bloatware.',
    keyFocus: 'Standalone parser, legacy format interoperability',
    highlights: [
      'Full standalone parsing of dynamic and static XFA streams inside complex government and legal PDFs',
      'Offline form filling, schema tree inspection, XML dataset export, and flattened standard PDF conversion',
      'Zero telemetry or cloud document conversion—sensitive legal and financial forms remain strictly local',
    ],
    metrics: [
      { label: 'Parser Engine', value: 'Standalone' },
      { label: 'XFA Spec Support', value: 'Dynamic & Static' },
      { label: 'External Runtime', value: 'None Required' },
    ],
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
  {
    id: 'scriptcraft',
    name: 'ScriptCraft / KeyCraft',
    subtitle: 'Handwriting & Vector-to-Font Typography Suite',
    repoSlug: 'scriptcraft-keycraft',
    tier: 'ecosystem',
    category: 'multiplatform',
    platformLabel: 'Mobile · Desktop',
    stackLabel: 'C++ · Kotlin · Vector Synthesis',
    year: '2026',
    license: 'GPLv3',
    summary:
      'Intuitive font and typography suite converting custom handwriting and vector paths into production-grade fonts.',
    architectureOverview:
      'Bridges tactile pen/touch input and precision Bézier curve synthesis, enabling designers and engineers to capture glyph sheets, refine kerning pairs, and compile standard OpenType (.otf) and TrueType (.ttf) font binaries completely offline.',
    keyFocus: 'Creative independence, vector synthesis, standalone export',
    highlights: [
      'Direct contour tracing from handwritten glyph templates or imported SVG vector paths',
      'Real-time kerning, ligature preview, and metric bearing adjustment workspace',
      'Standalone OpenType (.otf) and TrueType (.ttf) binary compiler with zero subscription locks',
    ],
    metrics: [
      { label: 'Font Export', value: 'OTF · TTF · WOFF2' },
      { label: 'Curve Engine', value: 'Cubic Bézier' },
      { label: 'License Lock', value: 'None (100% Yours)' },
    ],
    gitflicUrl: 'https://gitflic.ru/user/starware',
  },
];
