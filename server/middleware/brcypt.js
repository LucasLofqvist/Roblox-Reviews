import bcrypt from bcrypt;

export async function hashPassword (passwordPlaintext) {
    try {
        const hash = await bcrypt.hash(passwordPlaintext, 10);
        return hash;
    } catch (error) {
        throw new Error("Error while hashing password");        
    }
}

export async function comparePassword(passwordPlaintext, passwordHashed) {
    try {
        const match = await bcrypt.compare(passwordPlaintext, passwordHashed);
        return match;
    } catch (error) {
        throw new Error("Error while comparing password")        
    }
}