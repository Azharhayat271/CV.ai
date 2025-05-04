import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Download } from "lucide-react";
import { saveCV, generateId, getCurrentTimestamp } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import CVForm from "./CVForm";
import CVPreview from "./CVPreview";
import { CV } from "./types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CreateCV = () => {
  const navigate = useNavigate();
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const userId = "user-" + generateId();

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
    workExperience: [
      {
        id: generateId(),
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ],
    education: [
      {
        id: generateId(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ],
    skills: [],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
      },
    ],
    languages: [
      {
        language: "",
        proficiency: "",
      },
    ],
    templateId: "modern",
  });

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

  const handleExportPDF = () => {
    if (!cv.personalInfo?.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill out your personal info before exporting.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Create new document with margins
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Page settings
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      
      // Styling variables
      const primaryColor = [0, 102, 204]; // Professional blue
      const secondaryColor = [100, 100, 100]; // Dark gray
      let y = margin;
  
      // Helper functions for consistent formatting
      const addHeader = (text) => {
        doc.setFontSize(20);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont(undefined, 'bold');
        doc.text(text.toUpperCase(), pageWidth / 2, y, { align: 'center' });
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        y += 6;
        
        // Add horizontal line
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
      };
  
      const addSection = (title) => {
        doc.setFontSize(12);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont(undefined, 'bold');
        doc.text(title, margin, y);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        y += 6;
      };
  
      const addSubheading = (text) => {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(text, margin, y);
        doc.setFont(undefined, 'normal');
        y += 5;
      };
  
      const addBulletText = (text) => {
        doc.setFontSize(10);
        const bulletIndent = margin + 4;
        const textLines = doc.splitTextToSize(text, contentWidth - 4);
        doc.text('•', margin, y);
        doc.text(textLines, bulletIndent, y);
        y += textLines.length * 5;
      };
  
      const addInfoRow = (label, value) => {
        if (value) {
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          doc.text(`${label}: `, margin, y);
          doc.setFont(undefined, 'normal');
          const labelWidth = doc.getTextWidth(`${label}: `);
          doc.text(value, margin + labelWidth, y);
          y += 5;
        }
      };
  
      // Header with name
      doc.setFontSize(24);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont(undefined, 'bold');
      const name = cv.personalInfo.fullName.toUpperCase();
      doc.text(name, pageWidth / 2, y, { align: 'center' });
      y += 8;
      
      // Contact info (inline)
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      const contactInfo = [];
      if (cv.personalInfo.email) contactInfo.push(cv.personalInfo.email);
      if (cv.personalInfo.phone) contactInfo.push(cv.personalInfo.phone);
      if (cv.personalInfo.address) contactInfo.push(cv.personalInfo.address);
      
      const contactText = contactInfo.join(" | ");
      doc.text(contactText, pageWidth / 2, y, { align: 'center' });
      y += 5;
      
      // Links row
      const links = [];
      if (cv.personalInfo.website) links.push(`Website: ${cv.personalInfo.website}`);
      if (cv.personalInfo.linkedin) links.push(`LinkedIn: ${cv.personalInfo.linkedin}`);
      if (cv.personalInfo.github) links.push(`GitHub: ${cv.personalInfo.github}`);
      
      if (links.length > 0) {
        const linksText = links.join(" | ");
        doc.text(linksText, pageWidth / 2, y, { align: 'center' });
        y += 10;
      } else {
        y += 5;
      }
  
      // Professional Summary
      if (cv.professionalSummary) {
        addSection("PROFESSIONAL SUMMARY");
        doc.setFontSize(10);
        const summaryText = doc.splitTextToSize(cv.professionalSummary, contentWidth);
        doc.text(summaryText, margin, y);
        y += summaryText.length * 5 + 5;
      }
  
      // Work Experience
      if (cv.workExperience?.length) {
        addSection("WORK EXPERIENCE");
        cv.workExperience.forEach((exp) => {
          if (exp.companyName || exp.position) {
            // Job title & company
            addSubheading(`${exp.position}${exp.companyName ? ' - ' + exp.companyName : ''}`);
            
            // Duration
            if (exp.startDate) {
              doc.setFontSize(10);
              doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
              const duration = `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
              doc.text(duration, margin, y);
              doc.setTextColor(0, 0, 0);
              y += 5;
            }
            
            // Description
            if (exp.description) {
              const descLines = exp.description.split('\n');
              descLines.forEach(line => {
                if (line.trim()) {
                  addBulletText(line);
                }
              });
            }
            y += 2;
          }
        });
        y += 3;
      }
  
      // Education
      if (cv.education?.length) {
        addSection("EDUCATION");
        cv.education.forEach((edu) => {
          if (edu.institution || edu.degree) {
            // Degree & field
            addSubheading(`${edu.degree}${edu.field ? ' in ' + edu.field : ''}`);
            
            // Institution & duration
            doc.setFontSize(10);
            let eduInfo = edu.institution || '';
            if (edu.startDate) {
              eduInfo += ` | ${edu.startDate} - ${edu.isCurrent ? 'Present' : edu.endDate || ''}`;
            }
            doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.text(eduInfo, margin, y);
            doc.setTextColor(0, 0, 0);
            y += 5;
            
            // Description
            if (edu.description) {
              addBulletText(edu.description);
            }
            y += 2;
          }
        });
        y += 3;
      }
  
      // Skills section with clean formatting
      if (cv.skills?.length) {
        addSection("SKILLS");
        const skillChunks = [];
        let currentChunk = [];
        
        // Create chunks for multi-column display
        cv.skills.forEach((skill, index) => {
          currentChunk.push(skill);
          if ((index + 1) % 3 === 0 || index === cv.skills.length - 1) {
            skillChunks.push([...currentChunk]);
            currentChunk = [];
          }
        });
        
        // Display each chunk as a row with bullets
        skillChunks.forEach(chunk => {
          const skillsText = chunk.map(skill => `• ${skill}`).join('    ');
          doc.setFontSize(10);
          doc.text(skillsText, margin, y);
          y += 5;
        });
        y += 3;
      }
  
      // Certifications in a clean table-like format
      if (cv.certifications?.some(cert => cert.name)) {
        addSection("CERTIFICATIONS");
        cv.certifications.forEach((cert) => {
          if (cert.name) {
            addSubheading(cert.name);
            let certInfo = '';
            if (cert.issuer) certInfo += cert.issuer;
            if (cert.date) certInfo += certInfo ? ` | ${cert.date}` : cert.date;
            
            if (certInfo) {
              doc.setFontSize(10);
              doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
              doc.text(certInfo, margin, y);
              doc.setTextColor(0, 0, 0);
              y += 5;
            }
          }
        });
        y += 3;
      }
  
      // Languages in a clean grid format
      if (cv.languages?.some(lang => lang.language)) {
        addSection("LANGUAGES");
        const langsPerRow = 3;
        let langRows = [];
        let currentRow = [];
        
        cv.languages.forEach((lang, idx) => {
          if (lang.language) {
            currentRow.push(`${lang.language} (${lang.proficiency})`);
            if (currentRow.length === langsPerRow || idx === cv.languages.length - 1) {
              langRows.push([...currentRow]);
              currentRow = [];
            }
          }
        });
        
        langRows.forEach(row => {
          doc.setFontSize(10);
          const rowText = row.join('    |    ');
          doc.text(rowText, margin, y);
          y += 5;
        });
      }
  
      // Save the PDF
      const fileName = `${cv.name || 'CV'}_${cv.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      toast({
        title: "PDF Exported",
        description: "Your CV has been successfully exported as a PDF.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Export Failed",
        description: "Something went wrong while generating the PDF.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-background">
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
              <Button onClick={handleExportPDF} disabled={!cv.personalInfo?.fullName}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <CVForm cv={cv} setCV={setCV} />
          <div ref={cvPreviewRef}>
            <CVPreview cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCV;
