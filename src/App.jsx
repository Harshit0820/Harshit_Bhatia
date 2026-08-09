import { useEffect, useRef, useState } from "react";

/*
 * Harshit's portfolio — intentionally kept in one component.
 * Edit the data objects below to update content. The visual styles live at
 * the bottom of this file, so the whole site remains easy to customize.
 */

const experience = [
  {
    period: "Sep 2025 — Present",
    role: "Advanced Application Engineering Senior Analyst",
    company: "Accenture · Client: Intuit",
    location: "Bengaluru, Karnataka, India",
    summary:
      "Leading full-stack delivery for Intuit’s enterprise content ecosystem—building high-scale discovery, preview, and platform services used across the organization.",
    wins: [
      "Built cross-catalog Elasticsearch search across 60+ catalogs with advanced filtering and access control, monitored through a 40+ panel Splunk dashboard for 10+ teams.",
      "Owned the User Preview Tool end to end using React, Spring Boot, and AWS, enabling real-time CMS previews for 1,000+ users across 20+ teams.",
      "Reduced HTTP 500 errors by 60% and production alerts by 70% with Resilience4j circuit breakers.",
      "Designed a URL shortener handling 10K+ monthly requests at ~50ms latency.",
      "Led a PHP 8.4 runtime upgrade across three environments with zero feature regressions.",
    ],
    tools: ["React", "Spring Boot", "AWS", "Elasticsearch", "Redis", "Splunk"],
    color: "blue",
  },
  {
    period: "Sep 2023 — Sep 2025",
    role: "Advanced Application Engineering Analyst",
    company: "Accenture · Client: Intuit",
    location: "Bengaluru, Karnataka, India · On-site",
    summary:
      "Delivered product features, quality automation, and platform modernization across Intuit content and QuickBooks engineering teams.",
    wins: [
      "Delivered 100+ React and Redux features for Intuit’s Content Management team.",
      "Resolved 30+ AWS security findings and 20+ client-facing bugs, improving platform reliability.",
      "Built a React and Redux Month-End Closure Dashboard and integrated 10+ REST APIs, replacing manual Excel tracking.",
      "Created Cypress and Jest automation that reduced manual testing by 40%; increased QuickBooks JUnit coverage by 25% and reduced bugs by 30%.",
    ],
    tools: ["React", "Redux", "Java", "REST APIs", "Cypress", "Jest", "JUnit"],
    color: "green",
  },
];

const earlierExperience = [
  {
    period: "Jan 2023 — Jun 2023",
    role: "Software Engineer Intern",
    company: "MeritHub Technologies",
    mark: "M",
    summary:
      "Built a multi-language coding platform and authored technical courses.",
    tools: ["Product Engineering", "Java", "Python"],
  },
  {
    period: "May 2021 — Nov 2021",
    role: "Researcher & Developer",
    company: "Samsung R&D Institute India",
    mark: "S",
    summary:
      "Built an English–Punjabi speech recognition model with 98% transcription accuracy.",
    tools: ["Machine Learning", "Python", "Keras"],
  },
  {
    period: "Jul 2020 — Aug 2020",
    role: "Engineering Intern",
    company: "Vardhan Consulting Engineers",
    mark: "V",
    summary:
      "Early engineering and consulting experience in a remote team.",
    tools: ["Engineering"],
  },
];

const projects = [
  {
    id: "01",
    title: "Vera",
    eyebrow: "AI · AUTOML",
    description:
      "An AI-powered AutoML platform that takes raw CSV data through intelligent preprocessing, feature engineering, and automated model training.",
    outcomes: [
      "Automates preprocessing and feature engineering through a multi-model LLM pipeline.",
      "Trains and compares machine-learning models from uploaded CSV datasets.",
      "Adds a RAG assistant for exploring data and model results in natural language.",
    ],
    tools: ["Flask", "MongoDB", "Scikit-Learn", "LangChain"],
    color: "yellow",
  },
  {
    id: "02",
    title: "Global Search",
    eyebrow: "INTUIT · ENTERPRISE SEARCH",
    description:
      "A cross-catalog discovery platform built for Intuit teams, combining Elasticsearch with advanced filtering, catalog scoping, and access control.",
    outcomes: [
      "Unified content discovery across 60+ independently managed catalogs.",
      "Enforced catalog-level access while supporting filters and scoped search.",
      "Surfaced adoption and search-quality KPIs through a 40+ panel Splunk dashboard.",
    ],
    tools: ["React", "Spring Boot", "Elasticsearch", "AWS"],
    color: "blue",
  },
  {
    id: "03",
    title: "Web Chat",
    eyebrow: "SOCIAL · FRONTEND",
    description:
      "A responsive social interface focused on clear profiles, status sharing, notifications, and an accessible dark experience.",
    outcomes: [
      "Supports profiles, status sharing, and notification-led interactions.",
      "Uses reusable interface components to keep features consistent.",
      "Adapts navigation and content for desktop and mobile layouts.",
    ],
    tools: ["HTML", "CSS", "JavaScript"],
    color: "green",
    link: "https://github.com/Harshit0820/Web-Chat",
  },
  {
    id: "04",
    title: "Cats vs Dogs",
    eyebrow: "MACHINE LEARNING · VISION",
    description:
      "An image classification pipeline using neural networks, automated preprocessing, and data augmentation to classify unseen images.",
    outcomes: [
      "Builds a complete workflow from image preprocessing to model inference.",
      "Uses augmentation to improve generalization on unseen images.",
      "Explores model tuning with TensorFlow, Keras, OpenCV, and NumPy.",
    ],
    tools: ["TensorFlow", "Keras", "OpenCV", "NumPy"],
    color: "red",
    link: "https://github.com/Harshit0820/CatsVsDogs-Image-classification",
  },
  {
    id: "05",
    title: "Car Review",
    eyebrow: "DESKTOP · FULL STACK",
    description:
      "A desktop product for managing vehicle specifications, user authentication, and structured car reviews with persistent storage.",
    outcomes: [
      "Connects an interactive JavaFX interface to persistent MySQL storage.",
      "Supports authenticated access and structured vehicle review workflows.",
      "Implements create, read, update, and delete operations across the application.",
    ],
    tools: ["Java", "JavaFX", "MySQL", "CSS"],
    color: "yellow",
    link: "https://github.com/Harshit0820/Car-Review-JavaFX",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    note: "Interfaces that feel fast and stay maintainable.",
    skills: ["React", "TypeScript", "JavaScript", "Redux", "HTML / CSS", "Material UI"],
    icons: ["react", "typescript", "javascript", "redux"],
    color: "blue",
  },
  {
    title: "Backend",
    note: "APIs and services designed for real traffic.",
    skills: ["Java", "Spring Boot", "Node.js", "Python", "REST APIs", "GraphQL"],
    icons: ["java", "spring", "nodejs", "python"],
    color: "red",
  },
  {
    title: "Data & messaging",
    note: "Reliable storage, search, and async systems.",
    skills: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch", "Kafka", "DynamoDB"],
    icons: ["mysql", "postgresql", "redis", "elasticsearch"],
    color: "yellow",
  },
  {
    title: "Cloud & delivery",
    note: "From a clean commit to healthy production.",
    skills: ["AWS", "Docker", "Kubernetes", "CI / CD", "CloudWatch", "GitHub"],
    icons: ["amazonwebservices", "docker", "kubernetes", "github"],
    color: "green",
  },
];

const songs = [
  { title: "Blinding Lights", artist: "The Weeknd", query: "The Weeknd Blinding Lights", duration: 200000 },
  { title: "Instant Crush", artist: "Daft Punk", query: "Daft Punk Instant Crush", duration: 337000 },
  { title: "Lose Yourself", artist: "Eminem", query: "Eminem Lose Yourself", duration: 326000 },
  { title: "Passionfruit", artist: "Drake", query: "Drake Passionfruit", duration: 299000 },
  { title: "Money Trees", artist: "Kendrick Lamar", query: "Kendrick Lamar Money Trees", duration: 386000 },
];

const learningTopics = [
  {
    title: "Consistent hashing at scale",
    summary: "Distributing data while minimizing costly remapping.",
  },
  {
    title: "Event-driven system design",
    summary: "Building loosely coupled services through reliable events.",
  },
  {
    title: "Browser rendering internals",
    summary: "Understanding how browsers turn code into responsive pixels.",
  },
  {
    title: "Idempotent API design",
    summary: "Making repeated requests safe and predictable.",
  },
  {
    title: "Distributed caching patterns",
    summary: "Reducing latency without sacrificing data consistency.",
  },
  {
    title: "React rendering performance",
    summary: "Preventing unnecessary work for faster interfaces.",
  },
  {
    title: "Database indexing strategies",
    summary: "Choosing indexes that accelerate real query patterns.",
  },
];

const greetings = [
  { text: "Hello", code: "EN" },
  { text: "Namaste", code: "HI" },
  { text: "Hola", code: "ES" },
  { text: "Bonjour", code: "FR" },
  { text: "Ciao", code: "IT" },
  { text: "Hallo", code: "DE" },
  { text: "Olá", code: "PT" },
  { text: "Konnichiwa", code: "JP" },
  { text: "Marhaba", code: "AR" },
];

