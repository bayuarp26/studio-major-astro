// Environment configuration for Astro
// This ensures environment variables are available at runtime

interface EnvConfig {
  MONGODB_URI?: string;
  JWT_SECRET?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD_HASH?: string;
}

// Function to get environment variables with fallback
function getEnvVar(key: string, fallback?: string): string | undefined {
  // Try process.env first (for server-side)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  return fallback;
}

export const envConfig: EnvConfig = {
  MONGODB_URI: getEnvVar('MONGODB_URI'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  ADMIN_USERNAME: getEnvVar('ADMIN_USERNAME', 'admin'),
  ADMIN_PASSWORD_HASH: getEnvVar('ADMIN_PASSWORD_HASH', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
};

// Hardcode the values temporarily for testing
export const hardcodedEnv: EnvConfig = {
  MONGODB_URI: "mongodb+srv://cloud-hoster:K50Tqrh3xG55hdUJ@cluster-porto.hpgcbuz.mongodb.net/portfolioDB?retryWrites=true&w=majority",
  JWT_SECRET: "9d4769096c8fe01eabb9c643050ce50ce7a3e996ba7e38b826a332ea49458b66b1c26f61b8cc4f9d0858f3171dc16143ed8772b95c4fd945ffe676aaefc189d7a78aa5d2ff175f9e1194d8f69a5d81e2c52adae4193fdb6c36978e03c1dbed86a8688e8a6b7fae240cc3aa55ffc4f6ab2359343812c5020438d6ee3e298ff3c75ae6d31199f3b15bb67120f693af80bdef43efa5998590f6a9dfc4a1a408276512f5061db847123e892cc7c8da348a7d49330f57fee2adde6187b2d48dbc0ae3002d899a1afd38409f4a6f6ac34b05836fc8680a1372a344be2f48522928bebe32c0aeb5a271d6be362613fdca8d09f03ada44242ea9414aec636fb85ccd7d14",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD_HASH: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
};

// Use hardcoded for now, can switch back to envConfig when env vars work
export const config = hardcodedEnv;
