import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function convertStringToNumber(numStr: string): number {
  // Remove any non-numeric characters (e.g., commas, whitespace)
  const cleanedNumStr = numStr.replace(/[^\d.-]/g, '');

  // Check if the number is an integer or float
  if (cleanedNumStr.includes('.')) {
    return parseFloat(cleanedNumStr);
  } else {
    return parseInt(cleanedNumStr, 10);
  }
}

export function convertNumberToString(numValue: number): string {
  // Use the toString() method to convert the number to a string
  // This will preserve the decimal places and avoid any rounding errors
  return numValue.toString();
}
export function addNumbers(a: string, b: string): number {
  const aValue = convertStringToNumber(a);
  const bValue = convertStringToNumber(b);
  return aValue + bValue;
}

export function subtractNumbers(a: string, b: string): number {
  const aValue = convertStringToNumber(a);
  const bValue = convertStringToNumber(b);
  return aValue - bValue;
}

export function multiplyNumbers(a: string, b: string): number {
  const aValue = convertStringToNumber(a);
  const bValue = convertStringToNumber(b);
  return aValue * bValue;
}

export function divideNumbers(a: string, b: string): number {
  const aValue = convertStringToNumber(a);
  const bValue = convertStringToNumber(b);
  if (bValue === 0) {
    throw new Error('Cannot divide by zero!');
  }
  return aValue / bValue;
}