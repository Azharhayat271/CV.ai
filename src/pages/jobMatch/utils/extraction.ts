import { PDF_CO_API_KEY } from "./constants";

export const extractTextFromPDF = async (file: File, setProgress: (value: number) => void): Promise<string> => {
  try {
    setProgress(10);
    
    const formData = new FormData();
    formData.append('file', file);
    
    setProgress(20);
    const uploadResponse = await fetch('https://api.pdf.co/v1/file/upload', {
      method: 'POST',
      headers: {
        'x-api-key': PDF_CO_API_KEY
      },
      body: formData
    });
    
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`Failed to upload PDF: ${errorData.message || uploadResponse.statusText}`);
    }
    
    const uploadData = await uploadResponse.json();
    
    if (!uploadData.url) {
      throw new Error("Failed to get uploaded file URL from PDF.co");
    }
    
    setProgress(40);
    
    const extractionResponse = await fetch('https://api.pdf.co/v1/pdf/convert/to/text', {
      method: 'POST',
      headers: {
        'x-api-key': PDF_CO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: uploadData.url,
        async: false,
        inline: true
      })
    });
    
    if (!extractionResponse.ok) {
      const errorData = await extractionResponse.json();
      throw new Error(`PDF text extraction failed: ${errorData.message || extractionResponse.statusText}`);
    }
    
    setProgress(70);
    
    const extractionData = await extractionResponse.json();
    
    if (!extractionData.body) {
      throw new Error("Failed to extract text content from PDF");
    }
    
    setProgress(100);
    return extractionData.body;
  } catch (error) {
    console.error("PDF.co extraction error:", error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

export const extractCVText = async (file: File, setProgress: (value: number) => void): Promise<string> => {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are supported for job matching");
  }
  
  return await extractTextFromPDF(file, setProgress);
};