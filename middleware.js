export const config = {
  matcher: ['/((?!login\\.html|api/|Assets/).*)'],
};

export default function middleware(req) {
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

  // When accessed via lemnisca.bio rewrite, redirect back through the proxy
  const fwdHost = req.headers.get('x-forwarded-host');
  const fwdProto = req.headers.get('x-forwarded-proto') || 'https';
  if (fwdHost && fwdHost.includes('lemnisca.bio')) {
    return Response.redirect(`${fwdProto}://${fwdHost}/investor-update/login.html`);
  }

  return Response.redirect(new URL('/login.html', req.url));
}
