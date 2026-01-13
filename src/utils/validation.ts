export function validateIBAN(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();

  // Basic format check (2 letter country code + 2 digit check + up to 30 alphanumeric)
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(cleanIban)) {
    return false;
  }

  // Move first 4 chars to end
  const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);

  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  const numericString = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  // Calculate mod 97
  let remainder = numericString.slice(0, 2);
  for (let i = 2; i < numericString.length; i += 7) {
    remainder = (parseInt(remainder + numericString.slice(i, i + 7), 10) % 97).toString();
  }

  return parseInt(remainder, 10) === 1;
}

export function validateBIC(bic: string): boolean {
  // BIC format: 8 or 11 characters (4 bank code + 2 country + 2 location + optional 3 branch)
  return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic.toUpperCase());
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateVAT(vat: string): boolean {
  // Simple VAT validation: starts with 2 letter country code followed by alphanumeric
  return /^[A-Z]{2}[A-Z0-9]{2,12}$/.test(vat.replace(/\s/g, '').toUpperCase());
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && !isNaN(amount);
}

export function validateDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export function validatePhone(phone: string): boolean {
  // International phone format with + and country code
  return /^\+[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''));
}

export function validateStructuredReference(ref: string): boolean {
  // BBA format (Belgian): 12 digits with optional formatting (+++000/0000/00000+++)
  const cleanRef = ref.replace(/[^0-9]/g, '');
  if (cleanRef.length === 12) {
    // Check mod 97 for Belgian structured communication
    const baseNumber = parseInt(cleanRef.slice(0, 10), 10);
    const checkDigits = parseInt(cleanRef.slice(10, 12), 10);
    return baseNumber % 97 === checkDigits;
  }
  // ISO format: allow alphanumeric up to 35 chars
  return /^[A-Z0-9]{1,35}$/.test(ref.toUpperCase());
}
