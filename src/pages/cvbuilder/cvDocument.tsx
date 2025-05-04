// components/CVDocument.tsx
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
  } from "@react-pdf/renderer";
  import { CV } from "./types";
  
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
    section: { marginBottom: 12 },
    heading: { fontSize: 16, marginBottom: 6, fontWeight: "bold" },
    subheading: { fontSize: 13, fontWeight: "bold", marginTop: 6 },
    text: { marginBottom: 2 },
    bullet: { marginLeft: 10, marginBottom: 2 },
  });
  
  const CVDocument = ({ cv }: { cv: CV }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.heading}>{cv.personalInfo.fullName}</Text>
          <Text>{cv.personalInfo.email} | {cv.personalInfo.phone}</Text>
          <Text>{cv.personalInfo.address}</Text>
          <Text>
            {cv.personalInfo.website && `Website: ${cv.personalInfo.website} `}
            {cv.personalInfo.linkedin && ` | LinkedIn: ${cv.personalInfo.linkedin}`}
            {cv.personalInfo.github && ` | GitHub: ${cv.personalInfo.github}`}
          </Text>
        </View>
  
        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text>{cv.professionalSummary}</Text>
        </View>
  
        {/* Work Experience */}
        {cv.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Work Experience</Text>
            {cv.workExperience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 6 }}>
                <Text style={styles.subheading}>
                  {exp.position} at {exp.companyName}
                </Text>
                <Text style={styles.text}>
                  {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                </Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}
  
        {/* Education */}
        {cv.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {cv.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <Text style={styles.subheading}>
                  {edu.degree} in {edu.field}
                </Text>
                <Text style={styles.text}>{edu.institution}</Text>
                <Text style={styles.text}>
                  {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                </Text>
                {edu.description && <Text style={styles.text}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}
  
        {/* Skills */}
        {cv.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <Text>{cv.skills.join(", ")}</Text>
          </View>
        )}
  
        {/* Certifications */}
        {cv.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Certifications</Text>
            {cv.certifications.map((cert, index) => (
              <Text key={index} style={styles.bullet}>
                {cert.name} — {cert.issuer} ({cert.date})
              </Text>
            ))}
          </View>
        )}
  
        {/* Languages */}
        {cv.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Languages</Text>
            {cv.languages.map((lang, index) => (
              <Text key={index} style={styles.bullet}>
                {lang.language} — {lang.proficiency}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
  
  export default CVDocument;
  