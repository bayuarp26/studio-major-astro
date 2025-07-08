import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ redirect }) => {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/admin/login',
      'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/'
    }
  });
};
