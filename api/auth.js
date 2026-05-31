export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const password = req.body?.password ?? '';
  const fwdHost = req.headers['x-forwarded-host'] || '';
  const isProxy = fwdHost.includes('lemnisca.bio');

  if (password === process.env.SITE_PASSWORD) {
    const token = process.env.COOKIE_TOKEN;
    res.setHeader(
      'Set-Cookie',
      `lemnisca_auth=${token}; HttpOnly; Path=/; Max-Age=1200; SameSite=Strict; Secure`
    );
    res.redirect(302, isProxy ? '/investor-update' : '/');
  } else {
    res.redirect(302, isProxy ? '/investor-update/login.html?error=1' : '/login.html?error=1');
  }
}
