import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/storage";
import { CV } from "./types";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

interface EducationProps {
  cv: Partial<CV>;
  setCV: React.Dispatch<React.SetStateAction<Partial<CV>>>;
  setActiveTab: (tab: string) => void;
}

const Education = ({ cv, setCV, setActiveTab }: EducationProps) => {
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

  const removeEducation = (id: string) => {
    setCV(prev => ({
      ...prev,
      education: prev.education?.filter(edu => edu.id !== id) || []
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setCV(prev => ({
      ...prev,
      education: prev.education?.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ) || []
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button 
            onClick={addEducation} 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
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
                  <Label htmlFor={`institution-${edu.id}`}>Institution *</Label>
                  <Input 
                    id={`institution-${edu.id}`} 
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="University Name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                    <Input 
                      id={`degree-${edu.id}`} 
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor's, Master's, etc."
                      required
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
                    <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date *</Label>
                    <Input 
                      id={`edu-start-date-${edu.id}`} 
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                      required
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
                        className="h-4 w-4"
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
                    placeholder="Relevant coursework, achievements, honors, etc."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("experience")}
        >
          Back to Work Experience
        </Button>
        <Button 
          onClick={() => setActiveTab("skills")}
          disabled={!cv.education?.some(edu => edu.institution && edu.degree && edu.startDate)}
        >
          Continue to Skills
        </Button>
      </div>
    </div>
  );
};

export default Education;