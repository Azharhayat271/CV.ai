import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileUp, Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface FileUploadSectionProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  isReviewing: boolean;
  extractionProgress: number;
  handleReviewCV: () => void;
}

const FileUploadSection = ({
  uploadedFile,
  setUploadedFile,
  isReviewing,
  extractionProgress,
  handleReviewCV
}: FileUploadSectionProps) => {
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
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const fileType = file.type.toLowerCase();
      
      if (!validTypes.includes(fileType) && 
          !fileType.includes('excel') && 
          !fileType.includes('spreadsheet')) {
        toast({
          title: "Unsupported File Type",
          description: "Please upload a PDF, DOCX, Excel, or TXT file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "CV Uploaded",
        description: `File "${file.name}" has been uploaded for review.`,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload Your CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload-cv">Upload your CV for review</Label>
            <div className="border border-dashed rounded-md p-6 text-center">
              <Input
                id="upload-cv"
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.txt"
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
                  PDF, DOCX, Excel, or TXT (max 5MB)
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
            disabled={isReviewing || !uploadedFile}
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
            <Progress value={extractionProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {extractionProgress < 100 
                ? "Extracting text from your CV..." 
                : "Our AI is reviewing your CV for structure, content, keywords, and ATS compatibility."}
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default FileUploadSection;