export const config = {
  matcher: ['/((?!login\\.html|api/|Assets/).*)'],
};

export default function middleware(req) {
  // Parse cookies from header (req.cookies is Next.js only, not available here)
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k.trim(), v.join('=')];
    }).filter(([k]) => k)
  );

  const token = process.env.COOKIE_TOKEN;

  if (token && cookies['lemnisca_auth'] === token) {
    return; // pass through
  }

  return Response.redirect(new URL('/login.html', req.url));
}
