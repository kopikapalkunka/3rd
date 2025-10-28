import type { UserRole } from '@/types';

// Female PIN format: ddmmyyyy (e.g., 29102022)
const femalePins = ['29102022', '29032021']; // October 29, 2022 (anniversary date)

// Male PIN format: yyyymmdd (e.g., 20221029)
const malePins = ['20221029', '20210329']; // October 29, 2022 (anniversary date)

export function validatePin(pin: string): { valid: boolean; role?: UserRole; name?: string } {
  // Check female format (ddmmyyyy) - Annas Tasya Esti Aryus Jannah
  if (femalePins.includes(pin)) {
    return { valid: true, role: 'female', name: 'Annas Tasya Esti Aryus Jannah' };
  }
  
  // Check male format (yyyymmdd) - Achmad Rizal Efendy
  if (malePins.includes(pin)) {
    return { valid: true, role: 'male', name: 'Achmad Rizal Efendy' };
  }
  
  return { valid: false };
}

export function getAnniversaryDate() {
  // 3rd anniversary: Oct 29, 2022 + 3 years = Oct 29, 2025
  return new Date(2025, 9, 29); // Month is 0-indexed (9 = October)
}

