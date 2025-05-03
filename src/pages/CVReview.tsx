
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileUp, Wand2, CheckCircle, XCircle } from "lucide-react";
import { getCVs, saveReview, generateId, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const CVReview = () => {
  const [selectedCvId, setSelectedCvId] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState<any>(null);
  
  // Get available CVs
  const cvs = getCVs();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "CV Uploaded",
        description: `File "${e.target.files[0].name}" has been uploaded for review.`,
      });
    }
  };
  
  const handleReviewCV = () => {
    if (!selectedCvId && !uploadedFile) {
      toast({
        title: "No CV Selected",
        description: "Please select a CV or upload a file to review.",
        variant: "destructive",
      });
      return;
    }
    
    setIsReviewing(true);
    
    // Simulate AI review with a timeout
    setTimeout(() => {
      const newReview = {
        id: generateId(),
        cvId: selectedCvId || "uploaded-" + generateId(),
        score: 78,
        feedback: {
          strengths: [
            "Clear structure and organization",
            "Good use of action verbs",
            "Quantifiable achievements included",
          ],
          improvements: [
            "Consider adding more keywords from the industry",
            "Professional summary could be more impactful",
            "Too many bullet points in work experience",
          ],
          suggestions: "Try to focus on the most relevant experiences for your target role. Consider removing older positions that aren't directly relevant. Use more industry-specific keywords that will help your CV pass through ATS systems.",
        },
        createdAt: getCurrentTimestamp(),
      };
      
      setReview(newReview);
      saveReview(newReview);
      setIsReviewing(false);
      
      toast({
        title: "CV Review Complete",
        description: "Your CV has been reviewed. Check out the feedback below.",
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
          
          <h1 className="text-3xl font-bold">CV Review</h1>
          <p className="text-muted-foreground mt-1">
            Get AI-powered feedback on your CV to improve your chances of landing interviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {!review ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Select a CV to Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="select-cv">Choose from your saved CVs</Label>
                      <Select 
                        value={selectedCvId} 
                        onValueChange={setSelectedCvId}
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
                    </div>
                    
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          OR
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="upload-cv">Upload a CV</Label>
                      <div className="border border-dashed rounded-md p-6 text-center">
                        <Input
                          id="upload-cv"
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="upload-cv"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                          <div className="text-sm font-medium mb-1">
                            {uploadedFile ? uploadedFile.name : "Choose a file or drag & drop"}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            PDF, DOCX, or TXT (max 5MB)
                          </p>
                          <Button type="button" size="sm" variant="secondary">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload CV
                          </Button>
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleReviewCV} 
                      className="w-full mt-4"
                      disabled={isReviewing}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isReviewing ? "Reviewing your CV..." : "Review My CV"}
                    </Button>
                  </CardContent>
                </Card>
                
                {isReviewing && (
                  <Card className="p-6">
                    <div className="space-y-4 text-center">
                      <h3 className="font-semibold">Analyzing your CV...</h3>
                      <Progress value={45} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Our AI is reviewing your CV for structure, content, keywords, and ATS compatibility.
                      </p>
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>CV Review Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold">Overall Score</h2>
                        <p className="text-muted-foreground text-sm">
                          Based on structure, content, and ATS compatibility
                        </p>
                      </div>
                      <div className="flex items-center justify-center rounded-full h-20 w-20 border-4 border-primary text-primary font-bold text-2xl">
                        {review.score}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">ATS Compatibility</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Good</span>
                          <Progress value={82} className="h-2 w-20" />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Content Quality</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Average</span>
                          <Progress value={65} className="h-2 w-20" />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Formatting</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Excellent</span>
                          <Progress value={90} className="h-2 w-20" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Strengths</h3>
                        <ul className="space-y-2">
                          {review.feedback.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Areas for Improvement</h3>
                        <ul className="space-y-2">
                          {review.feedback.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Suggestions</h3>
                        <p className="text-muted-foreground">
                          {review.feedback.suggestions}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setReview(null)}>
                    Review Another CV
                  </Button>
                  <Button asChild>
                    <Link to="/create-cv">Edit Your CV</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CV Review Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">ATS Compatibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Most companies use Applicant Tracking Systems (ATS) to filter CVs. Use keywords from the job description to pass these filters.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    A well-structured CV is easy to scan. Use clear section headings and bullet points to organize information.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    Highlight achievements with measurable results rather than just listing job duties. Use numbers and percentages when possible.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    Include industry-specific keywords and skills that match the job description.
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
                  <Link to="/job-match">
                    Match CV to Job Description
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/create-cover-letter">
                    Create a Cover Letter
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVReview;
