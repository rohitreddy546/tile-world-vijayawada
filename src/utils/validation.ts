/**
 * Validation utilities for Tile World Vijayawada enquiry forms
 */

export interface FormValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    phone?: string;
    category?: string;
  };
}

export function validateEnquiryForm(
  name: string,
  phone: string
): FormValidationResult {
  const errors: { name?: string; phone?: string } = {};

  if (!name || !name.trim()) {
    errors.name = 'Please provide your name';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const cleanPhone = phone ? phone.trim().replace(/[\s-()]/g, '') : '';
  if (!cleanPhone) {
    errors.phone = 'Please provide your phone number';
  } else if (!/^(\+91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
    // Standard Indian mobile number validation
    errors.phone = 'Please enter a valid 10-digit Indian mobile number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function formatWhatsAppEnquiryUrl(details: {
  name: string;
  phone: string;
  category: string;
  preferredShowroom: string;
  approxSqFt?: string;
  message?: string;
}): string {
  const parts = [
    `*New Showroom Enquiry — Tile World Vijayawada*`,
    `*Name:* ${details.name.trim()}`,
    `*Phone:* ${details.phone.trim()}`,
    `*Interested Category:* ${details.category}`,
    `*Preferred Showroom:* ${details.preferredShowroom}`
  ];

  if (details.approxSqFt && details.approxSqFt.trim()) {
    parts.push(`*Approx. Area:* ${details.approxSqFt.trim()} sq. ft.`);
  }

  if (details.message && details.message.trim()) {
    parts.push(`*Notes:* ${details.message.trim()}`);
  }

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/919908686789?text=${text}`;
}
