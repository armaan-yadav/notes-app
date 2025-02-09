import { clsx, type ClassValue } from "clsx";
import { ReceiptEuro } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (e: string): string => {
  const vals = e.split(" ");

  return `${vals[0][0]}${vals[1][0]}`;
};
