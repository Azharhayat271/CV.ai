import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Wand2 } from "lucide-react";
import { saveReview, generateId, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import FileUploadSection from "./FileUploadSection";
import ReviewResults from "./ReviewResults";
import ReviewTips from "./ReviewTips";
import { extractCVText } from "./utils/extraction";
import { analyzeCVWithGemini } from "./utils/analysis";

const CVReview = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState(null);
  const [extractionProgress, setExtractionProgress] = useState(0);

  const handleReviewCV = async () => {
    if (!uploadedFile) {
      toast({
        title: "No CV Uploaded",
        description: "Please upload a CV file to review.",
        variant: "destructive",
      });
      return;
    }
    
    setIsReviewing(true);
    setExtractionProgress(0);
    
    try {
      // Step 1: Extract text from the CV
      let cvText;
      try {
        cvText = await extractCVText(uploadedFile, setExtractionProgress);
        
        if (!cvText || cvText.trim().length < 50) {
          throw new Error("Could not extract sufficient text from the document.");
        }
      } catch (extractError) {
        throw new Error(`Failed to extract text: ${extractError.message}`);
      }
      
      // Step 2: Analyze the CV with Gemini API
      let analysisResult;
      try {
        toast({
          title: "Analyzing CV",
          description: "Your CV is being analyzed by AI...",
        });
        
        analysisResult = await analyzeCVWithGemini(cvText);
      } catch (apiError) {
        throw new Error(`AI analysis failed: ${apiError.message}`);
      }
      
      // Step 3: Validate the analysis result
      if (!analysisResult || typeof analysisResult !== 'object') {
        throw new Error("Invalid analysis result received from AI service");
      }
      
      // Create and save the review
      const newReview = {
        id: generateId(),
        cvId: "uploaded-" + generateId(),
        score: Math.min(100, Math.max(0, analysisResult.score)),
        feedback: analysisResult.feedback,
        createdAt: getCurrentTimestamp(),
      };
      
      setReview(newReview);
      saveReview(newReview);
      
      toast({
        title: "CV Review Complete",
        description: "Your CV has been reviewed. Check out the feedback below.",
      });
    } catch (error) {
      toast({
        title: "Review Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsReviewing(false);
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
          
          <h1 className="text-3xl font-bold">CV Review</h1>
          <p className="text-muted-foreground mt-1">
            Get AI-powered feedback on your CV to improve your chances of landing interviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {!review ? (
              <FileUploadSection 
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                isReviewing={isReviewing}
                extractionProgress={extractionProgress}
                handleReviewCV={handleReviewCV}
              />
            ) : (
              <ReviewResults 
                review={review}
                setReview={setReview}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <ReviewTips />
        </div>
      </div>
    </div>
  );
};

export default CVReview;