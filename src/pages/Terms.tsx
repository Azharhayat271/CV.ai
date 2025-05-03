
import { Link } from "react-router-dom";

const Terms = () => {
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
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using CV.AI, you agree to be bound by these Terms of Service. 
                If you do not agree to all the terms and conditions, you may not access or use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
              <p>
                CV.AI provides tools for creating, editing, and optimizing CVs and cover letters 
                with AI assistance. Our services include CV builders, cover letter generators, 
                CV reviews, and job matching features.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
              <p>
                Some features of our services may require you to create an account. You are responsible 
                for maintaining the confidentiality of your account information and for all activities 
                that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
              <p>
                You retain all rights to the content you create using our services, including your 
                CVs and cover letters. By using our services, you grant us a license to store, 
                process, and display your content as necessary to provide our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Storage</h2>
              <p>
                We use localStorage to store your data directly in your browser. This means your 
                personal information, CVs, and cover letters are stored locally on your device. 
                Please be aware that clearing your browser cache or using different browsers may 
                affect access to your saved data.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. AI-Generated Content</h2>
              <p>
                Our AI features generate content based on the information you provide. While we 
                strive for accuracy and quality, we do not guarantee that AI-generated content 
                will be error-free or suitable for all purposes. You are responsible for reviewing 
                and editing any AI-generated content before using it.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitations of Liability</h2>
              <p>
                To the maximum extent permitted by law, CV.AI shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use 
                of or inability to use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of significant changes. 
                Your continued use of our services after such changes constitutes your acceptance 
                of the new Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at terms@cvai.example.com.
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

export default Terms;
