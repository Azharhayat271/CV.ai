import React, { useState, useEffect } from 'react';
import { Command, CheckCircle, ArrowRight } from 'lucide-react';

const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Auto-advance through steps for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Create Your CV",
      description: "Fill in your details and our AI will help format everything professionally. Choose from templates tailored to your industry.",
      icon: <Command className="w-5 h-5" />
    },
    {
      number: 2,
      title: "AI Review",
      description: "Get instant feedback to optimize your CV for ATS systems and recruiters, highlighting your strengths effectively.",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      number: 3,
      title: "Export & Apply",
      description: "Download your polished CV and use our tailored cover letters to apply with confidence to your dream jobs.",
      icon: <ArrowRight className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full bg-background">
      <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
        {/* Simplified background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl">
          {/* Header section - more compact */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              <Command className="w-4 h-4 mr-2" />
              <span>Streamlined Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mb-4">
              Our simple three-step process makes creating professional CVs effortless
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/30 rounded-full"></div>
          </div>

          {/* Main content grid - adjusted for better responsive behavior */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`transition-all duration-300 ${activeStep === index ? 'md:translate-y-0' : 'md:translate-y-2'}`}
              >
                <div className={`bg-card border rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${activeStep === index ? 'border-primary/30' : 'border-border/40'}`}>
                  {/* Smaller background element to prevent overflow */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full blur-lg"></div>
                  
                  {/* Step number with simpler styling */}
                  <div className="flex items-center mb-4">
                    <div className={`h-10 w-10 rounded-lg ${activeStep === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} flex items-center justify-center text-base font-medium transition-colors duration-300`}>
                      {step.number}
                    </div>
                    <div className="ml-3 flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
                  </div>
                  
                  {/* Icon with background */}
                  <div className="p-2 bg-primary/10 rounded-lg inline-flex items-center justify-center mb-3 text-primary">
                    {step.icon}
                  </div>
                  
                  {/* Content - more compact */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                  
                  {/* Learn more button - smaller */}
                  <button 
                    className={`mt-4 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center ${activeStep === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} hover:opacity-90 transition-all`}
                  >
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action - more compact */}
          <div className="mt-12 text-center">
            <button className="px-6 py-2 bg-primary text-white rounded-full font-medium shadow hover:shadow-md hover:bg-primary/90 transition-all">
              Get Started Now
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              Join over 10,000 professionals who've improved their job prospects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workflow;