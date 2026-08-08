import { Scheme } from "@/types/scheme";

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: "pmjay-001",
    name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    category: "health",
    confidence: 0.98,
    reasons: [
      "Your household income of ₹1–2.5L/yr places you firmly in the bottom 40% quintile targeted by PM-JAY.",
      "AAY ration card is the strongest eligibility signal — directly mapped in the SECC 2011 deprivation criteria used by NHA.",
      "Rural residence in Bihar is a high-weight feature; the state has one of the highest per-capita PM-JAY beneficiary enrollments.",
    ],
    requiredDocuments: [
      "Aadhaar Card (all family members)",
      "Ration Card (AAY / PHH)",
      "Income Certificate from Block Office",
      "Recent Passport-size Photograph",
    ],
    applyUrl: "https://pmjay.gov.in/",
  },
  {
    id: "pmay-g-002",
    name: "Pradhan Mantri Awaas Yojana – Gramin (PMAY-G)",
    category: "housing",
    confidence: 0.95,
    reasons: [
      "Landless or marginal landholding (<1 ha) in rural Bihar matches the SECC deprivation parameter for houseless/kutcha housing.",
      "OBC category membership increases priority weighting in PMAY-G state allocation matrices.",
      "Household income below ₹2.5L satisfies the EWS/LIG income band for rural housing assistance of ₹1.20 lakh.",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Passbook (linked to Aadhaar)",
      "Caste Certificate (OBC/SC/ST)",
      "Job Card (MGNREGS) or BPL Certificate",
    ],
    applyUrl: "https://pmayg.nic.in/",
  },
  {
    id: "nsp-sc-003",
    name: "Pre-Matric & Post-Matric Scholarship for OBC Students",
    category: "education",
    confidence: 0.91,
    reasons: [
      "Age 18–25 and student occupation are high-precision features matched to pre/post-matric scholarship eligibility windows.",
      "OBC social category directly satisfies the caste eligibility condition maintained by the Ministry of Social Justice & Empowerment.",
      "Annual family income below ₹2.5L is within the ₹3.0L ceiling set for OBC post-matric scholarships under NSP.",
    ],
    requiredDocuments: [
      "Caste/Community Certificate (OBC)",
      "Income Certificate (family annual income)",
      "Previous Year Marksheet / Bonafide Certificate",
      "Bank Account Details (student's own account)",
    ],
    applyUrl: "https://scholarships.gov.in/",
  },
  {
    id: "e-shram-004",
    name: "e-Shram Portal – Unorganized Worker Registration & Benefits",
    category: "civic",
    confidence: 0.88,
    reasons: [
      "Daily Wage Worker occupation in the Unorganized sector is the primary eligibility signal; e-Shram is exclusively for this cohort.",
      "Not covered under EPFO/ESIC (unorganized sector flag) allows direct UAN registration on the e-Shram portal.",
      "Age 16–59 range and rural/semi-urban address match the demographic focus of e-Shram social security schemes.",
    ],
    requiredDocuments: [
      "Aadhaar Card (mandatory for UAN generation)",
      "Mobile Number linked to Aadhaar",
      "Bank Account & IFSC Code",
      "Occupation Self-Declaration Form",
    ],
    applyUrl: "https://eshram.gov.in/",
  },
  {
    id: "pmkvy-005",
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    category: "civic",
    confidence: 0.84,
    reasons: [
      "Farmer occupation with landholding <1 hectare is a top-ranked feature; PM-KISAN targets small and marginal farmers.",
      "Bihar state residency ensures enrolment through the state agriculture department's PFMS-linked disbursal pipeline.",
      "Annual income below ₹1.5L (no income tax filing) satisfies the negative eligibility filter that excludes high-income farmers.",
    ],
    requiredDocuments: [
      "Land Ownership / Khatauni Document",
      "Aadhaar Card",
      "Bank Account Passbook (for DBT)",
      "Farmer Registration at Local Agriculture Office",
    ],
    applyUrl: "https://pmkisan.gov.in/",
  },
  {
    id: "suraksha-006",
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    category: "safety",
    confidence: 0.80,
    reasons: [
      "Age 18–70 and active bank account are the only two eligibility conditions; both are satisfied by your profile.",
      "Premium of only ₹20/year makes it highly accessible for low-income rural households in the unorganized sector.",
      "Accidental disability coverage of ₹1–2 lakh provides critical safety-net value for daily-wage and farm-labor households.",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Active Savings Bank Account",
      "Mobile Number linked to Bank Account",
      "PMSBY Enrollment Form (from bank branch / net banking)",
    ],
    applyUrl: "https://jansuraksha.gov.in/Forms-PMSBY.aspx",
  },
];
