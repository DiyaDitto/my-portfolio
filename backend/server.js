const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(express.json());

app.use(
  "/certificates",
  express.static(path.join(__dirname, "public/certificates"))
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages sent. Please try again later." },
});

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
      "I'm a <strong>Computer Science Engineering fresher</strong> at Diya Ditto College of Engineering, Chengannur, with a deep interest in software systems, full-stack web development, and open source. I love understanding how things work under the hood.",
      "During my studies I built everything from simulation systems to full-stack web apps. I thrive in environments where I'm continuously learning and shipping real products.",
      "Outside engineering I spend time reading about distributed systems, contributing to open-source projects, and exploring new programming paradigms.",
    ],
    stats: [
      { num: "4+", label: "projects built" },
      { num: "2",  label: "internships" },
      { num: "2",  label: "languages spoken" },
     {
  num: "∞",
  display: "∞",
  label: "curiosity level",
},
    ],
  },

  skills: [
    { label: "Languages", tags: ["Python", "C/C++", "JavaScript", "Java", "SQL"] },
    { label: "Frontend",  tags: ["React", "HTML/CSS", "Tailwind", "Figma"] },
    { label: "Backend",   tags: ["Node.js", "Express", "FastAPI", "MongoDB"] },
    { label: "Tools & Infra", tags: ["Git", "Linux",  "GitHub Actions", "Vercel"] },
  ],

  projects: [
    {
      num: "001",
      name: "IntelliSignal — Traffic Simulation System",
      description:
        "Main project. An intelligent traffic signal simulation that reduces queue length and waiting times using adaptive signal control algorithms. Built to tackle real-world urban congestion problems.",
      tech: ["Python", "Simulation", "Algorithms", "Data Structures"],
      github: "https://github.com/Project-IntelliSignal",
      demo: null,
    },
    {
      num: "002",
      name: "Placement Resource Portal",
      description:
        "Mini project. A unified portal that curates placement preparation and academic resources in one place — making it easier for students to find study material, job listings, and interview prep.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/DiyaDitto/Placement-Resource-Portal",
      demo: null,
    },
    {
      num: "003",
      name: "AquaPoint — Borewell Surveyor Website",
      description:
        "A website built for borewell surveying services, helping users locate, request, and track borewell survey work in their area with a clean and accessible interface.",
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
      description: "Built and maintained web applications using Javascript and React,learned basics of web design.",
      tech: ["Responsive Design","Javascript","HTML/CSS"],
    },
    {
      role: "AI and ML Internship",
      company: "AICTE-IBM",
      duration: "June 2025 – July 2025",
      description: "Worked on backend APIs and database optimization. Gained hands-on experience with real-world software development workflows.",
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
    link: "public/certificates/pythoninfy.png",
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

app.get("/api/portfolio", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ success: true, data });
});
app.get("/api/portfolio/:section", (req, res) => {
  const { section } = req.params;
  if (!data[section]) return res.status(404).json({ error: "Section not found" });
  res.json({ success: true, data: data[section] });
});

app.post("/api/contact", contactLimiter, (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Invalid email address." });
  if (message.length < 10)
    return res.status(400).json({ error: "Message too short." });

  console.log(`\n📬 New message from ${name} <${email}>:\n${message}\n`);
  setTimeout(() => {
    res.json({ success: true, message: "Message received! I'll get back to you soon." });
  }, 600);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running at http://localhost:${PORT}`);
});