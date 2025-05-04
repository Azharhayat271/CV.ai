import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/storage";
import { CV } from "./types";

interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

interface WorkExperienceProps {
  cv: Partial<CV>;
  setCV: React.Dispatch<React.SetStateAction<Partial<CV>>>;
  setActiveTab: (tab: string) => void;
}

const WorkExperience = ({ cv, setCV, setActiveTab }: WorkExperienceProps) => {
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
  
  const removeWorkExperience = (id: string) => {
    setCV(prev => ({
      ...prev,
      workExperience: prev.workExperience?.filter(exp => exp.id !== id) || []
    }));
  };
  
  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setCV(prev => ({
      ...prev,
      workExperience: prev.workExperience?.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ) || []
    }));
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default WorkExperience;