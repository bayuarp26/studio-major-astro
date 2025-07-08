import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from './env';

const SECRET_KEY = config.JWT_SECRET || 'your-super-secret-key-that-is-long-and-secure';

export interface SessionPayload {
  username: string;
  expiresAt: Date;
}

export function createToken(username: string): string {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const payload: SessionPayload = { username, expiresAt };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const payload = jwt.verify(token, SECRET_KEY) as SessionPayload;
    if (new Date(payload.expiresAt) < new Date()) {
      return null; // Expired
    }
    return payload;
  } catch (error) {
    return null; // Invalid token
  }
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Import here to avoid circular dependency
    const { default: clientPromise } = await import('./mongodb');
    
    if (!clientPromise) {
      console.error('MongoDB client not available');
      return false;
    }
    
    const client = await clientPromise;
    const db = client.db('portfolioDB');
    
    // Find user in profil_settings collection
    const user = await db.collection('profil_settings').findOne({ username });
    
    if (!user || !user.password) {
      return false;
    }

    // Compare password with bcrypt hash
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error('Error validating credentials:', error);
    return false;
  }
}
