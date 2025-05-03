
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <h1 className="text-2xl font-bold">CV.AI</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About CV.AI</h1>
          
          <div className="space-y-6">
            <p className="text-lg">
              CV.AI is a cutting-edge platform designed to help job seekers create professional CVs and cover letters with the assistance of artificial intelligence. Our mission is to empower individuals in their job search by providing them with the tools they need to present themselves effectively to potential employers.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
            <p>
              Our mission is to democratize access to professional CV and cover letter creation, making it easy for everyone to create documents that showcase their skills and experience in the best possible light. We believe that everyone deserves the opportunity to present themselves professionally, regardless of their background or experience with CV writing.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8">How We Help</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered CV builder with real-time suggestions</li>
              <li>ATS-friendly templates designed to pass automated screening systems</li>
              <li>Personalized cover letter generation based on job descriptions</li>
              <li>Comprehensive CV reviews with actionable feedback</li>
              <li>Job matching technology to identify missing skills and optimization opportunities</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8">Our Technology</h2>
            <p>
              CV.AI leverages advanced AI technology to analyze CVs, generate optimized content, and provide valuable feedback. Our system is designed to understand the nuances of different industries and job roles, ensuring that the guidance provided is relevant and effective for your specific career path.
            </p>
            
            <div className="mt-8 border-t pt-8">
              <p className="text-center text-muted-foreground">
                Ready to create your professional CV with AI assistance?
              </p>
              <div className="flex justify-center mt-4">
                <Button asChild>
                  <Link to="/create-cv">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CV.AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
