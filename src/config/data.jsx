import { Gamepad, Globe, Coffee, Music, Linkedin, Github } from "lucide-react";
import ISFS from "../assets/certificates/exin_isfs.png";
import PDPF from "../assets/certificates/exin_pdpf.png";
import Cashly from "../assets/projects/cashly.png";
import Portfolio from "../assets/projects/portfolio.png";
import ProfileAvatar from "/3dcube.png";

export const CERTIFICATES = [
  {
    title: "Information Security Foundation based on ISO/IEC 27001 (ISFS)",
    issuer: "EXIN",
    date: "Issued Apr 2025",
    id: "6626196.20894529",
    link: "https://mylogin.exin.nl/polarserver.asp?Script=GetLinkedInPost&CandidateCertificateGUID=3076256B-2A24-4310-A95B-232CEB5A06B7&ts=171058046",
    logo: ISFS,
  },
  {
    title: "Privacy and Data Protection Foundation (PDPF)",
    issuer: "EXIN",
    date: "Issued Mar 2025",
    id: "6626196.20892592",
    link: "https://mylogin.exin.nl/polarserver.asp?Script=GetLinkedInPost&CandidateCertificateGUID=5391E1C9-1463-4953-8AEE-A5AEECF7B28C&ts=2022488875",
    logo: PDPF,
  },
];

export const PROFILE = {
  name: "Jun Hayashi",
  role: "IT Analyst",
  location: "São Paulo, Brazil",
  languages: "Portuguese, Japanese",
  skills: "Python, BigID, Javascript, TypeScript, Linux, Notion",
  bio: "Hello! I’m passionate about technology and software development, with experience in IT analysis. I enjoy building efficient solutions, optimizing workflows, and exploring new technologies to tackle complex problems.",
  avatar: ProfileAvatar,
  available: true,
};

export const INTERESTS = [
  { icon: Gamepad, label: "Game" },
  { icon: Coffee, label: "Coffee" },
  { icon: Music, label: "Music" },
  { icon: Globe, label: "Traveling" },
];

export const EXPERIENCE = [
  {
    role: "IT Analyst",
    period: "Jan 2025 - Present",
    company: "AFETECH",
    description:
      "Contribute to data-security and infrastructure projects, focusing on BigID operations, data classification, and technical analysis.",
  },
  {
    role: "Intership",
    period: "Jan 2024 - Dec 2024",
    company: "AFETECH",
    description:
      "Supported data-security and IT initiatives through BigID operations, pattern analysis, and project documentation.",
  },
  {
    role: "Freelance",
    period: "Jan 2024 - Dec 2024",
    company: "Media Accel",
    description:
      "Produced SEO-optimized website content while managing freelance writters and project operations.",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Information System",
    school: "University of São Paulo (USP)",
    period: "2021 - 2014",
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Cashly",
    shortDescription:
      "A modern personal finance app that helps users track expenses, control budgets, and visualize their money flow.",
    fullDescription:
      "Cashly is a clean and intuitive personal finance management tool designed to help individuals understand and optimize their spending habits. Users can log expenses, categorize transactions, create monthly budgets, and analyze trends through interactive charts. The app features real-time updates, smart spending insights, and seamless syncing across devices, making financial tracking simple and enjoyable.",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "TailwindCSS",
      "Pluggy",
      "Stripe",
    ],
    features: [
      "Expense and income tracking with budget support",
      "Interactive charts for spending trends and cash flow",
      "Automated bank transaction syncing via Pluggy",
      "Stripe subscription payments for premium features",
      "Secure cloud sync backed by Supabase",
      "Dark/Light mode with persistent theme preference",
    ],
    image: Cashly,
    links: { demo: "#", code: "#" },
  },
  {
    id: 2,
    title: "Portfolio OS",
    shortDescription:
      "A desktop-style interactive portfolio featuring movable windows, apps and themes.",
    fullDescription:
      "Portfolio OS is a highly interactive, desktop-inspired portfolio designed to showcase projects in a playful yet functional environment. The system features draggable and minimizable app windows, a taskbar, context menus, theme switching, z-index management, and smooth animations. Built entirely from scratch, it recreates an operating system experience inside the browser using React and a custom window manager. The project emphasizes UI/UX, state management, and clean architectural design.",
    tags: ["React", "Vite", "JavaScript", "TailwindCSS"],
    features: [
      "Fully custom window manager with drag, minimize, close",
      "Persistent dark/light themes with animated transitions",
      "App system (Profile, Projects, Settings, etc.) built as modular components",
      "Taskbar with running-app indicators and focus management",
      "Responsive design that adapts to all screen sizes",
    ],
    image: Portfolio,
    links: { demo: "#", code: "#" },
  },
];

