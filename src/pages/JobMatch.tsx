
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { getCVs, saveJobMatch, generateId, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const JobMatch = () => {
  const [selectedCvId, setSelectedCvId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobMatch, setJobMatch] = useState<any>(null);
  
  // Get available CVs
  const cvs = getCVs();
  
  const handleAnalyzeJob = () => {
    if (!selectedCvId || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please select a CV and enter a job description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      const selectedCV = cvs.find(cv => cv.id === selectedCvId);
      
      const newJobMatch = {
        id: generateId(),
        cvId: selectedCvId,
        jobDescription,
        matchScore: 74,
        missingSkills: ["Docker", "AWS", "TypeScript"],
        suggestions: "Your CV matches many of the key requirements, but you could improve your chances by highlighting your experience with similar technologies and adding any relevant experience you might have with cloud services. Consider adding specific metrics to demonstrate your impact in previous roles.",
        createdAt: getCurrentTimestamp(),
      };
      
      setJobMatch(newJobMatch);
      saveJobMatch(newJobMatch);
      setIsAnalyzing(false);
      
      toast({
        title: "Job Match Analysis Complete",
        description: "See how your CV matches the job requirements.",
      });
    }, 3000);
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
          
          <h1 className="text-3xl font-bold">Job Match Assistant</h1>
          <p className="text-muted-foreground mt-1">
            See how well your CV matches a specific job description and get tailored improvement suggestions.
          </p>
        </div>
        
        {!jobMatch ? (
          <Card>
            <CardHeader>
              <CardTitle>Match your CV to a Job Description</CardTitle>
              <CardDescription>
                Our AI will analyze your CV against the job requirements and provide targeted feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cv-select" className="font-medium">
                  Select your CV
                </label>
                <Select 
                  value={selectedCvId} 
                  onValueChange={setSelectedCvId}
                >
                  <SelectTrigger id="cv-select">
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
                {cvs.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No CVs available. <Link to="/create-cv" className="text-primary hover:underline">Create a CV</Link> first.
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="job-description" className="font-medium">
                  Job Description
                </label>
                <Textarea 
                  id="job-description" 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={10}
                />
              </div>
              
              <Button 
                onClick={handleAnalyzeJob} 
                className="w-full"
                disabled={isAnalyzing}
              >
                <Search className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Job Match"}
              </Button>
              
              {isAnalyzing && (
                <div className="space-y-2 text-center py-4">
                  <p className="font-medium">Analyzing your CV against the job description...</p>
                  <Progress value={60} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Our AI is identifying key requirements and comparing them to your skills and experience.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            {/* Results */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Job Match Results</CardTitle>
                    <div className="flex items-center justify-center rounded-full h-16 w-16 border-4 border-primary text-primary font-bold text-xl">
                      {jobMatch.matchScore}%
                    </div>
                  </div>
                  <CardDescription>
                    Here's how your CV matches the job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Findings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Matching Skills
                        </h4>
                        <ul className="space-y-1">
                          <li className="text-sm">Project Management</li>
                          <li className="text-sm">JavaScript</li>
                          <li className="text-sm">React</li>
                          <li className="text-sm">UI/UX Design</li>
                          <li className="text-sm">Team Leadership</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium flex items-center mb-2">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                          Missing Skills
                        </h4>
                        <ul className="space-y-1">
                          {jobMatch.missingSkills.map((skill: string, index: number) => (
                            <li key={index} className="text-sm">{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Analysis</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Experience Match</h4>
                        <div className="flex items-center">
                          <Progress value={70} className="h-2 flex-1" />
                          <span className="ml-4 text-sm font-medium">70%</span>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Skills Match</h4>
                        <div className="flex items-center">
                          <Progress value={65} className="h-2 flex-1" />
                          <span className="ml-4 text-sm font-medium">65%</span>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Education Match</h4>
                        <div className="flex items-center">
                          <Progress value={90} className="h-2 flex-1" />
                          <span className="ml-4 text-sm font-medium">90%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Suggestions</h3>
                    <div className="rounded-lg border p-4">
                      <p className="text-muted-foreground">
                        {jobMatch.suggestions}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Recommended Actions</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            Add any experience with {jobMatch.missingSkills.join(", ")}
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            Highlight metrics and achievements in previous roles
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            Tailor your professional summary to address key job requirements
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setJobMatch(null)}>
                  Analyze Another Job
                </Button>
                <Button asChild>
                  <Link to="/create-cv">Edit Your CV</Link>
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Requirements</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    <p className="text-muted-foreground">
                      {jobMatch.jobDescription}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/create-cover-letter">
                      Generate Tailored Cover Letter
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/cv-review">
                      Get a Full CV Review
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatch;
