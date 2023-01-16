import { Issuer } from 'openid-client';

const OidcClientProvider = {
  provide: 'OidcClient',
  useFactory: async () => {
    const issuer: Issuer = await Issuer.discover('https://accounts.google.com');
    return new issuer.Client({
      client_id: process.env.GOOGLE_OIDC_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_OIDC_CLIENT_SECRET || '',
      redirect_uris: ['http://localhost:3000/auth/callback'],
    });
  },
};

export default OidcClientProvider;
