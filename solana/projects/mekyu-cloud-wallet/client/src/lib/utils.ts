import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function amountToToken(rawAmount: string | number, decimals: number): number {
  return Number(rawAmount) / Math.pow(10, decimals);
}
