export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Parse body — Vercel auto-parses application/x-www-form-urlencoded into req.body
  const password = req.body?.password ?? '';

  if (password === process.env.SITE_PASSWORD) {
    const token = process.env.COOKIE_TOKEN;
    // 20-minute expiry (1200 seconds)
    res.setHeader(
      'Set-Cookie',
      `lemnisca_auth=${token}; HttpOnly; Path=/; Max-Age=1200; SameSite=Strict; Secure`
    );
    res.redirect(302, '/');
  } else {
    res.redirect(302, '/login.html?error=1');
  }
}
