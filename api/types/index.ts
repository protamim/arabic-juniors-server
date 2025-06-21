export interface SendEmailParams {
  toEmail: string;
  toName: string;
  subject: string;
  htmlContent: string;
}

const langValues = [
  "eng",
  "urdu",
  "hindi",
  "malayalam",
  "tamil",
  "philippine",
  "bengali",
  "french",
  "german",
] as const;

export interface TeacherRegistrationTypes {
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "Custom";
  email: string;
  whatsapp_number?: string;
  address: string;
  where_live: string;
  birth: string;
  materials_status: "Married" | "Unmarried";
  nationality: string;
  occupation: string;
  introduce_yourself: string;
  fb_id: string;
  // personal_image: File;
  education: string;
  teaching_experience: string;
  mother_lang: (typeof langValues)[number];
  other_langs?: (typeof langValues)[number][];
  // doc_1: FileList;
  // doc_2: FileList;
  // doc_3: FileList;
  // doc_4: FileList;
  preferred_interview_time: "morning" | "afternoon" | "evening";
  expected_salary: string; // transform to number
  work_hours: string; // transform to number 
  employment_desire: "full-time" | "part-time" | "full-part";
  what_make_ideal: string;
  how_find_us:
    | "facebook"
    | "linkedin"
    | "google"
    | "al-furqan"
    | "advertisement"
    | "other";
  declaration: string; // transform to boolean
}
