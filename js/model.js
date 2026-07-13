/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "ShineOrenji",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "shineorenji@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "LEARNING Tailwind CSS",
      tag: "Live App", color: "#3dff6e", live: true,
      url: "#", cta: "Lansung saja →",
      img: "assets/projects/bsl.png",
      desc: "Lembur part 11",
    },
    {
      title: "Steam Review Sentiment with Transformers",
      tag: "NLP", color: "#e60012",
      url: "#",
      cta: "View on GitHub →",
      img: "assets/projects/steam.png",
      desc: "SOON AAMIIN",
    },
    {
      title: "DownloadGuard",
      tag: "Security", color: "#f1e05a",
      url: "#", cta: "View on GitHub →",
      img: "assets/projects/downloadguard.png",
      desc: "SOON AAMIIN",
    },
    {
      title: "Medical Image Classification",
      tag: "Deep Learning", color: "#3178c6",
      url: "#", cta: "View on GitHub →",
      img: "assets/projects/medcnn.png",
      desc: "SOON AAMIIN",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
skills: [
  { group: "TECH", items: [
    ["HTML5 · CSS · Tailwind CSS", 90], ["JavaScript", 80],
    ["Python Dasar", 72], ["Laravel", 65],
    ["MySQL · Database", 75], ["Git & GitLab", 80],
  ]},
  { group: "Web Development", items: [
    ["Responsive Web Design", 88], ["Bootstrap 5", 90],
    ["Tailwind CSS", 75], ["PHP Dasar", 68],
    ["WordPress", 82], ["UI/UX Dasar", 70],
  ]},
  { group: "Creative & Design", items: [
    ["Blender 3D", 78], ["3D Modeling", 75],
    ["3D Animation", 70], ["Manual Drawing", 80],
    ["Video Editing", 72], ["Content Creation", 70],
  ]},
  { group: "Tools & Productivity", items: [
    ["VS Code", 88], ["GitHub", 82], ["GitLab", 82],
    ["Laragon · XAMPP", 80], ["Microsoft Office", 85],
    ["Windows Troubleshooting", 88],
  ]},
],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
