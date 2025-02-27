interface GeneratorOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

export function generatePassword(length: number, options: GeneratorOptions) {
    let chars = '';
    
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    

    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    
    return Array.from(bytes, (byte) => chars[byte % chars.length]).join('');
}