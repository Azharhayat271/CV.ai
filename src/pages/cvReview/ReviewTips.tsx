import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReviewTips = () => {
  return (
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
  );
};

export default ReviewTips;