export const CONTACT_INFO = {
  email: "kevin.jun.hayashi@gmail.com",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/junhayashii",
      color: "bg-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kevin-jun-hayashi-a41873172/",
      color: "bg-blue-700",
    },
  ],
};

export const INITIAL_EMAILS = [
  {
    id: 1,
    folder: "inbox",
    from: "Jun Dev",
    to: "me",
    role: "Personal Message",
    subject: "Thanks for checking out my Portfolio OS!",
    date: "10:42 AM",
    avatar: "JH",
    avatarColor: "bg-indigo-600",
    read: true,
    body: (
      <div className="space-y-4">
        <p>Hi there!</p>
        <p>
          Thanks for checking out my <strong>Portfolio OS</strong>. I'm an{" "}
          <strong>IT Analyst & Developer</strong> passionate about automation,
          frontend engineering, and building useful tools that actually solve
          problems.
        </p>
        <p>
          I’m currently working with <strong>BigID</strong>, focusing on{" "}
          <em>Classifier Tuning</em>, scanner analysis, and automation scripts.
          On the development side, I enjoy building modern UI/UX experiences
          using <strong>React, Tailwind, and TypeScript</strong>, and creating
          automation with <strong>Python</strong> to make daily workflows
          faster.
        </p>
        <h3>What I often work on:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Automating workflows (Python + APIs)</li>
          <li>Debugging & improving scanners / BigID pipelines</li>
          <li>Building custom dashboards & mini-products (like this OS ✨)</li>
          <li>Learning advanced Linux + security topics</li>
          <li>Studying English to move toward global opportunities</li>
        </ul>
        <p>
          I'm always exploring new technologies and improving my craft. Feel
          free to reply or open any app to see more of my work.
        </p>
        <p>
          <strong>Jun Hayashi</strong>
        </p>
      </div>
    ),
  },
  {
    id: 2,
    folder: "inbox",
    from: "GitHub",
    to: "me",
    role: "Code Repository",
    subject: "Latest updates from my projects",
    date: "Yesterday",
    avatar: "GH",
    avatarColor: "bg-gray-800",
    read: false,
    body: (
      <div className="space-y-4">
        <p>There is new activity in your repositories!</p>
        <p>
          I use <strong>GitHub</strong> to document my learning progress,
          experiments, and real project structures. If you're checking out my
          code, here are some highlighted projects:
        </p>
        <div className="space-y-2">
          <p>
            <strong>portfolio-os</strong> — TypeScript / React
            <br />
            The source code for this OS-style portfolio.
          </p>
          <p>
            <strong>automation-tools</strong> — Python
            <br />A collection of scripts for automating tasks (including some
            BigID helpers).
          </p>
          <p>
            <strong>cashly</strong> — React / Supabase
            <br />A personal project focused on real-time analytics & financial
            dashboards.
          </p>
        </div>
        <p>
          You can explore commit history, code patterns, and development style
          directly on GitHub.
        </p>
        <a
          href={CONTACT_INFO.socials.find((s) => s.name === "GitHub").url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Github className="w-6 h-6 pr-2" />
          View GitHub Profile
        </a>
      </div>
    ),
  },
  {
    id: 3,
    folder: "inbox",
    from: "LinkedIn",
    to: "me",
    role: "Professional Network",
    subject: "Let's connect on LinkedIn",
    date: "Oct 24",
    avatar: "in",
    avatarColor: "bg-blue-700",
    read: true,
    body: (
      <div className="space-y-4">
        <p>Want to know more about my work experience?</p>
        <p>My LinkedIn profile includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Work history</li>
          <li>Technical achievements</li>
          <li>Skills & certifications</li>
          <li>Personal projects and interests</li>
        </ul>
        <p>
          Feel free to connect — I'm always open to meeting other developers,
          engineers, and recruiters.
        </p>
        <a
          href={CONTACT_INFO.socials.find((s) => s.name === "LinkedIn").url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Linkedin className="w-6 h-6 pr-2" />
          Connect on LinkedIn
        </a>
      </div>
    ),
  },
];
