
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Download, Wand2 } from "lucide-react";
import { generateId, saveCoverLetter, getCVs, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateCoverLetter = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState({
    id: generateId(),
    userId: "user-" + generateId(), // This would normally come from authentication
    cvId: "",
    name: "My Cover Letter",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  // Get available CVs
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
    
    // Simulate AI generation with a timeout
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
      
      setCoverLetter(prev => ({
        ...prev,
        content: generatedContent
      }));
      
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
    const completeCoverLetter = {
      ...coverLetter,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    saveCoverLetter(completeCoverLetter);
    
    toast({
      title: "Cover Letter Saved",
      description: "Your cover letter has been saved successfully.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-name">Cover Letter Name (for your reference)</Label>
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
                  <Label htmlFor="cv">Select your CV (optional)</Label>
                  <Select 
                    value={coverLetter.cvId} 
                    onValueChange={(value) => setCoverLetter(prev => ({ ...prev, cvId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a CV" />
                    </SelectTrigger>
                    <SelectContent>
                      {cvs.length === 0 ? (
                        <SelectItem value="none" disabled>No CVs available</SelectItem>
                      ) : (
                        cvs.map(cv => (
                          <SelectItem key={cv.id} value={cv.id}>
                            {cv.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Selecting a CV will help generate a more personalized cover letter.
                  </p>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Edit the generated cover letter to personalize it further.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Section */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Cover Letter Preview</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This is a simplified preview of your cover letter. The final version will include proper formatting.
            </p>
            
            <div className="bg-card border rounded-md p-6">
              <div className="space-y-4 text-sm">
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
                
                <div className="whitespace-pre-wrap">
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
