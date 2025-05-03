
import { Link } from "react-router-dom";

const Privacy = () => {
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
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
              <p>
                This Privacy Policy describes how CV.AI ("we," "us," or "our") collects, uses, 
                and shares your personal information when you use our website and services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
              <p className="mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information you provide (name, email, etc.)</li>
                <li>CV and cover letter content</li>
                <li>Usage data and analytics</li>
                <li>Device and browser information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Create and maintain your account</li>
                <li>Process and store your CV and cover letter data</li>
                <li>Send you updates and communications</li>
                <li>Analyze usage patterns to improve our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
              <p>
                We use localStorage to store your data directly in your browser. This means your 
                personal information, CVs, and cover letters are stored locally on your device. 
                We implement appropriate security measures to protect your data, but please be 
                aware that localStorage has its limitations, including the fact that data may be 
                cleared if you clear your browser cache.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Update and correct your personal information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@cvai.example.com.
              </p>
            </section>
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

export default Privacy;