const assistantQuestionBank = [
  {
    id: "fit",
    tier: 1,
    prompts: ["Why should we hire Harshit?", "What makes Harshit a strong fit?", "Give me the recruiter summary"],
    answer:
      "I combine three years of enterprise delivery for Intuit with end-to-end full-stack ownership and measurable production impact. I can move from an ambiguous user need to a clear React experience, dependable Spring Boot services, cloud infrastructure, testing, and production observability.",
  },
  {
    id: "philosophy",
    tier: 1,
    prompts: ["What drives his work?", "What is his product philosophy?", "What does Harshit care about most?"],
    answer:
      "My main focus is user ease: fewer unnecessary steps, clear feedback, and workflows people can understand quickly. I enjoy hiding technical complexity behind simple product experiences while ensuring the services, data layers, and cloud systems underneath remain reliable.",
  },
  {
    id: "intuit",
    tier: 1,
    prompts: ["What has he delivered at Intuit?", "Show his Intuit impact", "What changed because of his work?"],
    answer:
      "At Intuit, I have shipped 100+ features, built secure search across 60+ catalogs, and enabled real-time content previews for 1,000+ users across 20+ teams. My resilience work reduced HTTP 500 errors by 60% and production alerts by 70%, while better dashboards made platform behavior easier to understand.",
  },
  {
    id: "stack",
    tier: 2,
    prompts: ["What is his strongest stack?", "Which technologies does he use?", "Summarize his technical toolkit"],
    answer:
      "My core stack is React, TypeScript, Redux, Java, Spring Boot, and REST APIs, supported by AWS and container-based delivery. For data-intensive systems, I work across MySQL, PostgreSQL, DynamoDB, Redis, Elasticsearch, and event-driven messaging based on the access pattern.",
  },
  {
    id: "systems",
    tier: 2,
    prompts: ["Can he build distributed systems?", "What backend systems has he built?", "Show his system-design experience"],
    answer:
      "I have built low-latency URL shortening, event-driven publishing, resilient services with circuit breakers, secure search, and cache-backed APIs. My approach considers failure modes, observability, access control, rollback strategies, and the simplest architecture that can scale safely.",
  },
  {
    id: "frontend",
    tier: 2,
    prompts: ["What is his frontend experience?", "Can he own product interfaces?", "How strong is he with React?"],
    answer:
      "I have delivered 100+ React and Redux features, built real-time preview workflows and finance dashboards, and integrated complex REST APIs. I prioritize performance, responsive behavior, reusable components, predictable state, and clear feedback for users.",
  },
  {
    id: "projects",
    tier: 2,
    prompts: ["Which project should I see first?", "Show his best projects", "Where can I see practical work?"],
    answer:
      "Start with Vera to see my work in applied AI, automated machine learning, and conversational dataset exploration. My Global Search work demonstrates enterprise scale and access control, while Web Chat, Cats vs Dogs, and Car Review show my frontend, machine-learning, and full-stack foundations with available source links.",
  },
  {
    id: "reliability",
    tier: 2,
    prompts: ["How does he improve reliability?", "Show production engineering impact", "Does he work on quality and security?"],
    answer:
      "I reduced HTTP 500s by 60%, production alerts by 70%, and resolved 30+ AWS security findings by treating reliability as a product requirement. I also expanded Cypress, Jest, and JUnit automation, improved coverage, and used production telemetry to prevent regressions.",
  },
  {
    id: "earlier",
    tier: 3,
    prompts: ["What did he do before Accenture?", "Show earlier experience", "What is his AI background?"],
    answer:
      "Before Accenture, I built a multi-language coding and learning platform at MeritHub and authored practical technical coursework. At Samsung R&D, I developed an English–Punjabi speech recognition model using feature extraction and machine learning, reaching 98% transcription accuracy.",
  },
  {
    id: "education",
    tier: 3,
    prompts: ["Where did he study?", "Summarize his education", "What is his academic background?"],
    answer:
      "I earned a Bachelor of Engineering in Electronics and Communication from Thapar Institute with an 8.55 CGPA. I completed Classes X and XII at Ryan International School in Chandigarh and continue learning through cloud certification and hands-on engineering projects.",
  },
  {
    id: "leadership",
    tier: 2,
    prompts: ["How does he show leadership?", "What does ownership look like for him?", "Can he lead without a title?"],
    answer:
      "I take unclear problems from discovery through production, create structure around them, and keep product and engineering decisions aligned. I also help unblock teammates by sharing technical context, surfacing risks early, and leaving systems easier to operate than I found them.",
  },
  {
    id: "decisions",
    tier: 2,
    prompts: ["How does he balance speed and quality?", "What is his delivery approach?", "How does he make engineering trade-offs?"],
    answer:
      "I prefer shipping the smallest safe increment, validating its value with real feedback, and improving it iteratively. I guide each trade-off by user impact and operational risk, so speed never means ignoring security, observability, or a safe rollback path.",
  },
  {
    id: "incidents",
    tier: 2,
    prompts: ["How does he handle production incidents?", "What happens when production behaves unexpectedly?", "How does he debug failures?"],
    answer:
      "I first contain user impact, then use logs, dashboards, and reproducible evidence to isolate the root cause before changing code. After the fix, I add regression coverage, verify production behavior, and document the learning so the same class of failure is less likely to return.",
  },
  {
    id: "growth",
    tier: 3,
    prompts: ["What is he learning next?", "Where is he growing technically?", "What topics interest him now?"],
    answer:
      "I am deepening my system-design knowledge across distributed caching, idempotency, data access patterns, and resilient service architecture. In parallel, I continue exploring frontend architecture, browser performance, and ways to make responsive products feel faster and easier to use.",
  },
  {
    id: "culture",
    tier: 3,
    prompts: ["What team culture suits him?", "Where does he do his best work?", "What environment is he looking for?"],
    answer:
      "I thrive in teams that combine meaningful ownership, close collaboration, difficult problems at scale, and frequent delivery. My ideal environment gives engineers direct context about users, encourages thoughtful technical debate, and trusts them to carry solutions through production.",
  },
];

function createAssistantSuggestions() {
  return assistantQuestionBank
    .map((question) => ({
      ...question,
      prompt: question.prompts[Math.floor(Math.random() * question.prompts.length)],
      order: Math.random(),
    }))
    .sort((a, b) => a.tier - b.tier || a.order - b.order)
    .slice(0, 7);
}

