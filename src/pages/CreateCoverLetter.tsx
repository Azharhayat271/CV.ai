import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Download, Wand2 } from "lucide-react";
import { generateId, saveCoverLetter, getCVs, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";

const CreateCoverLetter = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const coverLetterRef = useRef<HTMLDivElement>(null);
  const [coverLetter, setCoverLetter] = useState({
    id: generateId(),
    userId: "user-" + generateId(),
    cvId: "",
    name: "My Cover Letter",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  const cvs = getCVs();
  
  const handleGenerateCoverLetter = () => {
    if (!coverLetter.jobDescription || !coverLetter.jobTitle || !coverLetter.companyName) {
      toast({
        title: "Missing Information",
        description: "Please provide the job title, company name, and job description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const generatedContent = 
        `Dear Hiring Manager,\n\n` +
        `I am writing to express my interest in the ${coverLetter.jobTitle} position at ${coverLetter.companyName}. ` +
        `With my background and skills, I believe I would be a valuable addition to your team.\n\n` +
        `Throughout my career, I have developed expertise in areas that align perfectly with the requirements outlined in your job description. ` +
        `I am particularly drawn to this opportunity because of your company's reputation for innovation and excellence.\n\n` +
        `I look forward to the opportunity to further discuss how my experience and skills would benefit ${coverLetter.companyName}. ` +
        `Thank you for considering my application.\n\n` +
        `Sincerely,\n` +
        `[Your Name]`;
      
      setCoverLetter(prev => ({ ...prev, content: generatedContent }));
      setIsGenerating(false);
      toast({
        title: "Cover Letter Generated",
        description: "Your cover letter has been generated. Feel free to edit it to better match your experience.",
      });
    }, 2000);
  };
  
  const handleSaveCoverLetter = () => {
    if (!coverLetter.content || !coverLetter.jobTitle || !coverLetter.companyName) {
      toast({
        title: "Missing Information",
        description: "Please provide the job title, company name, and cover letter content.",
        variant: "destructive",
      });
      return;
    }
    
    const timestamp = getCurrentTimestamp();
    saveCoverLetter({
      ...coverLetter,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    
    toast({
      title: "Cover Letter Saved",
      description: "Your cover letter has been saved successfully.",
    });
    
    navigate("/dashboard");
  };

  const handleExportPDF = async () => {
    if (!coverLetterRef.current || !coverLetter.content) {
      toast({
        title: "Error",
        description: "No content to export",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Add temporary styling for PDF export
      coverLetterRef.current.classList.add('pdf-export-active');
      
      const canvas = await html2canvas(coverLetterRef.current, {
        scale: 1, // Reduced from 2 to 1 for smaller file size
        logging: false,
        useCORS: true,
        windowWidth: 800, // Control the rendering width
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 180; // Reduced from 190 to fit better
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Check if content fits on one page
      if (imgHeight > 250) { // A4 height is 297mm, leaving space for margins
        // If too tall, reduce width to make content fit
        const adjustedWidth = 160;
        const adjustedHeight = (canvas.height * adjustedWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 15, 10, adjustedWidth, adjustedHeight);
      } else {
        pdf.addImage(imgData, "PNG", 15, 10, imgWidth, imgHeight);
      }
  
      pdf.save(`${coverLetter.name || "CoverLetter"}_${coverLetter.companyName || ""}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: "Your cover letter has been exported as PDF.",
      });
      
      // Remove temporary styling
      coverLetterRef.current.classList.remove('pdf-export-active');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
      console.error("PDF generation error:", error);
      coverLetterRef.current?.classList.remove('pdf-export-active');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">CV.AI</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 mb-4">
            <Link to="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Create Cover Letter</h1>
              <p className="text-muted-foreground mt-1">
                Generate a personalized cover letter for your job application.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveCoverLetter}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleExportPDF} disabled={!coverLetter.content}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-name">Cover Letter Name</Label>
                  <Input 
                    id="cover-letter-name" 
                    value={coverLetter.name}
                    onChange={(e) => setCoverLetter(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title *</Label>
                  <Input 
                    id="job-title" 
                    value={coverLetter.jobTitle}
                    onChange={(e) => setCoverLetter(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Software Developer, Marketing Manager, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input 
                    id="company-name" 
                    value={coverLetter.companyName}
                    onChange={(e) => setCoverLetter(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Company Inc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description *</Label>
                  <Textarea 
                    id="job-description" 
                    value={coverLetter.jobDescription}
                    onChange={(e) => setCoverLetter(prev => ({ ...prev, jobDescription: e.target.value }))}
                    placeholder="Paste the job description here..."
                    rows={10}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerateCoverLetter} 
                  className="w-full"
                  disabled={isGenerating}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Cover Letter"}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-content">Content</Label>
                  <Textarea 
                    id="cover-letter-content" 
                    value={coverLetter.content}
                    onChange={(e) => setCoverLetter(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Your cover letter content will appear here..."
                    rows={15}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Cover Letter Preview</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This preview will be exported as PDF.
            </p>
            
            <div ref={coverLetterRef} className="bg-white p-8 rounded-md pdf-export">
  <div className="space-y-4 text-sm"> {/* Reduced spacing and smaller font */}
    <div>
      <p>Date: {new Date().toLocaleDateString()}</p>
    </div>
    
    <div>
      <p>Hiring Manager</p>
      <p>{coverLetter.companyName || "[Company Name]"}</p>
    </div>
    
    <div>
      <p>Subject: Application for {coverLetter.jobTitle || "[Position]"} Position</p>
    </div>
    
    <div className="whitespace-pre-wrap text-xs"> {/* Smaller font for content */}
      {coverLetter.content || "Your cover letter content will appear here after generation."}
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoverLetter;