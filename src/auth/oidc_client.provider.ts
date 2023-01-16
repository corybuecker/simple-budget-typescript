import { Issuer, BaseClient } from "openid-client"

export class OidcClient { }

const OidcClientProvider = {
  provide: OidcClient,
  useFactory: async () => {
    const issuer: Issuer = await Issuer.discover("https://accounts.google.com")
    return new issuer.Client({ client_id: "test" })
  }
};

export default OidcClientProvider
