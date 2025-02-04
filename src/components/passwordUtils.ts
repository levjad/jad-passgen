export const generatePassword = (length: number, options: { includeUppercase: boolean, includeLowercase: boolean, includeSpecial: boolean }): string => {
    let charset = '0123456789';
    if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.includeSpecial) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

export const calculateStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
    return score;
};