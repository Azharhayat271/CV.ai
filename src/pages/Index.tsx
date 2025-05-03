import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Star,
  Command,
  CirclePlus,
  Image,
  Sparkles,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Resume from "@/components/custom/resume";
import Workflow from "@/components/custom/workflow";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".animate-on-scroll");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar with subtle animation and glass effect */}
      <header
        className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-10 transition-all duration-300"
        style={{
          boxShadow: scrollY > 10 ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/90 to-primary/40 flex items-center justify-center text-primary-foreground">
              <Command size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CV.AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Button
              variant="outline"
              className="hover:bg-primary/10 transition-all"
              asChild
            >
              <Link to="/dashboard">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with animated gradient and floating elements */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl"></div>

          {/* Floating design elements */}
          <div className="absolute top-[20%] left-[15%] w-8 h-8 rounded-full bg-primary/10 animate-pulse"></div>
          <div
            className="absolute bottom-[30%] right-[20%] w-6 h-6 rounded-full bg-primary/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-[40%] right-[15%] w-4 h-4 rounded-full bg-primary/15 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-4xl space-y-8 relative">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>AI-Powered CV Builder</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
              Create Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Perfect CV
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Get hired faster with an ATS-friendly CV and personalized cover
              letter crafted by advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in">
              <Button
                size="lg"
                className="group transition-all duration-300 hover:scale-105 relative overflow-hidden"
                asChild
              >
                <Link to="/create-cv">
                  <span className="relative z-10">Create My CV</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-all duration-300 hover:bg-primary/10 border-primary/20"
                asChild
              >
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Visual element with Mac-style window */}
          <Resume></Resume>

          {/* Floating badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "ATS-Friendly",
              "AI-Powered",
              "Professional Templates",
              "Job Matching",
            ].map((badge, index) => (
              <div
                key={index}
                className="px-4 py-1.5 rounded-full bg-background border border-border/60 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>


      <Workflow></Workflow>     

      {/* Testimonials Section - Enhanced with Mac-style cards */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 animate-on-scroll opacity-0">
              <Star className="w-4 h-4 mr-1" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl font-bold animate-on-scroll opacity-0">
              What Our Users Say
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/30 rounded-full mt-4"></div>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto animate-on-scroll opacity-0">
              Join thousands of professionals who have transformed their job
              search with CV.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 flex-grow italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features with enhanced icon cards */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 animate-on-scroll opacity-0">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Powerful Tools</span>
            </div>
            <h2 className="text-3xl font-bold animate-on-scroll opacity-0">
              Key Features
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/30 rounded-full mt-4"></div>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto animate-on-scroll opacity-0">
              Our platform provides everything you need to create professional
              CVs and land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4 h-full">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10 shadow-sm group-hover:shadow-md transition-all">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced glass card */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_75%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_80%)]"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative animate-on-scroll opacity-0">
          <div className="bg-card/80 backdrop-blur-md border rounded-xl p-8 md:p-12 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-80"></div>

            <div className="text-center space-y-6 relative">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>Get Started</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to transform your job search?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals who have accelerated their
                careers with our AI-powered tools
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg relative overflow-hidden group"
                  asChild
                >
                  <Link to="/create-cv">
                    <span className="relative z-10">Get Started Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Mac-style design */}
      <footer className="py-12 px-4 bg-muted border-t">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/90 to-primary/40 flex items-center justify-center text-primary-foreground">
              <Command size={24} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">CV.AI</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create professional CVs with the power of AI. We help you land
                your dream job.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="h-8 w-8 rounded-lg bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/90 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-lg bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/90 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    CV Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cover Letter Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Job Interview Tips
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-5 w-5 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <Command size={12} />
              </div>
              <span>Made with AI-powered tools</span>
            </div>
            <p>&copy; {new Date().getFullYear()} CV.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 h-10 w-10 bg-card shadow-lg border border-border/60 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 z-10"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>
    </div>
  );
};

// Sample testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Marketing Specialist",
    quote:
      "Thanks to CV.AI, I was able to land my dream job in just 2 weeks! The AI suggestions helped me highlight skills I didn't even know were valuable.",
  },
  {
    name: "Michael Chen",
    position: "Software Engineer",
    quote:
      "The ATS optimization feature is a game-changer. My applications are finally getting through, and I've had 5 interviews in the last month.",
  },
  {
    name: "Emma Rodriguez",
    position: "Product Manager",
    quote:
      "The cover letter generator saved me hours of work. It perfectly matched the tone of each company I applied to, which really impressed recruiters.",
  },
];

// Features data with icons
const features = [
  {
    title: "AI-Powered CV Builder",
    description:
      "Get real-time suggestions, automatic formatting, and eliminate common resume mistakes with our intelligent assistant.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-file-text"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "ATS-Friendly Templates",
    description:
      "Use templates designed to pass Applicant Tracking Systems with modern, professional layouts.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-template"
      >
        <rect width="18" height="7" x="3" y="3" rx="1" />
        <rect width="9" height="7" x="3" y="14" rx="1" />
        <rect width="5" height="7" x="16" y="14" rx="1" />
      </svg>
    ),
  },
  {
    title: "Cover Letter Generation",
    description:
      "Create personalized cover letters with AI that match your target job and company culture.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "CV Review & Feedback",
    description:
      "Receive comprehensive reviews with actionable feedback to improve your CV and stand out to employers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-circle"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
  {
    title: "Resume Matcher",
    description:
      "Match your CV against job descriptions to identify missing skills and suggest targeted improvements.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-target"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Secure Document Storage",
    description:
      "Store all your CVs, cover letters, and job applications securely with easy access from any device.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shield"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
];

// Quick benefits for CTA section
const benefits = [
  "ATS-Friendly Templates",
  "AI-Powered Suggestions",
  "Personalized Cover Letters",
  "Expert CV Reviews",
  "Job Matching Technology",
];

export default Index;
