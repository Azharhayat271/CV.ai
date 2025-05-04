import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

interface ReviewResultsProps {
  review: any;
  setReview: (review: null) => void;
}

const ReviewResults = ({ review, setReview }: ReviewResultsProps) => {
  return (
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
                <span className="text-sm text-muted-foreground">
                  {review.score >= 80 ? "Excellent" : review.score >= 70 ? "Good" : review.score >= 60 ? "Average" : "Needs Work"}
                </span>
                <Progress value={Math.min(100, review.score * 1.1)} className="h-2 w-20" />
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Content Quality</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {review.score >= 85 ? "Excellent" : review.score >= 75 ? "Good" : review.score >= 65 ? "Average" : "Needs Work"}
                </span>
                <Progress value={Math.min(100, review.score * 0.95)} className="h-2 w-20" />
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Formatting</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {review.score >= 75 ? "Excellent" : review.score >= 65 ? "Good" : review.score >= 55 ? "Average" : "Needs Work"}
                </span>
                <Progress value={Math.min(100, review.score * 1.05)} className="h-2 w-20" />
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
  );
};

export default ReviewResults;