const navItems = ["home", "experience", "work", "skills", "education", "contact"];
const mobileNavItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "assistant", label: "Ask AI", featured: true },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function EmphasizedText({ text }) {
  const terms = /(Intuit|100\+|60\+|1,000\+|20\+|60%|70%|30\+|98%|React|TypeScript|Redux|Java|Spring Boot|AWS|Elasticsearch|Redis)/gi;
  const exactTerm = /^(Intuit|100\+|60\+|1,000\+|20\+|60%|70%|30\+|98%|React|TypeScript|Redux|Java|Spring Boot|AWS|Elasticsearch|Redis)$/i;

  return text.split(terms).map((part, index) =>
    exactTerm.test(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

function NavIcon({ name }) {
  const paths = {
    home: "M12 3 2 11.5V21h7v-6h6v6h7v-9.5L12 3Z",
    experience: "M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2Zm-6 0h-4V4h4v2Zm8 8H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6Z",
    assistant: "m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14ZM5 14l1.2 3.3L9.5 18l-3.3 1.2L5 22l-1.2-2.8L.5 18l3.3-.7L5 14Z",
    work: "M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM9.4 15.6 5.8 12l3.6-3.6 1.4 1.4L8.6 12l2.2 2.2-1.4 1.4Zm5.2 0-1.4-1.4 2.2-2.2-2.2-2.2 1.4-1.4 3.6 3.6-3.6 3.6Z",
    contact: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function TechIcon({ name }) {
  const variants = {
    amazonwebservices: "plain-wordmark",
    github: "original",
  };
  const variant = variants[name] || "original";
  const src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
  return (
    <img
      src={src}
      alt={`${name} technology icon`}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.parentElement.style.display = "none";
      }}
    />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [songIndex, setSongIndex] = useState(() => Math.floor(Math.random() * songs.length));
  const [topicIndex, setTopicIndex] = useState(
    () => Math.floor(Math.random() * learningTopics.length),
  );
  const [istTime, setIstTime] = useState("");
  const [assistantReply, setAssistantReply] = useState(
    "My work centers on user ease: removing friction from complex workflows while engineering the reliability needed behind the interface. I enjoy owning products end to end—from understanding the problem and shaping the experience to building, observing, and improving the production system.",
  );
  const [assistantQuestions] = useState(createAssistantSuggestions);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return undefined;
    let rotation;
    const firstGreeting = window.setTimeout(() => {
      setGreetingIndex(1);
      rotation = window.setInterval(() => {
        setGreetingIndex((index) => (index + 1) % greetings.length);
      }, 375);
    }, 850);
    return () => {
      window.clearTimeout(firstGreeting);
      window.clearInterval(rotation);
    };
  }, [loading]);

  useEffect(() => {
    const updateTime = () => {
      setIstTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const rotation = window.setTimeout(() => {
      setSongIndex((index) => {
        const next = Math.floor(Math.random() * (songs.length - 1));
        return next >= index ? next + 1 : next;
      });
    }, songs[songIndex].duration);
    return () => window.clearTimeout(rotation);
  }, [songIndex]);

  useEffect(() => {
    const topicDuration = 36 * 60 * 60 * 1000;
    const savedAt = Number(localStorage.getItem("learning-topic-updated") || 0);
    const savedTopic = Number(localStorage.getItem("learning-topic-index"));

    if (Number.isInteger(savedTopic) && Date.now() - savedAt < topicDuration) {
      setTopicIndex(savedTopic % learningTopics.length);
    } else {
      const next = Math.floor(Math.random() * learningTopics.length);
      setTopicIndex(next);
      localStorage.setItem("learning-topic-index", String(next));
      localStorage.setItem("learning-topic-updated", String(Date.now()));
    }

    const rotation = window.setInterval(() => {
      setTopicIndex((index) => {
        const next = (index + 1) % learningTopics.length;
        localStorage.setItem("learning-topic-index", String(next));
        localStorage.setItem("learning-topic-updated", String(Date.now()));
        return next;
      });
    }, topicDuration);
    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    const moveCursor = (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.animate(
          { transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)` },
          { duration: 350, fill: "forwards" },
        );
      }
    };

    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      const marker = window.scrollY + window.innerHeight * 0.38;
      const sectionIds = ["home", "assistant", "experience", "work", "skills", "education", "contact"];
      let current = "home";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        current = "contact";
      }
      setActiveSection(current);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    return () => {
      revealObserver.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOverviewOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = overviewOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [overviewOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      <div className={`loader ${loading ? "" : "loader--done"}`} aria-hidden={!loading}>
        <div className="loader__mark">
          <span>H</span>
          <span>B</span>
        </div>
        <div className="loader__text">
          <span
            className={`loader__greeting ${greetingIndex === 0 ? "loader__greeting--first" : ""}`}
            key={greetings[greetingIndex].text}
          >
            {greetings[greetingIndex].text}
          </span>
          <span className="loader__language">{greetings[greetingIndex].code}</span>
        </div>
        <div className="loader__track">
          <span />
        </div>
      </div>

      <div className={`scroll-progress ${loading ? "" : "scroll-progress--visible"}`} aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="mouse-glow" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
          HB<span className="brand__dot">.</span>
        </button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item}
              className={activeSection === item ? "active" : ""}
              onClick={() => scrollTo(item)}
            >
              {item === "work" ? "projects" : item}
            </button>
          ))}
        </nav>
        <div className="topbar__actions">
          <button className="availability" onClick={() => scrollTo("contact")}>
            <span />
            Available to talk
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            className={`${item.featured ? "featured" : ""} ${activeSection === item.id ? "active" : ""}`.trim()}
            onClick={() => scrollTo(item.id)}
          >
            <span aria-hidden="true"><NavIcon name={item.id} /></span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>

      <main className={loading ? "site-loading" : "site-ready"}>
        <section className="hero section-shell" id="home">
          <div className="hero__status reveal">
            <span className="status-pill">
              <i /> Full Stack Engineer
            </span>
            <span className="hero__location">Bengaluru, India · {istTime} IST</span>
          </div>

          <div className="hero__heading reveal">
            <p className="eyebrow">HELLO, I’M HARSHIT</p>
            <h1>
              I make complex
              <br />
              systems feel <span className="accent-word">simple.</span>
            </h1>
            <p className="hero__intro">
              Full-stack engineer building high-impact enterprise platforms for Intuit.
              My focus is turning complex workflows into products people can understand
              and use effortlessly—backed by resilient services and cloud systems that scale.
            </p>
          </div>

          <div className="widget-grid reveal">
            <button className="name-widget surface" onClick={() => setOverviewOpen(true)}>
              <span className="widget-label">QUICK PROFILE</span>
              <span className="profile-orb" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}harshit-avatar.png`} alt="" />
              </span>
              <span className="name-widget__name">Harshit Bhatia</span>
              <span className="name-widget__role">
                AWS Certified · Building enterprise platforms for Intuit
              </span>
              <span className="name-widget__action">
                Tap for the short version <Arrow />
              </span>
              <span className="pixel-orbit pixel-orbit--one" />
              <span className="pixel-orbit pixel-orbit--two" />
            </button>

            <div className="metric-widget metric-widget--experience surface surface--blue">
              <span className="widget-label">EXPERIENCE</span>
              <strong>3+</strong>
              <span className="metric-widget__caption">years shipping enterprise software</span>
              <span className="experience-signal" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className="metric-widget metric-widget--focus surface surface--yellow">
              <span className="widget-label">FOCUS</span>
              <strong>Scale</strong>
              <span className="metric-widget__caption">reliable systems and clear product experiences</span>
              <span className="scale-rings" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className="now-widget surface">
              <a
                className="now-widget__item now-widget__item--song"
                href={`https://music.youtube.com/search?q=${encodeURIComponent(songs[songIndex].query)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="now-widget__icon">♫</span>
                <span>
                  <small>ON ROTATION</small>
                  <strong>{songs[songIndex].title}</strong>
                  <em>{songs[songIndex].artist}</em>
                </span>
                <span className="equalizer"><i /><i /><i /><i /></span>
              </a>
              <div className="now-widget__item now-widget__item--learning">
                <span className="now-widget__icon">⌁</span>
                <span>
                  <small>CURRENTLY LEARNING</small>
                  <strong>{learningTopics[topicIndex].title}</strong>
                  <em>{learningTopics[topicIndex].summary}</em>
                </span>
              </div>
            </div>
          </div>

          <button className="scroll-cue" onClick={() => scrollTo("experience")}>
            <span>Scroll to explore</span>
            <i>↓</i>
          </button>
        </section>

        <section className="section-shell impact-strip reveal" aria-label="Professional summary">
          <div>
            <strong>3 years</strong>
            <span>full-time engineering</span>
          </div>
          <i />
          <div>
            <strong>100+</strong>
            <span>features delivered</span>
          </div>
          <i />
          <div>
            <strong>Full stack</strong>
            <span>product to cloud</span>
          </div>
          <i />
          <div>
            <strong>AWS</strong>
            <span>cloud certified</span>
          </div>
        </section>

        <section
          className="section-shell assistant-section reveal"
          id="assistant"
          aria-labelledby="assistant-title"
        >
          <div className="assistant-card">
            <div className="assistant-card__head">
              <span className="assistant-icon">✦</span>
              <div>
                <span>GUIDED PORTFOLIO ASSISTANT</span>
                <h2 id="assistant-title">What would you like to know?</h2>
              </div>
            </div>
            <div className="assistant-card__body">
              <div className="assistant-answer" key={assistantReply}>
                <span aria-hidden="true">✦</span>
                <p><EmphasizedText text={assistantReply} /></p>
              </div>
              <div className="assistant-suggestions-title">
                <span>Suggested questions</span>
                <small>Swipe to explore →</small>
              </div>
              <div className="assistant-options">
                {assistantQuestions.map((question) => (
                  <button
                    key={question.id}
                    className={assistantReply === question.answer ? "active" : ""}
                    aria-pressed={assistantReply === question.answer}
                    onClick={() => setAssistantReply(question.answer)}
                  >
                    {question.prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell content-section" id="experience">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">01 · EXPERIENCE</p>
              <h2>Experience.</h2>
            </div>
          </div>

          <div className="timeline">
            {experience.map((job) => (
              <article className={`job-card reveal job-card--${job.color}`} key={job.period}>
                <div className="company-brand-stack">
                  <div className="company-logo company-logo--accenture" aria-label="Accenture">
                    <span>&gt;</span>
                    <small>accenture</small>
                  </div>
                </div>
                <div className="job-card__meta">
                  <span>{job.period}</span>
                  <span className="job-card__company">
                    Accenture <em>INTUIT · CLIENT</em>
                  </span>
                  <span className="job-card__location">{job.location}</span>
                </div>
                <div className="job-card__content">
                  <h3>{job.role}</h3>
                  <p className="job-card__summary">{job.summary}</p>
                  <ul>
                    {job.wins.map((win) => (
                      <li key={win}>{win}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {job.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="earlier-grid">
            {earlierExperience.map((job) => (
              <article className="earlier-card reveal" key={job.company}>
                <div className="earlier-card__top">
                  <span className="earlier-card__mark">{job.mark}</span>
                  <span>{job.period}</span>
                </div>
                <h4>{job.role}</h4>
                <strong>{job.company}</strong>
                <p>{job.summary}</p>
                <div className="tag-row">
                  {job.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section" id="work">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">02 · SELECTED WORK</p>
              <h2>Selected work.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card reveal project-card--${project.color}`} key={project.id}>
                <div className="project-card__top">
                  <span>{project.eyebrow}</span>
                  <span>{project.id}</span>
                </div>
                <div className="project-card__visual" aria-hidden="true">
                  <span className="visual-pill visual-pill--a" />
                  <span className="visual-pill visual-pill--b" />
                  <span className="visual-pill visual-pill--c" />
                  <span className="visual-core">{project.title.slice(0, 1)}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__result">
                  <span>WHAT IT DELIVERS</span>
                  <ul>
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="tag-row">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                {project.link && (
                  <a className="project-card__link" href={project.link} target="_blank" rel="noreferrer">
                    View on GitHub <Arrow diagonal />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section" id="skills">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 · TOOLKIT</p>
              <h2>Technical toolkit.</h2>
            </div>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className={`skill-card reveal skill-card--${group.color}`} key={group.title}>
                <div className="skill-card__top">
                  <div className="skill-card__number">0{index + 1}</div>
                  <div className="skill-icons">
                    {group.icons.map((icon) => (
                      <span key={icon}><TechIcon name={icon} /></span>
                    ))}
                  </div>
                </div>
                <h3>{group.title}</h3>
                <p>{group.note}</p>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="cert-row reveal">
            <span className="cert-row__label">CERTIFIED & RECOGNIZED</span>
            <div>
              <a
                className="cert-badge cert-badge--primary"
                href="https://cp.certmetrics.com/amazon/en/public/verify/credential/8aad1e830aa541bdbaec9d701f484543"
                target="_blank"
                rel="noreferrer"
              >
                AWS Cloud Practitioner <small>2026 · View credential ↗</small>
              </a>
              <a
                className="cert-badge"
                href="https://drive.google.com/file/d/1qR3NRIU3u_V-rygRAADzIiYFQpwwkKrx/view"
                target="_blank"
                rel="noreferrer"
              >
                Samsung R&D Institute <small>Certificate of Excellence · View ↗</small>
              </a>
              <a
                className="cert-badge"
                href="https://drive.google.com/file/d/1qpf4BwlZDjISNMkrPN550TH11Xs92Uwo/view"
                target="_blank"
                rel="noreferrer"
              >
                HPE <small>C++ Assessment · View credential ↗</small>
              </a>
            </div>
          </div>
        </section>

        <section className="section-shell content-section" id="education">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">04 · EDUCATION</p>
              <h2>Education.</h2>
            </div>
          </div>

          <div className="education-timeline">
            <article className="education-item education-item--primary reveal">
              <div className="education-item__year">2019—2023</div>
              <div>
                <span className="education-item__type">BACHELOR OF ENGINEERING</span>
                <h3>Electronics & Communication Engineering</h3>
                <p>Thapar Institute of Engineering & Technology · Patiala</p>
              </div>
              <span className="education-item__score">8.55 CGPA</span>
            </article>
            <article className="education-item reveal">
              <div className="education-item__year">2018—2019</div>
              <div>
                <span className="education-item__type">CLASS XII</span>
                <h3>Senior Secondary Education</h3>
                <p>Ryan International School · Chandigarh</p>
              </div>
              <span className="education-item__score">87.8%</span>
            </article>
            <article className="education-item reveal">
              <div className="education-item__year">2016—2017</div>
              <div>
                <span className="education-item__type">CLASS X</span>
                <h3>Secondary Education</h3>
                <p>Ryan International School · Chandigarh</p>
              </div>
              <span className="education-item__score">10 CGPA</span>
            </article>
          </div>
        </section>

        <section className="section-shell contact-section" id="contact">
          <div className="contact-card reveal">
            <div className="contact-card__copy">
              <p className="eyebrow">05 · LET’S TALK</p>
              <h2>Let’s build products<br /><span>people enjoy using.</span></h2>
              <p>
                Open to full-stack engineering opportunities where I can own meaningful
                problems, simplify user experiences, and build reliable systems at scale.
              </p>
            </div>
            <a className="email-button" href="mailto:20harshitbhatia@gmail.com">
              <span>
                <small>START A CONVERSATION</small>
                20harshitbhatia@gmail.com
              </span>
              <Arrow diagonal />
            </a>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/harshitbhatia0820" target="_blank" rel="noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
              <a href="https://github.com/Harshit0820" target="_blank" rel="noreferrer">
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="section-shell">
        <span>Designed & built by Harshit Bhatia</span>
        <span>© {new Date().getFullYear()} · Bengaluru, India</span>
        <button onClick={() => scrollTo("home")}>Back to top ↑</button>
      </footer>

      <div
        className={`overview ${overviewOpen ? "overview--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Profile overview"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOverviewOpen(false);
        }}
      >
        <div className="overview__card">
          <span className="overview__orb overview__orb--one" aria-hidden="true" />
          <span className="overview__orb overview__orb--two" aria-hidden="true" />
          <button
            className="overview__close"
            onClick={() => setOverviewOpen(false)}
            aria-label="Close overview"
          >
            ×
          </button>
          <div className="overview__identity">
            <span className="overview__avatar">
              <img src={`${import.meta.env.BASE_URL}harshit-avatar.png`} alt="Harshit Bhatia" />
            </span>
            <div>
              <span className="overview__hello">QUICK PROFILE · HELLO 👋</span>
              <h2>Harshit Bhatia</h2>
              <span className="overview__status"><i /> Full Stack Engineer · Bengaluru</span>
            </div>
          </div>
          <p className="overview__lead">
            I’m an AWS-certified full-stack engineer building enterprise products
            for Intuit. I care deeply about making complex workflows effortless for
            users, without compromising the reliability of the systems behind them.
          </p>
          <div className="overview__stats">
            <div><strong>3+</strong><span>years engineering</span></div>
            <div><strong>100+</strong><span>features shipped</span></div>
            <div><strong>10K+</strong><span>platform users</span></div>
          </div>
          <div className="overview__facts">
            <div><strong>Best at</strong><span>Owning products end to end</span></div>
            <div>
              <strong>Core stack</strong>
              <span>React · TypeScript · Java · Spring Boot · AWS · Elasticsearch · Redis · SQL / NoSQL</span>
            </div>
            <div><strong>Care about</strong><span>User ease · Clarity · Reliability</span></div>
          </div>
          <div className="overview__actions">
            <button
              className="overview__cta"
              onClick={() => {
                setOverviewOpen(false);
                window.setTimeout(() => scrollTo("experience"), 250);
              }}
            >
              Explore experience <Arrow />
            </button>
            <button
              className="overview__contact"
              onClick={() => {
                setOverviewOpen(false);
                window.setTimeout(() => scrollTo("contact"), 250);
              }}
            >
              Start a conversation <Arrow />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #17181b;
    --surface: #222428;
    --surface-2: #2a2c31;
    --text: #f1f3f4;
    --muted: #a9adb5;
    --line: rgba(255, 255, 255, 0.1);
    --blue: #8ab4f8;
    --blue-dark: #1d3557;
    --red: #f28b82;
    --yellow: #fdd663;
    --green: #81c995;
    --radius-lg: 38px;
    --radius-md: 26px;
    --mouse-x: 50vw;
    --mouse-y: 50vh;
    font-family: "Manrope", system-ui, sans-serif;
    color: var(--text);
    background: var(--bg);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  :root[data-theme="light"] {
    --bg: #f4f1ea;
    --surface: #ffffff;
    --surface-2: #ece9e2;
    --text: #202124;
    --muted: #555b64;
    --line: rgba(32, 33, 36, 0.15);
    --blue: #79a7eb;
    --blue-dark: #d9e7fb;
    --red: #ea7b72;
    --yellow: #f2c94c;
    --green: #69b57e;
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-color: #55585f var(--bg);
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background:
      radial-gradient(circle at 15% 0%, rgba(138, 180, 248, 0.08), transparent 32rem),
      var(--bg);
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0.035;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    color: inherit;
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    color: #111318;
    background: var(--blue);
  }

  .section-shell {
    width: min(1180px, calc(100% - 48px));
    margin-inline: auto;
  }

  .content-section {
    padding: 132px 0 24px;
    scroll-margin-top: 70px;
  }

  .eyebrow,
  .widget-label {
    margin: 0;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
  }

  .reveal {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(36px);
    transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1);
  }

  .reveal.is-visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }

  .project-grid .reveal:nth-child(even),
  .skills-grid .reveal:nth-child(even),
  .earlier-grid .reveal:nth-child(even) {
    transition-delay: .1s;
  }

  .loader {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-content: center;
    gap: 34px;
    padding: 32px;
    background: #131416;
    transition: opacity 0.7s ease 0.15s, visibility 0s linear 0.9s;
  }

  .loader--done {
    opacity: 0;
    visibility: hidden;
  }

  .loader__mark {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 108px;
    margin: auto;
    overflow: hidden;
    border-radius: 34px;
    color: #17181b;
    background: var(--blue);
    font-size: 25px;
    font-weight: 800;
    box-shadow: 32px 22px 0 -18px var(--yellow), -28px -25px 0 -17px var(--red);
    animation: loader-float 1.7s ease-in-out infinite;
  }

  .loader__mark span:last-child {
    transform: translateY(8px);
    opacity: 0.45;
  }

  .loader__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .loader__greeting {
    min-width: 155px;
    color: #f1f3f4;
    font-size: 14px;
    text-transform: none;
    animation: greeting-in .375s ease-in-out both;
  }

  .loader__greeting--first { animation-duration: .85s; }

  .loader__language {
    display: inline;
    min-width: 30px;
    color: #d5d8de;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .loader__track {
    width: min(420px, 72vw);
    height: 3px;
    overflow: hidden;
    border-radius: 20px;
    background: rgba(255,255,255,.1);
  }

  .loader__track span {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: left;
    background: var(--blue);
    animation: load 3.55s cubic-bezier(.7,0,.2,1) forwards;
  }

  .scroll-progress {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 250;
    height: 2px;
    opacity: 0;
    pointer-events: none;
    background: transparent;
    transition: opacity .3s ease;
  }

  .scroll-progress--visible { opacity: 1; }

  .scroll-progress span {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: left;
    background: linear-gradient(90deg, var(--blue), var(--green));
    transition: transform .08s linear;
  }

  @keyframes load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes loader-float { 50% { transform: translateY(-8px) rotate(2deg); } }
  @keyframes greeting-in {
    0% { opacity: 0; transform: translateY(3px); }
    15%, 82% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-2px); }
  }

  .site-ready .hero__status.is-visible { animation: hero-rise .7s ease both; }
  .site-ready .hero__heading.is-visible { animation: hero-rise .8s .08s ease both; }
  .site-ready .widget-grid.is-visible { animation: hero-rise .9s .16s ease both; }
  .site-ready .scroll-cue { animation: hero-rise .7s .4s ease both; }

  @keyframes hero-rise {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;
    border-radius: 50%;
    translate: -50% -50%;
  }

  .cursor-dot {
    width: 7px;
    height: 7px;
    background: var(--text);
  }

  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255,255,255,.4);
  }

  .mouse-glow {
    position: fixed;
    left: var(--mouse-x);
    top: var(--mouse-y);
    z-index: -1;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    background: rgba(138, 180, 248, .045);
    filter: blur(8px);
  }

  .topbar {
    position: fixed;
    top: 18px;
    left: 50%;
    z-index: 100;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: min(1180px, calc(100% - 32px));
    min-height: 60px;
    padding: 8px 10px 8px 20px;
    transform: translateX(-50%);
    border: 1px solid var(--line);
    border-radius: 22px;
    background: rgba(34, 36, 40, 0.8);
    box-shadow: 0 14px 35px rgba(0,0,0,.2);
    backdrop-filter: blur(18px);
  }

  .mobile-nav { display: none; }

  .brand {
    justify-self: start;
    padding: 0;
    border: 0;
    background: transparent;
    font-size: 17px;
    font-weight: 800;
    cursor: pointer;
  }

  .brand__dot { color: var(--blue); }

  .topbar nav {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .topbar nav button {
    padding: 9px 13px;
    border: 0;
    border-radius: 13px;
    color: var(--muted);
    background: transparent;
    font-size: 13px;
    text-transform: capitalize;
    cursor: pointer;
    transition: color .2s ease, background .2s ease;
  }

  .topbar nav button:hover,
  .topbar nav button.active {
    color: var(--text);
    background: rgba(255,255,255,.07);
  }

  .topbar__actions {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .theme-toggle {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--text);
    background: rgba(255,255,255,.04);
    font-size: 16px;
    cursor: pointer;
    transition: transform .25s ease, background .25s ease;
  }

  .theme-toggle:hover {
    transform: rotate(12deg);
    background: rgba(255,255,255,.09);
  }

  .availability {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 0;
    border-radius: 14px;
    color: #d5f2dc;
    background: rgba(129, 201, 149, .11);
    font-size: 12px;
    cursor: pointer;
  }

  .availability > span,
  .status-pill i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 5px rgba(129,201,149,.1);
  }

  .hero {
    min-height: 100vh;
    padding-top: 136px;
    padding-bottom: 70px;
    scroll-margin-top: 100px;
  }

  .hero__status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 54px;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: #d9dde3;
    font-size: 12px;
  }

  .hero__location {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .hero__heading h1 {
    max-width: 970px;
    margin: 16px 0 24px;
    font-size: clamp(58px, 8.4vw, 120px);
    font-weight: 600;
    letter-spacing: -.065em;
    line-height: .91;
  }

  .accent-word {
    color: var(--blue);
    position: relative;
    white-space: nowrap;
  }

  .accent-word::after {
    content: "";
    position: absolute;
    right: -24px;
    bottom: 8%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--yellow);
  }

  .hero__intro {
    max-width: 690px;
    margin: 0 0 55px auto;
    color: #c9ccd2;
    font-size: clamp(18px, 2vw, 24px);
    line-height: 1.55;
  }

  .widget-grid {
    display: grid;
    grid-template-columns: 1.6fr .75fr .75fr;
    grid-template-rows: 185px 112px;
    gap: 14px;
  }

  .surface {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .name-widget {
    grid-row: 1 / 3;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 32px;
    text-align: left;
    cursor: pointer;
    transition: transform .35s ease, background .35s ease;
  }

  .name-widget:hover {
    transform: translateY(-5px);
    background: #27292e;
  }

  .name-widget__name {
    z-index: 1;
    margin: auto 0 3px;
    font-size: clamp(32px, 4vw, 56px);
    font-weight: 700;
    letter-spacing: -.045em;
  }

  .profile-orb {
    position: absolute;
    top: 27px;
    right: 32px;
    z-index: 3;
    width: 84px;
    height: 84px;
    overflow: hidden;
    border: 5px solid #f5f7fa;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 14px 32px rgba(0,0,0,.3), 8px 6px 0 -2px var(--blue);
    transition: transform .35s cubic-bezier(.2,.8,.2,1);
    animation: profile-float 3.2s ease-in-out infinite;
  }

  .profile-orb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    transform: scale(1.08);
  }

  .name-widget:hover .profile-orb { transform: translateY(-4px) rotate(3deg); }

  @keyframes profile-float {
    50% { translate: 0 -7px; box-shadow: 0 20px 36px rgba(0,0,0,.34), 8px 9px 0 -2px var(--blue); }
  }

  .name-widget__role {
    z-index: 1;
    color: var(--muted);
    font-size: 14px;
  }

  .name-widget__action {
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 25px;
    color: var(--blue);
    font-size: 13px;
  }

  .name-widget__action span {
    animation: profile-arrow 1.8s ease-in-out infinite;
  }

  .name-widget:hover .name-widget__action span { transform: translateX(5px); }

  @keyframes profile-arrow { 50% { translate: 5px 0; } }

  .pixel-orbit {
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }

  .pixel-orbit--one {
    top: 34px;
    right: -60px;
    width: 210px;
    height: 88px;
    background: var(--blue);
    transform: rotate(-18deg);
    opacity: .75;
    animation: orbit-drift 7s ease-in-out infinite;
  }

  .pixel-orbit--two {
    top: 114px;
    right: 60px;
    width: 76px;
    height: 76px;
    background: var(--red);
    opacity: .82;
    animation: orbit-drift 5s 1s ease-in-out infinite reverse;
  }

  @keyframes orbit-drift {
    50% { translate: 0 -9px; scale: 1.04; }
  }

  .metric-widget {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    color: #15171b;
  }

  .surface--blue { background: var(--blue); }
  .surface--yellow { background: var(--yellow); }
  .metric-widget .widget-label { color: rgba(20,22,26,.55); }
  .metric-widget strong { font-size: 52px; letter-spacing: -.06em; line-height: .8; }
  .metric-widget__caption { z-index: 1; max-width: 165px; font-size: 12px; line-height: 1.45; }

  .metric-widget--experience strong {
    animation: experience-pulse 3s ease-in-out infinite;
    transform-origin: left bottom;
  }

  .experience-signal {
    position: absolute;
    right: 20px;
    bottom: 19px;
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 33px;
    opacity: .55;
  }

  .experience-signal i {
    width: 5px;
    height: 12px;
    border-radius: 4px;
    background: #15171b;
    animation: experience-grow 2.2s ease-in-out infinite alternate;
    transform-origin: bottom;
  }

  .experience-signal i:nth-child(2) { height: 22px; animation-delay: -.7s; }
  .experience-signal i:nth-child(3) { height: 32px; animation-delay: -1.4s; }

  @keyframes experience-pulse { 50% { transform: scale(1.06); } }
  @keyframes experience-grow { 50% { transform: scaleY(.55); opacity: .55; } }

  .metric-widget--focus strong {
    z-index: 1;
    animation: focus-breathe 3.6s ease-in-out infinite;
  }

  .scale-rings {
    position: absolute;
    right: -20px;
    bottom: -34px;
    width: 118px;
    height: 118px;
    pointer-events: none;
  }

  .scale-rings i {
    position: absolute;
    inset: 36px;
    border: 2px solid rgba(20,22,26,.28);
    border-radius: 50%;
    animation: scale-out 3s ease-out infinite;
  }

  .scale-rings i:nth-child(2) { animation-delay: 1s; }
  .scale-rings i:nth-child(3) { animation-delay: 2s; }

  @keyframes focus-breathe { 50% { letter-spacing: -.02em; transform: translateX(3px); } }
  @keyframes scale-out {
    0% { opacity: .7; transform: scale(.4); }
    85%, 100% { opacity: 0; transform: scale(2.3); }
  }

  .now-widget {
    grid-column: 2 / 4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  .now-widget__item {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 14px 18px;
  }

  .now-widget__item:first-child {
    border-right: 1px solid var(--line);
    transition: background .2s ease;
  }

  .now-widget__item:first-child:hover { background: rgba(138,180,248,.07); }

  .now-widget__item--song .now-widget__icon {
    border-radius: 50%;
    animation: record-spin 4s linear infinite;
  }

  .now-widget__item--learning {
    position: relative;
    overflow: hidden;
  }

  .now-widget__item--learning::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--blue), transparent);
    animation: learning-scan 3.2s ease-in-out infinite;
    transform: translateX(-100%);
  }

  .now-widget__item--learning .now-widget__icon {
    animation: learning-think 2.4s ease-in-out infinite;
  }

  @keyframes record-spin { to { transform: rotate(360deg); } }
  @keyframes learning-scan { 50%, 100% { transform: translateX(100%); } }
  @keyframes learning-think { 50% { color: var(--yellow); transform: translateY(-3px) rotate(8deg); } }

  .now-widget__icon {
    display: grid;
    place-items: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border: 1px solid var(--line);
    border-radius: 12px;
    color: var(--blue);
    background: var(--surface-2);
    font-size: 15px;
  }

  .now-widget__item > span:nth-child(2) {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .now-widget__item small {
    margin-bottom: 4px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 8px;
    letter-spacing: .1em;
  }

  .now-widget__item strong {
    overflow: hidden;
    font-size: 13px;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-widget__item em {
    overflow: hidden;
    margin-top: 2px;
    color: var(--muted);
    font-size: 10px;
    font-style: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .equalizer {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 18px;
    margin-left: auto;
  }

  .equalizer i {
    width: 2px;
    height: 5px;
    border-radius: 2px;
    background: var(--green);
    animation: equalize .8s ease-in-out infinite alternate;
  }

  .equalizer i:nth-child(2) { height: 13px; animation-delay: -.3s; }
  .equalizer i:nth-child(3) { height: 9px; animation-delay: -.55s; }
  .equalizer i:nth-child(4) { height: 16px; animation-delay: -.15s; }

  @keyframes equalize { to { transform: scaleY(.35); } }

  .scroll-cue {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 36px auto 0;
    padding: 0;
    border: 0;
    color: var(--muted);
    background: transparent;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .scroll-cue i {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--line);
    border-radius: 50%;
    font-style: normal;
    animation: bob 1.8s ease-in-out infinite;
  }

  @keyframes bob { 50% { transform: translateY(5px); } }

  .impact-strip {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items: center;
    min-height: 130px;
    margin-top: 40px;
    padding: 24px 40px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: #1d1f23;
  }

  .impact-strip div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 7px;
  }

  .impact-strip strong { font-size: 29px; letter-spacing: -.04em; }
  .impact-strip span { color: var(--muted); font-size: 12px; }
  .impact-strip > i { width: 1px; height: 38px; background: var(--line); }

  .section-heading {
    display: block;
    margin-bottom: 38px;
  }

  .section-heading h2 {
    margin: 13px 0 0;
    font-size: clamp(38px, 5.2vw, 68px);
    font-weight: 600;
    letter-spacing: -.055em;
    line-height: .98;
  }

  .section-heading > p {
    max-width: 410px;
    margin: 0 0 5px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
  }

  .timeline {
    display: grid;
    gap: 16px;
  }

  .job-card {
    display: grid;
    grid-template-columns: 104px 230px 1fr;
    gap: 22px;
    padding: 34px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
  }

  .company-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: start;
    flex-direction: column;
    width: 88px;
    height: 70px;
    border-radius: 17px;
    color: #fff;
    background: #080808;
  }

  .company-brand-stack {
    display: flex;
    align-items: center;
    align-self: start;
    flex-direction: column;
  }

  .company-logo span {
    height: 20px;
    color: #a100ff;
    font-family: Arial, sans-serif;
    font-size: 36px;
    font-weight: 800;
    line-height: .5;
  }

  .company-logo small {
    margin-top: 8px;
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: -.02em;
  }

  .job-card__meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 6px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.5;
  }

  .job-card__meta span:first-child {
    color: var(--text);
    font-family: "DM Mono", monospace;
  }

  .job-card__company {
    color: #d6d9df;
    font-weight: 600;
  }

  .job-card__company em {
    display: table;
    margin-top: 7px;
    padding: 5px 8px;
    border-radius: 8px;
    color: #a8c7fa;
    background: rgba(138,180,248,.12);
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
  }

  .job-card__location {
    color: var(--muted);
    font-size: 11px;
  }

  .job-card__content h3 {
    max-width: 690px;
    margin: 0;
    font-size: clamp(22px, 3vw, 34px);
    font-weight: 600;
    letter-spacing: -.035em;
  }

  .job-card__summary {
    max-width: 720px;
    margin: 16px 0 22px;
    color: #c5c8ce;
    font-size: 15px;
    line-height: 1.65;
  }

  .job-card ul {
    display: grid;
    gap: 10px;
    margin: 0 0 25px;
    padding: 0;
    list-style: none;
  }

  .job-card li {
    position: relative;
    padding-left: 21px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.6;
  }

  .job-card li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--blue);
  }

  .job-card--green li::before { color: var(--green); }

  .earlier-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 32px;
  }

  .earlier-card {
    min-height: 255px;
    padding: 22px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .earlier-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  .earlier-card__mark {
    display: grid;
    place-items: center;
    width: 39px;
    height: 39px;
    border-radius: 13px;
    color: #15171a;
    background: var(--yellow);
    font-family: "Manrope", sans-serif;
    font-size: 15px;
    font-weight: 800;
  }

  .earlier-card:nth-child(2) .earlier-card__mark { background: var(--blue); }
  .earlier-card:nth-child(3) .earlier-card__mark { background: var(--green); }

  .earlier-card h4 {
    margin: 0 0 5px;
    font-size: 19px;
    letter-spacing: -.03em;
  }

  .earlier-card > strong {
    color: var(--blue);
    font-size: 12px;
    font-weight: 600;
  }

  .earlier-card > p {
    min-height: 55px;
    margin: 14px 0 18px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.65;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .tag-row span {
    padding: 7px 10px;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: #c7cad0;
    background: rgba(255,255,255,.025);
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .project-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .project-card {
    position: relative;
    overflow: hidden;
    min-height: 690px;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
    transition: transform .35s ease, border-color .35s ease;
  }

  .project-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,.2);
  }

  .project-card__top {
    display: flex;
    justify-content: space-between;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: .09em;
  }

  .project-card__visual {
    position: relative;
    display: grid;
    place-items: center;
    height: 250px;
    margin: 26px 0;
    overflow: hidden;
    border-radius: 26px;
    background: #1a1c1f;
  }

  .visual-core {
    z-index: 2;
    display: grid;
    place-items: center;
    width: 90px;
    height: 90px;
    border-radius: 30px;
    color: #15171a;
    background: var(--yellow);
    font-size: 34px;
    font-weight: 800;
    box-shadow: 0 25px 50px rgba(0,0,0,.28);
    transition: transform .45s cubic-bezier(.2,.8,.2,1);
  }

  .project-card--blue .visual-core { background: var(--blue); }
  .project-card--red .visual-core { background: var(--red); }
  .project-card--green .visual-core { background: var(--green); }
  .project-card:hover .visual-core { transform: scale(1.08) rotate(-4deg); }
  .project-card.is-visible .visual-core { animation: project-float 5s ease-in-out infinite; }

  @keyframes project-float {
    50% { translate: 0 -6px; }
  }

  .visual-pill {
    position: absolute;
    border-radius: 999px;
    background: var(--yellow);
    opacity: .38;
    transition: transform .5s ease;
  }

  .project-card--blue .visual-pill { background: var(--blue); }
  .project-card--red .visual-pill { background: var(--red); }
  .project-card--green .visual-pill { background: var(--green); }
  .visual-pill--a { width: 240px; height: 66px; transform: rotate(22deg) translate(-65px, -52px); }
  .visual-pill--b { width: 180px; height: 56px; transform: rotate(-35deg) translate(90px, 75px); opacity: .2; }
  .visual-pill--c { width: 45px; height: 45px; transform: translate(132px, -70px); opacity: .7; }
  .project-card:hover .visual-pill--a { transform: rotate(15deg) translate(-50px, -55px); }
  .project-card:hover .visual-pill--b { transform: rotate(-28deg) translate(72px, 68px); }

  .project-card h3 {
    margin: 0 0 12px;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -.04em;
  }

  .project-card > p {
    min-height: 65px;
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .project-card__result {
    min-height: 150px;
    margin: 20px 0;
    padding-left: 16px;
    border-left: 2px solid var(--yellow);
    color: #c9ccd1;
    font-size: 12px;
    line-height: 1.6;
  }

  .project-card--blue .project-card__result { border-color: var(--blue); }
  .project-card--red .project-card__result { border-color: var(--red); }
  .project-card--green .project-card__result { border-color: var(--green); }
  .project-card__result span {
    display: block;
    margin-bottom: 4px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: .1em;
  }

  .project-card__result ul {
    display: grid;
    gap: 7px;
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
  }

  .project-card__result li {
    position: relative;
    padding-left: 14px;
  }

  .project-card__result li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--blue);
  }

  .project-card--red .project-card__result li::before { color: var(--red); }
  .project-card--green .project-card__result li::before { color: var(--green); }
  .project-card--yellow .project-card__result li::before { color: var(--yellow); }

  .project-card__link {
    position: absolute;
    right: 28px;
    bottom: 28px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .06em;
  }

  .project-card__link span { transition: transform .2s ease; }
  .project-card__link:hover span { transform: translate(3px, -3px); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .skill-card {
    min-height: 300px;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .skill-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .skill-card__number {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    margin-bottom: 0;
    border-radius: 13px;
    color: #16181b;
    background: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  .skill-icons {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  .skill-icons span {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    margin-left: -8px;
    overflow: hidden;
    border: 2px solid var(--surface);
    border-radius: 50%;
    background: #f7f8fa;
  }

  .skill-icons img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .skill-card--red .skill-card__number { background: var(--red); }
  .skill-card--yellow .skill-card__number { background: var(--yellow); }
  .skill-card--green .skill-card__number { background: var(--green); }
  .skill-card h3 { margin: 0; font-size: 25px; letter-spacing: -.035em; }
  .skill-card > p { margin: 7px 0 24px; color: var(--muted); font-size: 13px; }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-list span {
    padding: 9px 12px;
    border-radius: 12px;
    background: var(--surface-2);
    color: #d9dce0;
    font-size: 12px;
  }

  .cert-row {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 20px;
    margin-top: 18px;
    padding: 25px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .cert-row__label {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .12em;
  }

  .cert-row > div {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
  }

  .cert-badge {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 180px;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--text);
    background: var(--surface-2);
    font-size: 12px;
    font-weight: 700;
    transition: transform .2s ease, border-color .2s ease;
  }

  .cert-badge:hover {
    transform: translateY(-2px);
    border-color: rgba(138,180,248,.5);
  }

  .cert-badge--primary {
    color: #15171a;
    background: #a8c7fa;
  }

  .cert-badge small {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    font-weight: 400;
  }

  .cert-badge--primary small { color: rgba(20,22,25,.6); }

  .education-timeline {
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
  }

  .education-item {
    display: grid;
    grid-template-columns: 170px 1fr auto;
    align-items: center;
    gap: 32px;
    min-height: 155px;
    padding: 30px 36px;
    border-bottom: 1px solid var(--line);
  }

  .education-item:last-child { border-bottom: 0; }

  .education-item--primary {
    min-height: 195px;
    background: linear-gradient(110deg, rgba(138,180,248,.11), transparent 55%);
  }

  .education-item__year {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 13px;
  }

  .education-item__type {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .education-item h3 {
    margin: 8px 0 5px;
    font-size: clamp(20px, 2.8vw, 31px);
    font-weight: 600;
    letter-spacing: -.035em;
  }

  .education-item p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
  }

  .education-item__score {
    padding: 9px 13px;
    border: 1px solid var(--line);
    border-radius: 13px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    white-space: nowrap;
  }

  .assistant-section {
    padding-top: 82px;
    scroll-margin-top: 72px;
  }

  .assistant-card {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    min-height: 410px;
    overflow: hidden;
    border: 1px solid rgba(138,180,248,.22);
    border-radius: var(--radius-lg);
    background: #1d2430;
  }

  .assistant-card__head {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding: 38px;
    background: linear-gradient(140deg, rgba(138,180,248,.13), transparent);
  }

  .assistant-icon {
    display: grid;
    place-items: center;
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    border-radius: 16px;
    color: #17202e;
    background: var(--blue);
  }

  .assistant-card__head span:not(.assistant-icon) {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .assistant-card h2 {
    max-width: 330px;
    margin: 14px 0 0;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 600;
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .assistant-card__body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 38px;
    border-left: 1px solid rgba(138,180,248,.14);
  }

  .assistant-answer {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-height: 88px;
    margin: 0 0 22px;
    padding: 16px;
    border: 1px solid rgba(138,180,248,.14);
    border: 1px solid rgba(138,180,248,.14);
    border-left: 3px solid var(--blue);
    border-radius: 18px 18px 18px 6px;
    background: rgba(138,180,248,.055);
    min-width: 0;
    animation: assistantAnswerIn .35s ease both;
  }

  .assistant-answer > span {
    display: grid;
    place-items: center;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    border-radius: 10px;
    color: #17202e;
    background: var(--blue);
    font-size: 10px;
  }

  .assistant-answer p {
    min-width: 0;
    margin: 1px 0 0;
    color: #d8e2f2;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  .assistant-answer p strong {
    padding: 0 .12em;
    color: #a9cbff;
    font-weight: 750;
    background: rgba(138,180,248,.09);
    border-radius: 4px;
  }

  @keyframes assistantAnswerIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .assistant-suggestions-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 1px 10px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .assistant-suggestions-title small { display: none; font-size: 8px; font-weight: 400; }

  .assistant-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .assistant-options button {
    padding: 10px 13px;
    border: 1px solid rgba(138,180,248,.25);
    border-radius: 13px;
    color: #c7d8ee;
    background: rgba(138,180,248,.06);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s ease;
  }

  .assistant-options button:hover { background: rgba(138,180,248,.15); }
  .assistant-options button.active {
    color: #17202e;
    border-color: var(--blue);
    background: var(--blue);
  }

  .contact-section {
    padding-top: 132px;
    scroll-margin-top: 60px;
  }

  .contact-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 50px;
    padding: clamp(34px, 6vw, 74px);
    border-radius: 50px;
    color: #141619;
    background: var(--blue);
  }

  .contact-card .eyebrow { color: rgba(20,22,25,.55); }
  .contact-card h2 {
    margin: 17px 0 22px;
    font-size: clamp(44px, 7vw, 82px);
    font-weight: 650;
    letter-spacing: -.065em;
    line-height: .94;
  }

  .contact-card h2 span { color: rgba(20,22,25,.5); }
  .contact-card__copy > p:last-child { max-width: 570px; margin: 0; color: rgba(20,22,25,.67); font-size: 14px; line-height: 1.65; }

  .email-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    gap: 30px;
    min-width: 320px;
    padding: 18px 20px;
    border-radius: 18px;
    color: var(--text);
    background: #202226;
    font-size: 13px;
    transition: transform .25s ease;
  }

  .email-button:hover { transform: translateY(-4px); }
  .email-button small {
    display: block;
    margin-bottom: 6px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 8px;
    letter-spacing: .1em;
  }
  .email-button > span:last-child { font-size: 22px; }

  .contact-links {
    grid-column: 1 / 3;
    display: flex;
    gap: 8px;
    padding-top: 26px;
    border-top: 1px solid rgba(20,22,25,.18);
  }

  .contact-links a {
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(20,22,25,.35);
    font-size: 12px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    padding-top: 34px;
    padding-bottom: 34px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .04em;
  }

  footer button {
    padding: 0;
    border: 0;
    color: var(--muted);
    background: transparent;
    font-size: 10px;
    cursor: pointer;
  }

  .overview {
    position: fixed;
    inset: 0;
    z-index: 500;
    display: grid;
    place-items: center;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    background: rgba(8, 9, 11, .7);
    backdrop-filter: blur(16px);
    transition: opacity .3s ease, visibility 0s linear .3s;
  }

  .overview--open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }

  .overview__card {
    position: relative;
    width: min(720px, 100%);
    max-height: calc(100vh - 40px);
    padding: clamp(30px, 5vw, 48px);
    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 42px;
    background:
      radial-gradient(circle at 90% 0%, rgba(138,180,248,.17), transparent 270px),
      #24262a;
    box-shadow: 0 30px 90px rgba(0,0,0,.45);
    opacity: 0;
    transform: perspective(900px) rotateX(7deg) scale(.88) translateY(45px);
    transition: opacity .35s ease, transform .55s cubic-bezier(.16,1,.3,1);
  }

  .overview--open .overview__card {
    opacity: 1;
    transform: perspective(900px) rotateX(0) scale(1) translateY(0);
  }

  .overview__close {
    position: absolute;
    top: 20px;
    right: 20px;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line);
    border-radius: 50%;
    background: rgba(255,255,255,.04);
    font-size: 20px;
    cursor: pointer;
    z-index: 4;
  }

  .overview__orb {
    position: absolute;
    z-index: 0;
    border-radius: 999px;
    pointer-events: none;
    filter: blur(.2px);
  }

  .overview__orb--one {
    top: -45px;
    right: 85px;
    width: 150px;
    height: 70px;
    background: rgba(138,180,248,.24);
    transform: rotate(-24deg);
  }

  .overview__orb--two {
    top: 55px;
    right: 38px;
    width: 40px;
    height: 40px;
    background: rgba(253,214,99,.75);
  }

  .overview__identity {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 22px;
    padding-right: 50px;
  }

  .overview--open .overview__identity { animation: modal-rise .55s .12s both; }

  .overview__avatar {
    flex: 0 0 86px;
    width: 86px;
    height: 86px;
    overflow: hidden;
    border: 4px solid #f5f7fa;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 7px 7px 0 -2px var(--blue);
  }

  .overview--open .overview__avatar { animation: avatar-pop .7s .18s cubic-bezier(.16,1,.3,1) both; }

  .overview__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    transform: scale(1.08);
  }

  .overview__hello {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .overview__card h2 { margin: 9px 0 7px; font-size: clamp(36px, 6vw, 55px); letter-spacing: -.06em; line-height: 1; }

  .overview__status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 10px;
  }

  .overview__status i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 4px rgba(129,201,149,.1);
  }

  .overview__lead {
    position: relative;
    z-index: 1;
    margin: 26px 0 20px;
    color: #d0d3d8;
    font-size: 15px;
    line-height: 1.7;
  }

  .overview--open .overview__lead { animation: modal-rise .55s .2s both; }

  .overview__stats {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
  }

  .overview__stats div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 15px;
    border: 1px solid var(--line);
    border-radius: 17px;
    background: rgba(255,255,255,.035);
  }

  .overview--open .overview__stats div { animation: stat-pop .5s .28s both; }
  .overview--open .overview__stats div:nth-child(2) { animation-delay: .36s; }
  .overview--open .overview__stats div:nth-child(3) { animation-delay: .44s; }

  .overview__stats strong { font-size: 24px; letter-spacing: -.04em; }
  .overview__stats span { color: var(--muted); font-size: 9px; }

  .overview__facts {
    display: grid;
    gap: 0;
    margin: 20px 0;
    border-top: 1px solid var(--line);
  }

  .overview--open .overview__facts { animation: modal-rise .5s .42s both; }

  .overview__facts div {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid var(--line);
    font-size: 12px;
  }

  .overview__facts strong { color: var(--muted); font-weight: 500; }

  .overview__cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    padding: 16px 18px;
    border: 0;
    border-radius: 16px;
    color: #16181b;
    background: var(--blue);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .overview__actions {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .overview--open .overview__actions { animation: modal-rise .5s .5s both; }

  .overview__contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border: 1px solid var(--line);
    border-radius: 16px;
    color: #d8dbe0;
    background: rgba(255,255,255,.035);
    font-size: 11px;
    cursor: pointer;
  }

  @keyframes modal-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes avatar-pop {
    from { opacity: 0; transform: scale(.65) rotate(-10deg); }
    70% { transform: scale(1.08) rotate(3deg); }
    to { opacity: 1; transform: scale(1) rotate(0); }
  }

  @keyframes stat-pop {
    from { opacity: 0; transform: scale(.8) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  :root[data-theme="light"] body {
    background:
      radial-gradient(circle at 15% 0%, rgba(69, 120, 194, 0.12), transparent 32rem),
      var(--bg);
  }

  :root[data-theme="light"] .topbar {
    background: rgba(255, 255, 255, .78);
    box-shadow: 0 14px 35px rgba(68, 61, 46, .1);
  }

  :root[data-theme="light"] .topbar nav button:hover,
  :root[data-theme="light"] .topbar nav button.active,
  :root[data-theme="light"] .theme-toggle {
    background: rgba(32, 33, 36, .055);
  }

  :root[data-theme="light"] .availability {
    color: #316e43;
    background: rgba(70, 150, 93, .12);
  }

  :root[data-theme="light"] .status-pill,
  :root[data-theme="light"] .hero__intro,
  :root[data-theme="light"] .job-card__summary,
  :root[data-theme="light"] .project-card__result {
    color: #4f535b;
  }

  :root[data-theme="light"] .eyebrow,
  :root[data-theme="light"] .widget-label,
  :root[data-theme="light"] .now-widget__item small,
  :root[data-theme="light"] .cert-badge small {
    color: #4d535c;
  }

  :root[data-theme="light"] .job-card__company { color: #34373d; }
  :root[data-theme="light"] .job-card__company em { color: #174ea6; background: #d7e6ff; }

  :root[data-theme="light"] .name-widget:hover { background: #f9fafc; }
  :root[data-theme="light"] .impact-strip { background: #fff; }
  :root[data-theme="light"] .project-card:hover { border-color: rgba(32,33,36,.24); }
  :root[data-theme="light"] .project-card__visual { background: #e8e8e4; }
  :root[data-theme="light"] .tag-row span { color: #52565d; background: rgba(32,33,36,.025); }
  :root[data-theme="light"] .skill-list span { color: #3e4249; }

  :root[data-theme="light"] .assistant-card {
    border-color: rgba(55,105,174,.2);
    background: #e8f0fc;
  }

  :root[data-theme="light"] .assistant-card__body {
    border-color: rgba(55,105,174,.13);
  }

  :root[data-theme="light"] .assistant-answer {
    border-color: rgba(55,105,174,.16);
    border-left-color: var(--blue);
    background: rgba(55,105,174,.05);
  }
  :root[data-theme="light"] .assistant-answer p { color: #35475e; }
  :root[data-theme="light"] .assistant-answer p strong {
    color: #174f91;
    background: rgba(55,105,174,.09);
  }
  :root[data-theme="light"] .assistant-options button { color: #315278; }
  :root[data-theme="light"] .email-button { color: #f1f3f4; }

  :root[data-theme="light"] .overview {
    background: rgba(40, 42, 46, .36);
  }

  :root[data-theme="light"] .overview__card {
    border-color: rgba(32,33,36,.12);
    background: #fff;
    box-shadow: 0 30px 90px rgba(60,55,45,.22);
  }

  :root[data-theme="light"] .overview__lead { color: #4d5158; }
  :root[data-theme="light"] .overview__stats div,
  :root[data-theme="light"] .overview__contact { background: rgba(32,33,36,.025); }
  :root[data-theme="light"] .overview__contact { color: #34373d; }

  :root[data-theme="light"] .loader {
    color: #f1f3f4;
    background: #131416;
  }

  :root[data-theme="light"] .loader__text { color: #a9adb5; }

  @media (max-width: 860px) {
    .cursor-dot, .cursor-ring, .mouse-glow { display: none; }
    .topbar { grid-template-columns: auto 1fr auto; padding-left: 16px; }
    .topbar nav { justify-self: center; }
    .topbar nav button { padding: 9px 8px; font-size: 10px; }
    .topbar nav button:nth-child(5) { display: none; }
    .availability { display: none; }
    .hero { padding-top: 125px; }
    .hero__intro { margin-left: 0; }
    .widget-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 270px 150px 105px; }
    .name-widget { grid-column: 1 / 3; grid-row: auto; }
    .now-widget { grid-column: 1 / 3; }
    .job-card { grid-template-columns: 100px 1fr; }
    .job-card__meta { grid-column: 2; }
    .job-card__content { grid-column: 2; }
    .earlier-grid { grid-template-columns: repeat(2, 1fr); }
    .earlier-card:last-child { grid-column: 1 / -1; }
    .education-item { grid-template-columns: 130px 1fr auto; gap: 22px; }
    .assistant-card { grid-template-columns: 1fr; min-height: 0; }
    .assistant-card__head { padding: 30px; }
    .assistant-card__body {
      min-width: 0;
      padding: 28px;
      border-top: 1px solid rgba(138,180,248,.14);
      border-left: 0;
    }
    .assistant-answer {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      min-height: 0;
    }
    .assistant-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .assistant-options button {
      width: 100%;
      min-width: 0;
      min-height: 50px;
      text-align: left;
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .contact-card { grid-template-columns: 1fr; }
    .email-button { min-width: 0; width: 100%; }
    .contact-links { grid-column: auto; }
  }

  @media (max-width: 640px) {
    body { padding-bottom: calc(74px + env(safe-area-inset-bottom)); }
    .section-shell { width: min(100% - 24px, 1180px); }
    .content-section, .assistant-section, .contact-section { padding-top: 78px; scroll-margin-top: 70px; }

    .topbar {
      top: 10px;
      grid-template-columns: auto auto;
      justify-content: space-between;
      width: calc(100% - 20px);
      min-height: 52px;
      padding: 6px 7px 6px 16px;
      border-radius: 17px;
    }
    .brand { display: block; }
    .topbar > nav { display: none; }
    .topbar__actions { justify-self: end; }
    .theme-toggle { width: 38px; height: 38px; border-radius: 12px; }

    .mobile-nav {
      position: fixed;
      right: 10px;
      bottom: calc(9px + env(safe-area-inset-bottom));
      left: 10px;
      z-index: 110;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      min-height: 68px;
      padding: 6px 5px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(34,36,40,.9);
      box-shadow: 0 14px 40px rgba(0,0,0,.32);
      backdrop-filter: blur(20px);
    }

    .mobile-nav button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
      padding: 5px 2px;
      border: 0;
      border-radius: 16px;
      color: var(--muted);
      background: transparent;
      cursor: pointer;
    }

    .mobile-nav button > span {
      display: grid;
      place-items: center;
      width: 34px;
      height: 28px;
      border-radius: 999px;
      transition: width .2s ease, color .2s ease, background .2s ease;
    }

    .mobile-nav button svg {
      width: 20px;
      height: 20px;
    }

    .mobile-nav button small {
      max-width: 100%;
      overflow: hidden;
      font-size: 9px;
      font-weight: 600;
      text-overflow: ellipsis;
    }

    .mobile-nav button.active { color: var(--text); }
    .mobile-nav button.active > span {
      width: 42px;
      color: #15171a;
      background: var(--blue);
    }

    .mobile-nav button:nth-child(1).active > span { background: var(--green); }
    .mobile-nav button:nth-child(2).active > span { background: var(--blue); }
    .mobile-nav button:nth-child(4).active > span { background: var(--red); }
    .mobile-nav button:nth-child(5).active > span { background: var(--green); }

    .mobile-nav button.featured > span {
      width: 46px;
      height: 36px;
      margin-top: -10px;
      color: #17202e;
      background: var(--yellow);
      box-shadow: 0 7px 18px rgba(253,214,99,.25);
    }

    .mobile-nav button.featured small {
      color: var(--text);
      font-weight: 700;
    }

    :root[data-theme="light"] .mobile-nav {
      background: rgba(255,255,255,.9);
      box-shadow: 0 14px 40px rgba(60,55,45,.16);
    }

    .hero { min-height: auto; padding-top: 96px; padding-bottom: 30px; }
    .hero__status { margin-bottom: 34px; }
    .hero__location { display: none; }
    .hero__heading h1 { margin-top: 12px; font-size: clamp(42px, 13.5vw, 62px); line-height: .96; }
    .hero__intro { margin-bottom: 32px; font-size: 16px; line-height: 1.65; }
    .accent-word::after { right: -13px; width: 9px; height: 9px; }
    .widget-grid { display: grid; grid-template-rows: 240px 130px auto; gap: 9px; }
    .name-widget { padding: 22px; }
    .profile-orb { top: 21px; right: 21px; width: 68px; height: 68px; border-width: 4px; }
    .pixel-orbit--one { width: 160px; height: 68px; }
    .pixel-orbit--two { top: 95px; right: 45px; width: 55px; height: 55px; }
    .name-widget__name { font-size: 34px; }
    .name-widget__role { max-width: 230px; font-size: 12px; line-height: 1.45; }
    .name-widget__action { font-size: 12px; }
    .metric-widget { min-width: 0; padding: 17px; }
    .metric-widget strong { font-size: 38px; }
    .metric-widget .widget-label { font-size: 9px; }
    .metric-widget__caption { max-width: 125px; font-size: 10px; line-height: 1.45; }
    .experience-signal { right: 12px; bottom: 14px; transform: scale(.75); transform-origin: right bottom; }
    .scale-rings { right: -35px; bottom: -44px; transform: scale(.75); }
    .now-widget {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, minmax(76px, auto));
      padding: 0;
    }
    .now-widget__item { gap: 11px; min-width: 0; min-height: 76px; padding: 12px 16px; }
    .now-widget__item:first-child {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }
    .now-widget__icon { display: grid; flex-basis: 34px; width: 34px; height: 34px; }
    .equalizer { display: flex; }
    .now-widget__item small { font-size: 8px; }
    .now-widget__item strong {
      font-size: 13px;
      text-overflow: unset;
      white-space: normal;
    }
    .now-widget__item em {
      font-size: 10px;
      line-height: 1.35;
    }
    .now-widget__item--learning em {
      text-overflow: unset;
      white-space: normal;
    }
    .impact-strip { grid-template-columns: 1fr 1fr; gap: 28px 10px; padding: 30px 20px; }
    .impact-strip > i { display: none; }
    .impact-strip strong { font-size: 21px; }
    .impact-strip span { font-size: 11px; text-align: center; }
    .section-heading { margin-bottom: 28px; }
    .section-heading h2 { font-size: 40px; }
    .job-card { grid-template-columns: 1fr; gap: 17px; padding: 22px; border-radius: 26px; }
    .job-card__meta, .job-card__content { grid-column: 1; }
    .job-card__meta { flex-direction: column; }
    .company-brand-stack { align-items: flex-start; }
    .company-logo { width: 88px; }
    .job-card__content h3 { font-size: 25px; }
    .job-card__meta { font-size: 12px; }
    .job-card__location { font-size: 11px; }
    .job-card__summary { font-size: 14px; }
    .job-card li { font-size: 13px; }
    .earlier-grid { grid-template-columns: 1fr; }
    .earlier-card, .earlier-card:last-child { grid-column: auto; min-height: 0; }
    .earlier-card > p { min-height: 0; }
    .project-grid, .skills-grid { grid-template-columns: 1fr; }
    .project-card { min-height: auto; padding: 20px; border-radius: 26px; }
    .project-card:last-child:nth-child(odd) { grid-column: auto; }
    .project-card__visual { height: 190px; margin: 20px 0; }
    .project-card h3 { font-size: 28px; }
    .project-card > p { min-height: auto; font-size: 14px; }
    .project-card__result { min-height: auto; font-size: 12px; }
    .tag-row span { font-size: 10px; }
    .project-card__link { position: static; margin-top: 20px; }
    .skill-card { min-height: auto; padding: 22px; }
    .skill-card__top { margin-bottom: 24px; }
    .skill-card > p { font-size: 13px; line-height: 1.55; }
    .skill-list span { font-size: 12px; }
    .cert-row { grid-template-columns: 1fr; padding: 20px; }
    .cert-row > div { display: grid; grid-template-columns: 1fr; }
    .cert-badge { width: 100%; min-width: 0; }
    .education-item,
    .education-item--primary {
      grid-template-columns: 1fr;
      gap: 12px;
      min-height: 0;
      padding: 25px 22px;
    }
    .education-item p { font-size: 13px; line-height: 1.5; }
    .education-item__year { font-size: 11px; }
    .education-item__score { justify-self: start; font-size: 10px; }
    .assistant-card { min-height: 0; border-radius: 27px; }
    .assistant-section { padding-top: 64px; }
    .assistant-card__head {
      align-items: center;
      gap: 13px;
      padding: 22px 20px;
    }
    .assistant-icon { flex-basis: 40px; width: 40px; height: 40px; border-radius: 14px; }
    .assistant-card__head span:not(.assistant-icon) { font-size: 8px; }
    .assistant-card h2 { max-width: 260px; margin-top: 7px; font-size: 27px; }
    .assistant-card__body { padding: 20px; }
    .assistant-answer {
      display: grid;
      grid-template-columns: 25px minmax(0, 1fr);
      min-height: 0;
      margin-bottom: 18px;
      padding: 14px;
      border-radius: 17px 17px 17px 5px;
    }
    .assistant-answer > span { flex-basis: 25px; width: 25px; height: 25px; border-radius: 9px; }
    .assistant-answer p { font-size: 14px; line-height: 1.6; }
    .assistant-suggestions-title { margin-bottom: 9px; font-size: 8px; }
    .assistant-suggestions-title small { display: none; }
    .assistant-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      overflow: visible;
      margin: 0;
      padding: 0;
    }
    .assistant-options button {
      width: 100%;
      min-width: 0;
      min-height: 58px;
      padding: 11px 13px;
      border-radius: 15px;
      font-size: 12px;
      line-height: 1.4;
      text-align: left;
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .contact-card { gap: 30px; padding: 30px 22px; border-radius: 28px; }
    .contact-card h2 { font-size: 42px; }
    .contact-card__copy > p:last-child { font-size: 14px; }
    .email-button { gap: 12px; padding: 16px; font-size: 11px; word-break: break-all; }
    .contact-links { flex-direction: column; }
    footer { flex-wrap: wrap; gap: 14px; padding-bottom: 24px; }
    footer span:nth-child(2) { display: none; }
    .overview { padding: 10px; }
    .overview__card { max-height: calc(100dvh - 20px); padding: 28px 22px; border-radius: 30px; }
    .overview__identity { align-items: flex-start; gap: 15px; padding-right: 35px; }
    .overview__avatar { flex-basis: 65px; width: 65px; height: 65px; border-width: 3px; }
    .overview__card h2 { font-size: 33px; }
    .overview__hello { font-size: 8px; }
    .overview__status { font-size: 9px; }
    .overview__lead { margin-top: 22px; font-size: 14px; }
    .overview__stats { gap: 6px; }
    .overview__stats div { padding: 12px 9px; }
    .overview__stats strong { font-size: 20px; }
    .overview__stats span { font-size: 8px; }
    .overview__facts div { grid-template-columns: 1fr; gap: 5px; }
    .overview__actions { grid-template-columns: 1fr; }
    .overview__cta, .overview__contact { width: 100%; }
  }

  @media (max-width: 390px) {
    .mobile-nav button small { font-size: 8px; }
    .hero__heading h1 { font-size: 41px; }
    .widget-grid { grid-template-rows: 235px 126px auto; }
    .name-widget__name { max-width: 230px; font-size: 31px; }
    .profile-orb { width: 62px; height: 62px; }
    .metric-widget strong { font-size: 34px; }
    .now-widget__item strong { font-size: 11px; }
    .impact-strip { padding-inline: 14px; }
    .section-heading h2 { font-size: 37px; }
    .contact-card h2 { font-size: 38px; }
  }

  @media (max-width: 340px) {
    .now-widget__item { justify-content: center; padding: 9px; }
    .now-widget__item > span:nth-child(2) { display: none; }
    .now-widget__icon { flex-basis: 40px; width: 40px; height: 40px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;

export default App;
