import { describe, it, expect } from 'vitest';
import { validateEnquiryForm, formatWhatsAppEnquiryUrl } from '../src/utils/validation';

describe('Enquiry Form Validation & Dispatch Suite', () => {
  describe('Name and Phone Validation', () => {
    it('accepts valid 10-digit Indian mobile numbers and proper names', () => {
      const validCases = [
        { name: 'Rohit Reddy', phone: '9908686789' },
        { name: 'K. S. Rao', phone: '+91 99086 86789' },
        { name: 'Ananya Sharma', phone: '+91-9848113110' },
        { name: 'Venkat', phone: '09848113110' },
        { name: 'Architect Builders', phone: '7893012345' },
        { name: 'Srinivas Murthy', phone: '6300123456' }
      ];

      for (const tc of validCases) {
        const result = validateEnquiryForm(tc.name, tc.phone);
        expect(result.isValid).toBe(true);
        expect(result.errors.name).toBeUndefined();
        expect(result.errors.phone).toBeUndefined();
      }
    });

    it('rejects empty or whitespace-only names', () => {
      const emptyName1 = validateEnquiryForm('', '9908686789');
      expect(emptyName1.isValid).toBe(false);
      expect(emptyName1.errors.name).toBe('Please provide your name');

      const whitespaceName = validateEnquiryForm('   ', '9908686789');
      expect(whitespaceName.isValid).toBe(false);
      expect(whitespaceName.errors.name).toBe('Please provide your name');
    });

    it('rejects names with fewer than 2 characters', () => {
      const singleChar = validateEnquiryForm('A', '9908686789');
      expect(singleChar.isValid).toBe(false);
      expect(singleChar.errors.name).toBe('Name must be at least 2 characters');
    });

    it('rejects invalid or incomplete phone numbers', () => {
      const invalidPhones = [
        '',
        '   ',
        '12345', // Too short
        '98765',
        '987654321', // 9 digits
        '5908686789', // Invalid starting digit (5 is not a valid Indian mobile prefix)
        'abcdefghij', // Non-numeric
        '99086-ABCDE' // Alphanumeric
      ];

      for (const phone of invalidPhones) {
        const result = validateEnquiryForm('Valid Customer', phone);
        expect(result.isValid).toBe(false);
        expect(result.errors.phone).toBeDefined();
      }
    });
  });

  describe('WhatsApp Enquiry URL Formatter', () => {
    it('formats a complete WhatsApp message with all showroom details', () => {
      const url = formatWhatsAppEnquiryUrl({
        name: 'Rohit Reddy',
        phone: '9908686789',
        category: 'Flooring & Vitrified Tiles',
        preferredShowroom: 'Tile World — Governorpet',
        approxSqFt: '1200',
        message: 'Need 600x1200mm Statuario slabs for living room'
      });

      expect(url).toContain('https://wa.me/919908686789?text=');
      const decodedText = decodeURIComponent(url.replace('https://wa.me/919908686789?text=', ''));

      expect(decodedText).toContain('Rohit Reddy');
      expect(decodedText).toContain('9908686789');
      expect(decodedText).toContain('Flooring & Vitrified Tiles');
      expect(decodedText).toContain('Tile World — Governorpet');
      expect(decodedText).toContain('1200 sq. ft.');
      expect(decodedText).toContain('Need 600x1200mm Statuario slabs for living room');
    });

    it('formats gracefully when optional sq. ft. and notes are omitted', () => {
      const url = formatWhatsAppEnquiryUrl({
        name: 'Suresh Kumar',
        phone: '9848113110',
        category: 'Designer Bathrooms',
        preferredShowroom: 'Tile World — Chilakaluripeta'
      });

      const decodedText = decodeURIComponent(url.replace('https://wa.me/919908686789?text=', ''));
      expect(decodedText).toContain('Suresh Kumar');
      expect(decodedText).toContain('9848113110');
      expect(decodedText).toContain('Tile World — Chilakaluripeta');
      expect(decodedText).not.toContain('Approx. Area:');
      expect(decodedText).not.toContain('Notes:');
    });
  });
});
