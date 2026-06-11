const data = {
  hero: {
    name: "Diya Ditto",
    label: "Computer Science Engineer · Class of 2026",
    taglines: ["building things", "that matter."],
    description:
      "A fresher computer engineer passionate about full-stack development, systems programming, and turning ideas into working software. Open to opportunities worldwide.",
  },
  about: {
    paragraphs: [
      "I'm a <strong>Computer Science Engineering fresher</strong> from College of Engineering, Chengannur, with a deep interest in software systems, full-stack web development, and open source. I love understanding how things work under the hood.",
      "During my studies I built everything from simulation systems to full-stack web apps. I thrive in environments where I'm continuously learning and shipping real products.",
      "Outside engineering I spend time reading about distributed systems, contributing to open-source projects, and exploring new programming paradigms.",
    ],
    stats: [
      { num: "4+", label: "projects built" },
      { num: "2",  label: "internships" },
      { num: "2",  label: "languages spoken" },
      { num: "∞",  label: "curiosity level" },
    ],
  },
  skills: [
    { label: "Languages", tags: ["Python", "C/C++", "JavaScript", "Java", "SQL"] },
    { label: "Frontend",  tags: ["React", "HTML/CSS", "Tailwind", "Figma"] },
    { label: "Backend",   tags: ["Node.js", "Express", "FastAPI", "MongoDB"] },
    { label: "Tools & Infra", tags: ["Git", "Linux", "GitHub Actions", "Vercel"] },
  ],
  projects: [
    {
      num: "001",
      name: "IntelliSignal — Traffic Simulation System",
      description: "Main project. An intelligent traffic signal simulation that reduces queue length and waiting times using adaptive signal control algorithms. Built to tackle real-world urban congestion problems.",
      tech: ["Python", "Simulation", "Algorithms", "Data Structures"],
      github: "https://github.com/Project-IntelliSignal",
      demo: null,
    },
    {
      num: "002",
      name: "Placement Resource Portal",
      description: "Mini project. A unified portal that curates placement preparation and academic resources in one place — making it easier for students to find study material, job listings, and interview prep.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/DiyaDitto/Placement-Resource-Portal",
      demo: null,
    },
    {
      num: "003",
      name: "AquaPoint — Borewell Surveyor Website",
      description: "A website built for borewell surveying services, helping users locate, request, and track borewell survey work in their area with a clean and accessible interface.",
      tech: ["HTML/CSS", "JavaScript", "Node.js"],
      github: "https://github.com/DiyaDitto/aquapoint",
      demo: null,
    },
  ],
  education: {
    degree: "B.Tech Computer Science & Engineering",
    school: "College of Engineering, Chengannur",
    cgpa: "8.4 / 10",
    relevant: "OS, Networks, DBMS, Algorithms, Data Structures",
    years: "2022 – 2026",
  },
  experience: [
    {
      role: "Web Development Intern",
      company: "Prodigy InfoTech",
      duration: "Jun 2024 – July 2024",
      description: "Built and maintained web applications using Javascript and React, learned basics of web design.",
      tech: ["Responsive Design", "Javascript", "HTML/CSS"],
    },
    {
      role: "AI and ML Internship",
      company: "AICTE-IBM",
      duration: "June 2025 – July 2025",
      description: "Worked on AI/ML concepts and tools. Gained hands-on experience with real-world machine learning workflows.",
      tech: ["Python", "ML", "Jupyter Notebook"],
    },
  ],
  certifications: [
    {
      name: "WE Start Pre-Incubation Program",
      issuer: "Kerala Startup Mission",
      date: "2024",
      link: "/certificates/westart.png",
    },
    {
      name: "Python Foundation Certification",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "/certificates/pythoninfy.png",
    },
    {
      name: "React Developer Certification",
      issuer: "Great Learning",
      date: "2024",
      link: "/certificates/reactgl.png",
    },
  ],
  contact: {
    email: "diyaditto84@gmail.com",
    github: "github.com/DiyaDitto",
    linkedin: "in.linkedin.com/in/diya-ditto-368446257",
  },
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  res.json({ success: true, data });
}