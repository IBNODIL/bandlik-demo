import type { Locale } from "../i18n";

// Assumed shapes: there is no backend yet. Adjust these when the real API is defined.
// Interface labels (status, employment type, category) are NOT stored here: records hold
// stable values and the translation files (messages/*.json) provide the displayed text.
// Only admin-entered content (title, place) is stored per language.

export type Localized<T> = Record<Locale, T>;

export type CountryCode = "SK" | "DE" | "PL" | "CZ" | "LT" | "HU";

export type VacancyStatus = "active" | "closingSoon" | "filled";
export type EmploymentType = "fullTime" | "partTime" | "seasonal" | "contract";

export interface Vacancy {
  id: string;
  status: VacancyStatus;
  countryCode: CountryCode;
  salaryNetUsd: number;
  salaryLocalUzs?: number;
  employmentType: EmploymentType;
  durationMonths?: { min: number; max: number };
  deadline?: string;
  hired: number;
  capacity: number;
  applied: number;
  likes: number;
  title: Localized<string>;
  place: Localized<string>;
}

export type CourseStatus = "open" | "almostFull" | "full";
export type CourseCategory = "interviewPrep" | "language" | "vocational" | "documents";

export interface Course {
  id: string;
  status: CourseStatus;
  category: CourseCategory;
  priceUzs: number;
  hours: number;
  lessons: number;
  /** cover image URL; the default course cover is used when missing */
  imageUrl?: string;
  title: Localized<string>;
}
