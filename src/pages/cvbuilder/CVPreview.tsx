import React from "react";
import { CalendarDays, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

const ImprovedCVPreview = ({ cv }) => {
  const {
    personalInfo = {},
    professionalSummary = "",
    workExperience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
  } = cv;

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden border print:shadow-none print:border-none">
      <div className="p-6 pdf-content">
        {/* Header with personal info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                <span>{personalInfo.website}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center text-gray-600">
                <Linkedin className="w-4 h-4 mr-2" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center text-gray-600">
                <Github className="w-4 h-4 mr-2" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Professional Summary */}
        {professionalSummary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Professional Summary</h2>
            <p className="text-gray-700">{professionalSummary}</p>
          </div>
        )}
        
        {/* Work Experience */}
        {workExperience.length > 0 && workExperience.some(job => job.companyName || job.position) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Work Experience</h2>
            
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                job.companyName || job.position ? (
                  <div key={job.id || index} className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-800">
                        {job.position}{job.companyName ? ` at ${job.companyName}` : ''}
                      </h3>
                      
                      {(job.startDate || job.endDate) && (
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarDays className="w-3 h-3 mr-1" />
                          <span>
                            {job.startDate || 'Present'} - {job.isCurrent ? 'Present' : job.endDate || 'Present'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {job.description && (
                      <p className="text-sm text-gray-700">{job.description}</p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Education</h2>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <div key={edu.id || index} className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                        </h3>
                        {edu.institution && (
                          <p className="text-sm text-gray-700">{edu.institution}</p>
                        )}
                      </div>
                      
                      {(edu.startDate || edu.endDate) && (
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarDays className="w-3 h-3 mr-1" />
                          <span>
                            {edu.startDate || 'Present'} - {edu.isCurrent ? 'Present' : edu.endDate || 'Present'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {edu.description && (
                      <p className="text-sm text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {certifications.length > 0 && certifications.some(cert => cert.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Certifications</h2>
            
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                cert.name ? (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{cert.name}</h3>
                      {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                    </div>
                    {cert.date && <span className="text-sm text-gray-600">{cert.date}</span>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {languages.length > 0 && languages.some(lang => lang.language) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Languages</h2>
            
            <div className="space-y-2">
              {languages.map((lang, index) => (
                lang.language ? (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    {lang.proficiency && <span className="text-sm text-gray-600">{lang.proficiency}</span>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedCVPreview;