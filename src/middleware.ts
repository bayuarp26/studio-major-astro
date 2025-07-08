import type { MiddlewareHandler } from 'astro';
import { verifyToken } from './lib/auth';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, request, redirect } = context;
  
  // Check if this is an admin route
  if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
    // Get session cookie
    const sessionCookie = request.headers.get('cookie')
      ?.split(';')
      .find((c: string) => c.trim().startsWith('session='))
      ?.split('=')[1];

    if (!sessionCookie) {
      return redirect('/admin/login');
    }

    // Verify token
    const payload = verifyToken(sessionCookie);
    if (!payload) {
      return redirect('/admin/login');
    }

    // Add user info to locals for use in pages
    context.locals.user = payload;
  }

  return next();
};
