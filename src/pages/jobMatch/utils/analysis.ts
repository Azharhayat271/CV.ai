import { GEMINI_API_KEY } from "./constants";

interface JobMatchAnalysis {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  keywordsToAdd: string[];
  suggestions: string;
  recommendations: string[];
}

export const analyzeJobMatch = async (cvText: string, jobDescription: string): Promise<JobMatchAnalysis> => {
  const systemPrompt = `
    You are an expert job match analyst. Compare the provided CV with the job description and provide:
    1. A match score (0-100)
    2. List of matching skills
    3. List of missing skills
    4. Specific keywords to add to the CV
    5. Suggestions for improvement
    6. Actionable recommendations
    
    Format your response as JSON with this structure:
    {
      "matchScore": number,
      "matchingSkills": string[],
      "missingSkills": string[],
      "keywordsToAdd": string[],
      "suggestions": string,
      "recommendations": string[]
    }
    
    Important guidelines:
    - Be specific and actionable
    - Extract exact keywords from the job description
    - Provide concrete recommendations
    - Focus on measurable improvements
  `;
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { text: `CV CONTENT:\n${cvText}\n\nJOB DESCRIPTION:\n${jobDescription}` }
            ]
          }]
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract JSON from response
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonString = responseText.slice(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error analyzing job match:", error);
    throw new Error("Failed to analyze job match. Please try again.");
  }
};