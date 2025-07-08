// Astro global types
declare global {
  namespace App {
    interface Locals {
      user?: {
        username: string;
        expiresAt: Date;
      };
    }
  }
}
