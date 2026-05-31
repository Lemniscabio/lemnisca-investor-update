export const config = {
  // Protect everything except the login page, auth API, and static assets
  matcher: ['/((?!login\\.html|api/|Assets/).*)'],
};

export default function middleware(req) {
  const cookie = req.cookies.get('lemnisca_auth')?.value;
  const token  = process.env.COOKIE_TOKEN;

  if (token && cookie === token) {
    return; // authenticated — let request through
  }

  return Response.redirect(new URL('/login.html', req.url));
}
