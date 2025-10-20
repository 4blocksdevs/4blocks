import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string): boolean {
  // Basic format check using RFC 5322 standard
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;

  // Additional checks for common invalid patterns
  const invalidPatterns = [
    /^[0-9]+@/, // Email starting with numbers only
    /@.*\d{4,}/, // Domain containing 4 or more consecutive numbers
    /\.{2,}/, // Multiple consecutive dots
    /[^a-zA-Z]@[^a-zA-Z]/, // Non-letter characters around @ symbol
    /^test@|@test\./, // Test emails
    /example|dummy|fake|temporary/i, // Common fake email keywords
    /[0-9]{10,}/, // Strings of 10 or more numbers (likely not a real email)
  ];

  return !invalidPatterns.some((pattern) => pattern.test(email));
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
