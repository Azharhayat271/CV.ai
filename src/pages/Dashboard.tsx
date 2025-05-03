
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile, getCVs, getCoverLetters, getCVReviews, CV, CoverLetter } from "@/lib/storage";
import { Plus, FileText, FileEdit, Star, Briefcase, Settings, User } from "lucide-react";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);

  useEffect(() => {
    // Check if user profile exists
    const profile = getUserProfile();
    
    // If no profile exists, we'll create a temporary one for demo purposes
    if (!profile) {
      setUserProfile({
        name: "Guest User",
        email: "guest@example.com",
      });
    } else {
      setUserProfile(profile);
    }
    
    // Load CVs and cover letters
    setCvs(getCVs());
    setCoverLetters(getCoverLetters());
  }, []);

  const getRecentActivity = () => {
    // Combine CVs and Cover Letters sorted by updatedAt
    const allItems = [
      ...cvs.map(cv => ({ ...cv, type: 'CV' })),
      ...coverLetters.map(letter => ({ ...letter, type: 'Cover Letter' })),
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return allItems.slice(0, 3); // Return most recent 3 items
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
            <Link to="/profile" className="flex items-center gap-2 hover:text-primary">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <div className="flex flex-col space-y-1">
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-md px-3 py-2 bg-primary/10 text-primary font-medium"
                >
                  <FileText className="h-4 w-4" /> Documents
                </Link>
                <Link 
                  to="/cv-review"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Star className="h-4 w-4" /> CV Reviews
                </Link>
                <Link 
                  to="/job-match"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Briefcase className="h-4 w-4" /> Job Matches
                </Link>
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-card">
              <h3 className="text-sm font-medium mb-2">Your Profile</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{userProfile?.name || "Guest User"}</p>
                  <p className="text-xs text-muted-foreground">{userProfile?.email || "guest@example.com"}</p>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/profile">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {/* Welcome section */}
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userProfile?.name?.split(' ')[0] || "Guest"}</h1>
              <p className="text-muted-foreground mt-1">
                Create, manage and optimize your CV and cover letters with AI assistance.
              </p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New CV</CardTitle>
                  <CardDescription>
                    Build a professional CV with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/create-cv">
                      <Plus className="mr-2 h-4 w-4" /> New CV
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                  <CardDescription>
                    Generate a tailored cover letter for a job
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/create-cover-letter">
                      <FileEdit className="mr-2 h-4 w-4" /> New Cover Letter
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CV Review</CardTitle>
                  <CardDescription>
                    Get AI feedback on your CV's effectiveness
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/cv-review">
                      <Star className="mr-2 h-4 w-4" /> Review My CV
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Document tabs */}
            <Tabs defaultValue="cvs" className="space-y-4">
              <TabsList>
                <TabsTrigger value="cvs">My CVs</TabsTrigger>
                <TabsTrigger value="coverLetters">Cover Letters</TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cvs" className="space-y-4">
                {cvs.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No CVs Yet</CardTitle>
                      <CardDescription>
                        Create your first CV with our AI-powered builder.
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild>
                        <Link to="/create-cv">
                          <Plus className="mr-2 h-4 w-4" /> Create CV
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cvs.map(cv => (
                      <Card key={cv.id}>
                        <CardHeader>
                          <CardTitle>{cv.name}</CardTitle>
                          <CardDescription>
                            Last updated: {new Date(cv.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {cv.professionalSummary}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="coverLetters" className="space-y-4">
                {coverLetters.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No Cover Letters Yet</CardTitle>
                      <CardDescription>
                        Generate a personalized cover letter for your next job application.
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild>
                        <Link to="/create-cover-letter">
                          <Plus className="mr-2 h-4 w-4" /> Create Cover Letter
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coverLetters.map(letter => (
                      <Card key={letter.id}>
                        <CardHeader>
                          <CardTitle>{letter.name}</CardTitle>
                          <CardDescription>
                            {letter.companyName} - {letter.jobTitle}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {letter.content.substring(0, 100)}...
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {getRecentActivity().length === 0 ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>No Recent Activity</CardTitle>
                        <CardDescription>
                          Your recent documents and activities will appear here.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ) : (
                    getRecentActivity().map((item: any) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                              {item.type}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            Last updated: {new Date(item.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
