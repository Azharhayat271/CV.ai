import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getUserProfile,
  saveUserProfile,
  createUserProfile,
  UserProfile,
} from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import { User, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Load profile data
  useEffect(() => {
    const userProfile = getUserProfile();

    if (userProfile) {
      setProfile(userProfile);
      setName(userProfile.name);
      setEmail(userProfile.email);
      setPhone(userProfile.phone || "");
    }
  }, []);

  const handleSave = () => {
    if (profile) {
      // Update existing profile
      const updatedProfile = {
        ...profile,
        name,
        email,
        phone,
      };
      saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } else {
      // Create new profile
      const newProfile = createUserProfile(name, email, phone);
      setProfile(newProfile);
      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created.",
      });
    }
  };

  const handleClearAllData = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all your data? This action cannot be undone."
    );
    if (confirmClear) {
      localStorage.clear();
      setProfile(null);
      setName("");
      setEmail("");
      setPhone("");
      toast({
        title: "Data Cleared",
        description: "All local data has been cleared.",
      });
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account and all data?"
    );
    if (confirmDelete) {
      localStorage.clear();
      setProfile(null);
      setName("");
      setEmail("");
      setPhone("");
      toast({
        title: "Account Deleted",
        description: "Your account and data have been deleted.",
      });
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
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 mb-4">
              <Link
                to="/dashboard"
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and preferences.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details used in your CVs and cover letters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>

          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>
                  Specify job titles, locations, and industries you're
                  interested in.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This feature will be available soon. You'll be able to set
                  your job preferences to get better recommendations and
                  matches.
                </p>
              </CardContent>
            </Card>

            <CardContent className="space-y-4">
              {/* Delete Account */}
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Delete your account and all associated data.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently delete your account and all
                        data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          localStorage.clear();
                          setProfile(null);
                          setName("");
                          setEmail("");
                          setPhone("");
                          toast({
                            title: "Account Deleted",
                            description:
                              "Your account and data have been deleted.",
                          });
                        }}
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Clear Data */}
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Clear Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear all your stored data, including CVs and cover letters.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Clear Data</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all local data?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all saved CVs, cover letters, and
                        preferences. Are you sure?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          localStorage.clear();
                          setProfile(null);
                          setName("");
                          setEmail("");
                          setPhone("");
                          toast({
                            title: "Data Cleared",
                            description: "All local data has been cleared.",
                          });
                        }}
                      >
                        Yes, Clear
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
