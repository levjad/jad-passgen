import { describe, it, expect } from 'vitest';
import { generatePassword, calculateStrength } from './passwordUtils';

describe('generatePassword', () => {
    it('should generate a password of the specified length', () => {
        const length = 10;
        const password = generatePassword(length, {
            includeUppercase: true,
            includeLowercase: true,
            includeSpecial: true,
        });
        expect(password.length).toBe(length);
    });

    it('should only include numbers if no options are selected', () => {
        const password = generatePassword(10, {
            includeUppercase: false,
            includeLowercase: false,
            includeSpecial: false,
        });
        expect(password).toMatch(/^[0-9]+$/);
    });

    it('should include uppercase letters if includeUppercase is true', () => {
        const password = generatePassword(10, {
            includeUppercase: true,
            includeLowercase: false,
            includeSpecial: false,
        });
        expect(password).toMatch(/[A-Z]/);
    });

    it('should include lowercase letters if includeLowercase is true', () => {
        const password = generatePassword(10, {
            includeUppercase: false,
            includeLowercase: true,
            includeSpecial: false,
        });
        expect(password).toMatch(/[a-z]/);
    });

    it('should include special characters if includeSpecial is true', () => {
        const password = generatePassword(10, {
            includeUppercase: false,
            includeLowercase: false,
            includeSpecial: true,
        });
        expect(password).toMatch(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/);
    });
});

describe('calculateStrength', () => {
    it('should return 0 for an empty password', () => {
        expect(calculateStrength('')).toBe(0);
    });

    it('should return 1 for a password with only lowercase letters', () => {
        expect(calculateStrength('abcdef')).toBe(1);
    });

    it('should return 2 for a password with lowercase and uppercase letters', () => {
        expect(calculateStrength('abcDEF')).toBe(2);
    });

    it('should return 3 for a password with lowercase, uppercase, and numbers', () => {
        expect(calculateStrength('abcDEF123')).toBe(3);
    });

    it('should return 4 for a password with lowercase, uppercase, numbers, and special characters', () => {
        expect(calculateStrength('abcDEF123!@#')).toBe(4);
    });

    it('should return 5 for a strong password with all character types and length >= 8', () => {
        expect(calculateStrength('abcDEF123!@#')).toBe(4);
    });
});