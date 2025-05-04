import { read, utils } from 'xlsx';
import mammoth from 'mammoth';
import { PDF_CO_API_KEY } from "./constants";

export const extractTextFromPDF = async (file: File, setProgress: (value: number) => void) => {
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

export const extractTextFromDOCX = async (file: File, setProgress: (value: number) => void) => {
  try {
    setProgress(20);
    const arrayBuffer = await file.arrayBuffer();
    setProgress(50);
    const result = await mammoth.extractRawText({ arrayBuffer });
    setProgress(90);
    
    if (!result || !result.value || result.value.trim().length === 0) {
      throw new Error("Could not extract text from DOCX file. The file might be corrupted.");
    }
    
    setProgress(100);
    return result.value;
  } catch (error) {
    console.error("DOCX extraction error:", error);
    throw new Error(`Failed to extract text from DOCX: ${error.message}`);
  }
};

export const extractTextFromExcel = async (file: File, setProgress: (value: number) => void) => {
  try {
    setProgress(20);
    const arrayBuffer = await file.arrayBuffer();
    setProgress(40);
    const workbook = read(arrayBuffer);
    setProgress(70);
    
    if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error("Could not read Excel file. The file might be corrupted.");
    }
    
    let text = "";
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      text += "Sheet: " + sheetName + "\n";
      text += utils.sheet_to_csv(worksheet) + "\n\n";
    });
    
    setProgress(100);
    return text;
  } catch (error) {
    console.error("Excel extraction error:", error);
    throw new Error(`Failed to extract text from Excel file: ${error.message}`);
  }
};

export const extractCVText = async (file: File, setProgress: (value: number) => void) => {
  try {
    const fileType = file.type.toLowerCase();
    
    if (fileType === "application/pdf") {
      return await extractTextFromPDF(file, setProgress);
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return await extractTextFromDOCX(file, setProgress);
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return await extractTextFromExcel(file, setProgress);
    } else if (fileType === "text/plain") {
      setProgress(30);
      const text = await file.text();
      setProgress(100);
      return text;
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error("Text extraction error:", error);
    setProgress(0);
    throw new Error(`Failed to extract text from the file: ${error.message}`);
  }
};