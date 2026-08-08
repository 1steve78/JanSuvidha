export interface Scheme {
  id: string;
  name: string;
  category: "health" | "housing" | "education" | "civic" | "safety";
  confidence: number; // 0-1
  reasons: string[]; // plain-language SHAP explanation bullets
  requiredDocuments: string[];
  applyUrl: string;
}
