
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2, Save, Download } from "lucide-react";
import { saveCV, generateId, CV, WorkExperience, Education, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";

const CreateCV = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const userId = "user-" + generateId(); // This would normally come from authentication
  
  // CV State
  const [cv, setCV] = useState<Partial<CV>>({
    id: generateId(),
    userId,
    name: "My CV",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      github: "",
    },
    professionalSummary: "",
    workExperience: [{
      id: generateId(),
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    }],
    education: [{
      id: generateId(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    }],
    skills: [],
    certifications: [],
    languages: [],
    templateId: "modern",
  });
  
  // Add new work experience item
  const addWorkExperience = () => {
    setCV(prev => ({
      ...prev,
      workExperience: [
        ...(prev.workExperience || []),
        {
          id: generateId(),
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        }
      ]
    }));
  };
  
  // Remove work experience item
  const removeWorkExperience = (id: string) => {
    setCV(prev => ({
      ...prev,
      workExperience: prev.workExperience?.filter(exp => exp.id !== id) || []
    }));
  };
  
  // Update work experience item
  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setCV(prev => ({
      ...prev,
      workExperience: prev.workExperience?.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ) || []
    }));
  };
  
  // Add new education item
  const addEducation = () => {
    setCV(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: generateId(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        }
      ]
    }));
  };
  
  // Remove education item
  const removeEducation = (id: string) => {
    setCV(prev => ({
      ...prev,
      education: prev.education?.filter(edu => edu.id !== id) || []
    }));
  };
  
  // Update education item
  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setCV(prev => ({
      ...prev,
      education: prev.education?.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ) || []
    }));
  };
  
  // Update skills list
  const updateSkills = (skillsString: string) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setCV(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };
  
  // Save CV
  const handleSaveCV = () => {
    if (!cv.personalInfo?.fullName) {
      toast({
        title: "Missing Information",
        description: "Please provide at least your full name.",
        variant: "destructive",
      });
      return;
    }
    
    const timestamp = getCurrentTimestamp();
    const completeCV = {
      ...cv,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as CV;
    
    saveCV(completeCV);
    
    toast({
      title: "CV Saved",
      description: "Your CV has been saved successfully.",
    });
    
    navigate("/dashboard");
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
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Create Your CV</h1>
              <p className="text-muted-foreground mt-1">
                Fill in the details below to build your professional CV.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveCV}>
                <Save className="mr-2 h-4 w-4" />
                Save CV
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Form Section */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="experience">Work Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cv-name">CV Name (for your reference)</Label>
                      <Input 
                        id="cv-name" 
                        value={cv.name}
                        onChange={(e) => setCV(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name *</Label>
                      <Input 
                        id="full-name" 
                        value={cv.personalInfo?.fullName}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, fullName: e.target.value } 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={cv.personalInfo?.email}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, email: e.target.value } 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={cv.personalInfo?.phone}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, phone: e.target.value } 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={cv.personalInfo?.address}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, address: e.target.value } 
                        }))}
                      />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Online Presence</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <Input 
                        id="website" 
                        value={cv.personalInfo?.website}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, website: e.target.value } 
                        }))}
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input 
                        id="linkedin" 
                        value={cv.personalInfo?.linkedin}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, linkedin: e.target.value } 
                        }))}
                        placeholder="https://linkedin.com/in/yourusername"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input 
                        id="github" 
                        value={cv.personalInfo?.github}
                        onChange={(e) => setCV(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo!, github: e.target.value } 
                        }))}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea 
                        id="summary" 
                        value={cv.professionalSummary}
                        onChange={(e) => setCV(prev => ({ ...prev, professionalSummary: e.target.value }))}
                        placeholder="A brief summary of your professional background and goals..."
                        rows={6}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Provide a concise overview of your professional background, key skills, and career goals.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("experience")}>
                    Continue to Work Experience
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="experience" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <Button onClick={addWorkExperience} variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                  
                  <div className="space-y-8">
                    {cv.workExperience?.map((exp, index) => (
                      <div key={exp.id} className="space-y-4 pb-6 border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Position {index + 1}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeWorkExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`company-${exp.id}`}>Company Name</Label>
                            <Input 
                              id={`company-${exp.id}`} 
                              value={exp.companyName}
                              onChange={(e) => updateWorkExperience(exp.id, "companyName", e.target.value)}
                              placeholder="Company Inc."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`position-${exp.id}`}>Position</Label>
                            <Input 
                              id={`position-${exp.id}`} 
                              value={exp.position}
                              onChange={(e) => updateWorkExperience(exp.id, "position", e.target.value)}
                              placeholder="Software Developer"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                              <Input 
                                id={`start-date-${exp.id}`} 
                                value={exp.startDate}
                                onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                                placeholder="MM/YYYY"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                              <Input 
                                id={`end-date-${exp.id}`} 
                                value={exp.endDate}
                                onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                                placeholder="MM/YYYY or Present"
                                disabled={exp.isCurrent}
                              />
                              <div className="flex items-center gap-2 mt-1">
                                <input 
                                  type="checkbox" 
                                  id={`current-${exp.id}`} 
                                  checked={exp.isCurrent}
                                  onChange={(e) => {
                                    updateWorkExperience(exp.id, "isCurrent", e.target.checked);
                                    if (e.target.checked) {
                                      updateWorkExperience(exp.id, "endDate", "Present");
                                    } else {
                                      updateWorkExperience(exp.id, "endDate", "");
                                    }
                                  }}
                                />
                                <label htmlFor={`current-${exp.id}`} className="text-sm">
                                  I currently work here
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`description-${exp.id}`}>Description</Label>
                            <Textarea 
                              id={`description-${exp.id}`} 
                              value={exp.description}
                              onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("personal")}>
                    Back to Personal Info
                  </Button>
                  <Button onClick={() => setActiveTab("education")}>
                    Continue to Education
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button onClick={addEducation} variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </div>
                  
                  <div className="space-y-8">
                    {cv.education?.map((edu, index) => (
                      <div key={edu.id} className="space-y-4 pb-6 border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Education {index + 1}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                            <Input 
                              id={`institution-${edu.id}`} 
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                              <Input 
                                id={`degree-${edu.id}`} 
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor's, Master's, etc."
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                              <Input 
                                id={`field-${edu.id}`} 
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                placeholder="Computer Science, Business, etc."
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                              <Input 
                                id={`edu-start-date-${edu.id}`} 
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                placeholder="MM/YYYY"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                              <Input 
                                id={`edu-end-date-${edu.id}`} 
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                placeholder="MM/YYYY or Present"
                                disabled={edu.isCurrent}
                              />
                              <div className="flex items-center gap-2 mt-1">
                                <input 
                                  type="checkbox" 
                                  id={`edu-current-${edu.id}`} 
                                  checked={edu.isCurrent}
                                  onChange={(e) => {
                                    updateEducation(edu.id, "isCurrent", e.target.checked);
                                    if (e.target.checked) {
                                      updateEducation(edu.id, "endDate", "Present");
                                    } else {
                                      updateEducation(edu.id, "endDate", "");
                                    }
                                  }}
                                />
                                <label htmlFor={`edu-current-${edu.id}`} className="text-sm">
                                  Currently studying here
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</Label>
                            <Textarea 
                              id={`edu-description-${edu.id}`} 
                              value={edu.description || ""}
                              onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                              placeholder="Relevant coursework, achievements, etc."
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("experience")}>
                    Back to Work Experience
                  </Button>
                  <Button onClick={() => setActiveTab("skills")}>
                    Continue to Skills
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Textarea 
                        id="skills" 
                        value={cv.skills?.join(", ")}
                        onChange={(e) => updateSkills(e.target.value)}
                        placeholder="JavaScript, React, Project Management, etc."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        List your skills separated by commas. These will be displayed as tags on your CV.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("education")}>
                    Back to Education
                  </Button>
                  <Button onClick={handleSaveCV}>
                    <Save className="mr-2 h-4 w-4" />
                    Save CV
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Preview Section */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">CV Preview</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This is a simplified preview of your CV. The final version will include proper formatting.
            </p>
            
            <div className="bg-card border rounded-md p-6 space-y-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{cv.personalInfo?.fullName || "Your Name"}</h1>
                <div className="text-sm text-muted-foreground">
                  {cv.personalInfo?.email && <div>{cv.personalInfo.email}</div>}
                  {cv.personalInfo?.phone && <div>{cv.personalInfo.phone}</div>}
                  {cv.personalInfo?.address && <div>{cv.personalInfo.address}</div>}
                </div>
              </div>
              
              {cv.professionalSummary && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Summary
                  </h2>
                  <p className="text-sm">{cv.professionalSummary}</p>
                </div>
              )}
              
              {cv.workExperience && cv.workExperience.length > 0 && cv.workExperience[0].companyName && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Experience
                  </h2>
                  <div className="space-y-3">
                    {cv.workExperience.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{exp.position || "Position"}</h3>
                            <p className="text-sm">{exp.companyName || "Company"}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "Dates"}
                          </p>
                        </div>
                        {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cv.education && cv.education.length > 0 && cv.education[0].institution && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {cv.education.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{edu.institution || "Institution"}</h3>
                            <p className="text-sm">{edu.degree} {edu.field ? `in ${edu.field}` : ""}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "Dates"}
                          </p>
                        </div>
                        {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cv.skills && cv.skills.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-muted px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCV;
