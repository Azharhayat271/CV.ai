
// Type definitions for our data models
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  jobPreferences?: {
    titles: string[];
    locations: string[];
    industries: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface CV {
  id: string;
  userId: string;
  name: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications?: { name: string; issuer: string; date: string }[];
  languages?: { language: string; proficiency: string }[];
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetter {
  id: string;
  userId: string;
  cvId: string;
  name: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CVReview {
  id: string;
  cvId: string;
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string;
  };
  createdAt: string;
}

export interface JobMatch {
  id: string;
  cvId: string;
  jobDescription: string;
  matchScore: number;
  missingSkills: string[];
  suggestions: string;
  createdAt: string;
}

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'cv_ai_user_profile',
  CVS: 'cv_ai_cvs',
  COVER_LETTERS: 'cv_ai_cover_letters',
  CV_REVIEWS: 'cv_ai_cv_reviews',
  JOB_MATCHES: 'cv_ai_job_matches',
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Get current timestamp string
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

// Generic function to get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Generic function to save data to localStorage
const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// User profile functions
export const getUserProfile = (): UserProfile | null => {
  const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return profile ? JSON.parse(profile) : null;
};

export const saveUserProfile = (profile: UserProfile): UserProfile => {
  profile.updatedAt = getCurrentTimestamp();
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  return profile;
};

export const createUserProfile = (name: string, email: string, phone?: string): UserProfile => {
  const now = getCurrentTimestamp();
  const profile: UserProfile = {
    id: generateId(),
    name,
    email,
    phone,
    createdAt: now,
    updatedAt: now,
  };
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  return profile;
};

// CV functions
export const getCVs = (): CV[] => {
  return getFromStorage<CV>(STORAGE_KEYS.CVS);
};

export const getCVById = (id: string): CV | undefined => {
  const cvs = getCVs();
  return cvs.find(cv => cv.id === id);
};

export const saveCV = (cv: CV): CV => {
  const cvs = getCVs();
  const existingIndex = cvs.findIndex(c => c.id === cv.id);
  
  cv.updatedAt = getCurrentTimestamp();
  
  if (existingIndex >= 0) {
    cvs[existingIndex] = cv;
  } else {
    cv.createdAt = getCurrentTimestamp();
    cvs.push(cv);
  }
  
  saveToStorage(STORAGE_KEYS.CVS, cvs);
  return cv;
};

export const deleteCV = (id: string): void => {
  const cvs = getCVs();
  const newCVs = cvs.filter(cv => cv.id !== id);
  saveToStorage(STORAGE_KEYS.CVS, newCVs);
};

// Cover letter functions
export const getCoverLetters = (): CoverLetter[] => {
  return getFromStorage<CoverLetter>(STORAGE_KEYS.COVER_LETTERS);
};

export const getCoverLetterById = (id: string): CoverLetter | undefined => {
  const coverLetters = getCoverLetters();
  return coverLetters.find(letter => letter.id === id);
};

export const saveCoverLetter = (coverLetter: CoverLetter): CoverLetter => {
  const coverLetters = getCoverLetters();
  const existingIndex = coverLetters.findIndex(c => c.id === coverLetter.id);
  
  coverLetter.updatedAt = getCurrentTimestamp();
  
  if (existingIndex >= 0) {
    coverLetters[existingIndex] = coverLetter;
  } else {
    coverLetter.createdAt = getCurrentTimestamp();
    coverLetters.push(coverLetter);
  }
  
  saveToStorage(STORAGE_KEYS.COVER_LETTERS, coverLetters);
  return coverLetter;
};

export const deleteCoverLetter = (id: string): void => {
  const coverLetters = getCoverLetters();
  const newCoverLetters = coverLetters.filter(letter => letter.id !== id);
  saveToStorage(STORAGE_KEYS.COVER_LETTERS, newCoverLetters);
};

// CV review functions
export const getCVReviews = (): CVReview[] => {
  return getFromStorage<CVReview>(STORAGE_KEYS.CV_REVIEWS);
};

export const getCVReviewsByCVId = (cvId: string): CVReview[] => {
  const reviews = getCVReviews();
  return reviews.filter(review => review.cvId === cvId);
};

export const saveReview = (review: CVReview): CVReview => {
  const reviews = getCVReviews();
  review.createdAt = getCurrentTimestamp();
  reviews.push(review);
  saveToStorage(STORAGE_KEYS.CV_REVIEWS, reviews);
  return review;
};

// Job match functions
export const getJobMatches = (): JobMatch[] => {
  return getFromStorage<JobMatch>(STORAGE_KEYS.JOB_MATCHES);
};

export const getJobMatchesByCVId = (cvId: string): JobMatch[] => {
  const matches = getJobMatches();
  return matches.filter(match => match.cvId === cvId);
};

export const saveJobMatch = (match: JobMatch): JobMatch => {
  const matches = getJobMatches();
  match.createdAt = getCurrentTimestamp();
  matches.push(match);
  saveToStorage(STORAGE_KEYS.JOB_MATCHES, matches);
  return match;
};

export const deleteJobMatch = (id: string): void => {
  const matches = getJobMatches();
  const newMatches = matches.filter(match => match.id !== id);
  saveToStorage(STORAGE_KEYS.JOB_MATCHES, newMatches);
};
