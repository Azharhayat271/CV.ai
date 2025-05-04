import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, Upload, FileUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JobMatchFormProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  isAnalyzing: boolean;
  extractionProgress: number;
  handleAnalyzeJob: () => void;
}

const JobMatchForm = ({
  uploadedFile,
  setUploadedFile,
  jobDescription,
  setJobDescription,
  isAnalyzing,
  extractionProgress,
  handleAnalyzeJob
}: JobMatchFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Maximum file size is 5MB. Please choose a smaller file.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file type (PDF only for this feature)
      if (file.type !== "application/pdf") {
        toast({
          title: "Unsupported File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "CV Uploaded",
        description: `File "${file.name}" is ready for analysis.`,
        variant: "default",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match your CV to a Job Description</CardTitle>
        <CardDescription>
          Upload your CV in PDF format and we'll analyze it against the job requirements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="upload-cv">Upload your CV (PDF)</Label>
          <div className="border border-dashed rounded-md p-6 text-center">
            <Input
              id="upload-cv"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={isAnalyzing}
            />
            <label
              htmlFor="upload-cv"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <div className="text-sm font-medium mb-1">
                {uploadedFile ? uploadedFile.name : "Choose a PDF file or drag & drop"}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                PDF format (max 5MB)
              </p>
              <Button type="button" size="sm" variant="secondary" disabled={isAnalyzing}>
                <Upload className="mr-2 h-4 w-4" />
                Upload CV
              </Button>
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="job-description">
            Job Description
          </Label>
          <Textarea 
            id="job-description" 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={10}
            disabled={isAnalyzing}
          />
        </div>
        
        <Button 
          onClick={handleAnalyzeJob} 
          className="w-full"
          disabled={isAnalyzing || !uploadedFile || !jobDescription}
        >
          <Search className="mr-2 h-4 w-4" />
          {isAnalyzing ? "Analyzing..." : "Analyze Job Match"}
        </Button>
        
        {isAnalyzing && (
          <div className="space-y-2 text-center py-4">
            <p className="font-medium">
              {extractionProgress < 100 
                ? "Extracting text from your CV..." 
                : "Analyzing CV against job description..."}
            </p>
            <Progress value={extractionProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              This may take a few moments...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobMatchForm;

function toast(arg0: { title: string; description: string; variant: string; }) {
    throw new Error("Function not implemented.");
}
