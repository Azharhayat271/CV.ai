import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { saveJobMatch, generateId, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import JobMatchForm from "./JobMatchForm";
import JobMatchResults from "./JobMatchResults";
import { extractCVText } from "./utils/extraction";
import { analyzeJobMatch } from "./utils/analysis";

const JobMatch = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobMatch, setJobMatch] = useState<any>(null);
  const [extractionProgress, setExtractionProgress] = useState(0);

  const handleAnalyzeJob = async () => {
    if (!uploadedFile || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please upload a CV and enter a job description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setExtractionProgress(0);
    
    try {
      // Step 1: Extract text from the CV
      const cvText = await extractCVText(uploadedFile, setExtractionProgress);
      
      if (!cvText || cvText.trim().length < 50) {
        throw new Error("Could not extract sufficient text from the document.");
      }

      // Step 2: Analyze with Gemini API
      const analysisResult = await analyzeJobMatch(cvText, jobDescription);
      
      const newJobMatch = {
        id: generateId(),
        cvId: generateId(), // Add cvId property
        cvFileName: uploadedFile.name,
        jobDescription,
        ...analysisResult,
        createdAt: getCurrentTimestamp(),
      };
      
      setJobMatch(newJobMatch);
      saveJobMatch(newJobMatch);
      
      toast({
        title: "Job Match Analysis Complete",
        description: "See how your CV matches the job requirements.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setExtractionProgress(0);
    }
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
            Upload your CV and we'll analyze how well it matches a specific job description.
          </p>
        </div>
        
        {!jobMatch ? (
          <JobMatchForm 
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            isAnalyzing={isAnalyzing}
            extractionProgress={extractionProgress}
            handleAnalyzeJob={handleAnalyzeJob}
          />
        ) : (
          <JobMatchResults 
            jobMatch={jobMatch}
            setJobMatch={setJobMatch}
          />
        )}
      </div>
    </div>
  );
};

export default JobMatch;