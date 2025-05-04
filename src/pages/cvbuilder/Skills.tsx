import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { CV } from "./types";

interface SkillsProps {
  cv: Partial<CV>;
  setCV: React.Dispatch<React.SetStateAction<Partial<CV>>>;
  setActiveTab: (tab: string) => void;
}

const Skills = ({ cv, setCV, setActiveTab }: SkillsProps) => {
  const updateSkills = (skillsString: string) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setCV(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const updateLanguages = (languagesString: string) => {
    const languagesArray = languagesString.split(',').map(lang => lang.trim()).filter(lang => lang);
    setCV(prev => ({
      ...prev,
      languages: languagesArray
    }));
  };

  const updateCertifications = (certsString: string) => {
    const certsArray = certsString.split(',').map(cert => cert.trim()).filter(cert => cert);
    setCV(prev => ({
      ...prev,
      certifications: certsArray
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Technical Skills *</Label>
            <Textarea 
              id="skills" 
              value={cv.skills?.join(", ") || ""}
              onChange={(e) => updateSkills(e.target.value)}
              placeholder="JavaScript, React, Project Management, Graphic Design, etc."
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              List your technical skills separated by commas. These will be displayed as tags on your CV.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Languages</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="languages">Languages You Speak</Label>
            <Textarea 
              id="languages" 
              value={cv.languages?.join(", ") || ""}
              onChange={(e) => updateLanguages(e.target.value)}
              placeholder="English, Spanish, French, etc."
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              List languages you're proficient in, separated by commas.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certifications">Professional Certifications</Label>
            <Textarea 
              id="certifications" 
              value={cv.certifications?.join(", ") || ""}
              onChange={(e) => updateCertifications(e.target.value)}
              placeholder="AWS Certified, PMP, Google Analytics, etc."
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              List any professional certifications you've earned, separated by commas.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("education")}
        >
          Back to Education
        </Button>
        <Button 
          onClick={() => {
            // Validate at least skills are provided
            if (!cv.skills || cv.skills.length === 0) {
              alert("Please add at least some technical skills");
              return;
            }
            setActiveTab("preview");
          }}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save & Preview CV
        </Button>
      </div>
    </div>
  );
};

export default Skills;