export const PORTFOLIO_DATA = {
  name: "Viraj Jain",
  email: "vjvirajjain122005@gmail.com",
  github: "https://github.com/virajj12",
  linkedin: "https://linkedin.com/in/viraj-jain25",
  location: "Karnataka, India",
  hero: {
    greeting: "Hi, I'm",
    roles: [
      "Computer Science Engineering Student",
      "Full-Stack Developer",
      "ML & Data Enthusiast",
    ],
    valueProp:
      "Building data-driven, real-world applications with Python, Java, and full-stack web technologies.",
  },
  about: {
    bio: "I am a Computer Science Engineering student at Alva's Institute of Engineering and Technology with a strong foundation in Python, Java, and full-stack web technologies. I am passionate about turning data into real-world impact through algorithmic thinking and machine learning concepts. My goal is to build scalable, data-driven applications that solve complex problems.",
    stats: {
      cgpa: "7.81",
      institute: "Alva's Institute of Engineering and Technology",
      location: "Karnataka, India",
    },
    education: [
      {
        degree: "B.E. Computer Science",
        institution: "School of Computer Engineering, Alva's Institute of Engineering and Technology",
        score: "CGPA 7.81",
        year: "Pursuing",
      },
      {
        degree: "PUC",
        institution: "Jain Junior College, Moodubidri, Karnataka",
        score: "89.33%",
        year: "2021–2023",
      },
      {
        degree: "SSLC",
        institution: "Blossom English Medium School, Belvai, Karnataka",
        score: "94.56%",
        year: "2021",
      },
    ],
  },
  skills: [
    {
      category: "Core Technologies",
      items: ["Java", "React.js", "JavaScript", "Python", "C", "HTML5", "CSS3"],
    },
    {
      category: "Databases & Cloud",
      items: ["SQL", "MongoDB", "SQLite", "Firebase", "Vercel"],
    },
    {
      category: "Web, Integration & Data Engineering",
      items: ["Node.js", "FastAPI", "Streamlit", "Pandas", "NumPy"],
    },
    {
      category: "Certifications",
      items: ["Infosys Springboard – Associate in IT Foundation Skills (Java)", "DSA", "DBMS", "NoSQL"],
    },
  ],
  projects: [
    {
      title: "College Connect",
      tech: ["Node.js", "Express.js", "MongoDB", "React"],
      description:
        "Centralized platform for academic notifications with JWT-secured role-based access control for faculty to manage announcements, plus a dynamic filterable React feed for curriculum updates.",
      github: "https://github.com/virajj12/College-Connect",
      live: "https://college-connect-alvas.vercel.app",
      featured: true,
    },
    {
      title: "Habit Tracker Pro",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      description:
        "Full-stack habit management platform with secure authentication, role-based database models, and custom React heatmap components for visualizing daily logs.",
      github: "https://github.com/virajj12/habit-tracker-pro",
      live: "https://habit-tracker-pro-azure.vercel.app/",
      featured: false,
    },
    {
      title: "SecureVault",
      tech: ["Python", "Streamlit", "SQLite", "Cryptography"],
      description:
        "Security platform using AES-256 encryption and a real-time audit trail, with blind indexing via HMAC trapdoors enabling searchable encrypted data without ever exposing plaintext.",
      github: "https://github.com/virajj12/securevault",
      featured: true,
    },
    {
      title: "Smart Hotel Monitoring System",
      tech: ["Python", "FastAPI", "YOLO", "OpenCV"],
      description:
        "Computer-vision system (YOLO) for real-time kitchen hygiene monitoring — detects pests and dress-code violations and triggers threaded SMTP email alerts with snapshot evidence.",
      github: "https://github.com/vinith-0430/Smart-hotel-monitoring-system",
      featured: false,
    },
  ],
  experience: [
    {
      title: "Promotion Team Lead",
      organization: "Xypheria (National Level Hackathon)",
      description:
        "Spearheaded digital promotion, driving 100,000+ dashboard views and maximizing participation through data-driven strategy.",
    },
    {
      title: "Video Editor & Social Media Team",
      organization: "TEDx AIET",
      description:
        "Produced engaging promotional content with a multidisciplinary team, amplifying the event's digital footprint.",
    },
    {
      title: "Event Branding & Digital Promotion",
      organization: "Various College Events",
      description:
        "Directed social media strategy and designed visual assets for major college events.",
    },
  ],
};
