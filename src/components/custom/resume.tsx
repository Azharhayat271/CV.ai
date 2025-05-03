import { useState } from 'react';
import { Image, CirclePlus, Star, Palette, Github, Linkedin, Mail, Phone, MapPin, BookOpen, Award, Code, Briefcase, Calendar } from 'lucide-react';

export default function CVMacWindow() {
  const [activeSection, setActiveSection] = useState('summary');

  const personalInfo = {
    name: "Azhar Hayat",
    phone: "+92 307 669 6182",
    email: "Azharhayat271@gmail.com",
    linkedin: "linkedin.com/in/azhar-hayat-a44779254",
    github: "github.com/Azharhayat271",
    website: "azharhayat.me"
  };

  const education = {
    university: "University of Engineering and Technology, Lahore",
    degree: "BSc in Computer Science",
    gpa: "CGPA: 3.3",
    location: "Narowal, Pakistan",
    period: "Nov 2021 – Present"
  };

  const experiences = [
    {
      role: "Software Developer Intern",
      company: "Firm Tech Services",
      period: "Jun 2024 – Present",
      location: "Lahore, Pakistan",
      responsibilities: [
        "Developed and deployed 5 business websites using React.js, Laravel, and WordPress",
        "Built a full-stack LMS using React.js and Node.js to manage courses and student data",
        "Designed a CRM product template to streamline customer data handling"
      ]
    },
  ];

  const projects = [
    {
      title: "AI Mock Interview Platform",
      tech: "NLP, Node.js, React",
      description: [
        "Developed an AI platform simulating interviews using NLP and interactive dashboards",
        "Provided real-time feedback and performance metrics to users"
      ]
    }
  ];

  const skills = {
    languages: ["JavaScript", "Python", "C++", "SQL"],
    webTech: ["React", "Node.js", "Express", "REST APIs", "Laravel", "WordPress", "Next.js"],
    mobile: ["Flutter", "Firebase"],
    tools: ["Postman", "Git", "VS Code"],
    concepts: ["OOP", "Data Structures", "Testing"]
  };

  const achievements = [
    "2nd Place - Devathon by Devsinc (2024): Developed a complete web app in a competitive environment showcasing advanced full-stack skills",
    "Vice Chairperson - IEEE Computer Society, UET Narowal (2024 – Present)",
    "Meta React Basics — HackerRank Certificate"
  ];

  return (
    <div className="mt-12 relative h-auto opacity-90">
      <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-2xl overflow-hidden border border-border/40 backdrop-blur-sm">
        {/* Mac-like window header with traffic lights */}
        <div className="h-10 bg-gradient-to-r from-muted/80 to-muted/50 border-b border-border/40 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/90 flex items-center justify-center group cursor-pointer">
              <span className="opacity-0 group-hover:opacity-70 text-xs font-bold">×</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 flex items-center justify-center group cursor-pointer">
              <span className="opacity-0 group-hover:opacity-70 text-xs font-bold">−</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 flex items-center justify-center group cursor-pointer">
              <span className="opacity-0 group-hover:opacity-70 text-xs font-bold">+</span>
            </div>
          </div>
          <div className="flex-1 text-xs text-center text-muted-foreground">Azhar Hayat CV</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground/70 px-1.5 py-0.5 rounded bg-muted/30 border border-border/20">CV</div>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-muted/50 flex items-center justify-center">
                <Image className="w-2.5 h-2.5 text-foreground/40" />
              </div>
              <div className="w-4 h-4 rounded bg-muted/50 flex items-center justify-center">
                <Palette className="w-2.5 h-2.5 text-foreground/40" />
              </div>
            </div>
          </div>
        </div>
        
        {/* CV Content */}
        <div className="p-6">
          {/* Header with name and contact */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{personalInfo.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{personalInfo.email}</span>
              </a>
              <a href={`https://${personalInfo.linkedin}`} className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <span>{personalInfo.linkedin}</span>
              </a>
              <a href={`https://${personalInfo.github}`} className="flex items-center gap-1">
                <Github className="w-3 h-3" />
                <span>{personalInfo.github}</span>
              </a>
              <a href={`https://${personalInfo.website}`} className="flex items-center gap-1">
                <Image className="w-3 h-3" />
                <span>{personalInfo.website}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['summary', 'education', 'experience', 'projects', 'skills', 'achievements'].map((section) => (
              <button 
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeSection === section 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Summary Section */}
          {activeSection === 'summary' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CirclePlus className="w-5 h-5 text-primary" />
                Summary
              </h2>
              <p className="text-muted-foreground">
                Final-year Computer Science student experienced in full-stack development (React.js, Node.js, MongoDB,
                Express.js). Passionate about building impactful products, solving real-world problems, and exploring emerging
                technologies.
              </p>
            </div>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Education
              </h2>
              <div className="p-4 border border-border/20 rounded-lg bg-muted/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{education.university}</h3>
                    <div className="text-sm text-muted-foreground">{education.degree} | {education.gpa}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3" />
                      <span>{education.period}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{education.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Experience
              </h2>
              {experiences.map((exp, index) => (
                <div key={index} className="p-4 border border-border/20 rounded-lg bg-muted/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.role}</h3>
                      <div className="text-sm text-muted-foreground">{exp.company}</div>
                    </div>
                    <div className="text-sm text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="p-4 border border-border/20 rounded-lg bg-muted/10">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{project.title}</h3>
                    <div className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{project.tech}</div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {project.description.map((desc, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Technical Skills
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">Languages</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.languages.map((lang, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">{lang}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Web Technologies</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.webTech.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Mobile</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.mobile.map((m, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Tools</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.tools.map((tool, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">{tool}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Concepts</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.concepts.map((concept, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">{concept}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {activeSection === 'achievements' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements & Leadership
              </h2>
              <ul className="space-y-2">
                {achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}