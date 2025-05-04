import { GEMINI_API_KEY } from "./constants";

export const analyzeCVWithGemini = async (cvText: string) => {
  const systemPrompt = `
    You are an expert CV reviewer and ATS (Applicant Tracking System) specialist. 
    Analyze the provided CV and provide a detailed review with:
    1. An overall ATS compatibility score (0-100)
    2. A list of 3-5 key strengths
    3. A list of 3-5 specific improvements needed
    4. Concrete suggestions to improve ATS compatibility
    
    Format your response as a VALID JSON object with this exact structure:
    {
      "score": number,
      "feedback": {
        "strengths": string[],
        "improvements": string[],
        "suggestions": string
      }
    }
    
    Evaluation criteria:
    - Keyword optimization (20%)
    - Structure and organization (20%)
    - Quantifiable achievements (20%)
    - Relevance to target roles (20%)
    - Professional summary quality (10%)
    - Formatting and readability (10%)
    
    Important guidelines:
    - Be specific and actionable in feedback
    - Highlight missing keywords if relevant
    - Suggest concrete improvements
    - Keep the tone professional but helpful
  `;
  
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API request timed out after 30 seconds")), 30000);
    });
    
    const fetchPromise = fetch(
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
              { text: `CV CONTENT TO ANALYZE:\n${cvText}` }
            ]
          }]
        }),
      }
    );
    
    const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
    
    if (!response.ok) {
      if (response instanceof Response) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      } else {
        throw new Error("API request failed with an unknown error.");
      }
    }
    
    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("Could not find valid JSON in the API response");
    }
    
    const jsonString = responseText.slice(jsonStart, jsonEnd);
    
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse Gemini response:", jsonString);
      throw new Error("The AI returned an invalid format. Please try again.");
    }
  } catch (error) {
    console.error("Error analyzing CV:", error);
    throw error;
  }
};