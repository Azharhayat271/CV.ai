import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "./PersonalInfo";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Skills from "./Skills";
import { CV } from "./types";

interface CVFormProps {
  cv: Partial<CV>;
  setCV: React.Dispatch<React.SetStateAction<Partial<CV>>>;
}

const CVForm = ({ cv, setCV }: CVFormProps) => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="experience">Work Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalInfo cv={cv} setCV={setCV} setActiveTab={setActiveTab} />
      </TabsContent>
      
      <TabsContent value="experience">
        <WorkExperience cv={cv} setCV={setCV} setActiveTab={setActiveTab} />
      </TabsContent>
      
      <TabsContent value="education">
        <Education cv={cv} setCV={setCV} setActiveTab={setActiveTab} />
      </TabsContent>
      
      <TabsContent value="skills">
        <Skills cv={cv} setCV={setCV} setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
};

export default CVForm;