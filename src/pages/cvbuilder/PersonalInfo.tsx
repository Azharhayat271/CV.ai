import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CV } from "./types";

interface PersonalInfoProps {
  cv: Partial<CV>;
  setCV: React.Dispatch<React.SetStateAction<Partial<CV>>>;
  setActiveTab: (tab: string) => void;
}

const PersonalInfo = ({ cv, setCV, setActiveTab }: PersonalInfoProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cv-name">CV Name (for your reference)</Label>
              <Input
                id="cv-name"
                value={cv.name}
                onChange={(e) =>
                  setCV((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name *</Label>
              <Input
                id="full-name"
                value={cv.personalInfo?.fullName}
                onChange={(e) =>
                  setCV((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo!,
                      fullName: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={cv.personalInfo?.email}
                onChange={(e) =>
                  setCV((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo!,
                      email: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={cv.personalInfo?.phone}
                onChange={(e) =>
                  setCV((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo!,
                      phone: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={cv.personalInfo?.address}
                onChange={(e) =>
                  setCV((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo!,
                      address: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>{" "}
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
              onChange={(e) =>
                setCV((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo!,
                    website: e.target.value,
                  },
                }))
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={cv.personalInfo?.linkedin}
              onChange={(e) =>
                setCV((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo!,
                    linkedin: e.target.value,
                  },
                }))
              }
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={cv.personalInfo?.github}
              onChange={(e) =>
                setCV((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo!,
                    github: e.target.value,
                  },
                }))
              }
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
              onChange={(e) =>
                setCV((prev) => ({
                  ...prev,
                  professionalSummary: e.target.value,
                }))
              }
              placeholder="A brief summary of your professional background and goals..."
              rows={6}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Provide a concise overview of your professional background, key
              skills, and career goals.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setActiveTab("experience")}>
          Continue to Work Experience
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
