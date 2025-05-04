import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface JobMatchResultsProps {
  jobMatch: any;
  setJobMatch: (match: null) => void;
}

const JobMatchResults = ({ jobMatch, setJobMatch }: JobMatchResultsProps) => {
  return (
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
                    {jobMatch.matchingSkills.map((skill: string, index: number) => (
                      <li key={index} className="text-sm">{skill}</li>
                    ))}
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
              <h3 className="text-lg font-semibold mb-3">Keyword Analysis</h3>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Keywords to Add</h4>
                <div className="flex flex-wrap gap-2">
                  {jobMatch.keywordsToAdd.map((keyword: string, index: number) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
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
                    {jobMatch.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {rec}
                      </li>
                    ))}
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
            <Link to="/cv-review">Get CV Optimization Tips</Link>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchResults;