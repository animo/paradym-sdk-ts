import {
  AnoncredsCredentialTemplatesService,
  AttributeProvidersService,
  AuthorizationServersService,
  CertificateSigningRequestsService,
  CertificatesService,
  DidCommConnectionsService,
  DidCommInvitationsService,
  DidCommIssuanceService,
  DidCommMediatorsService,
  DidCommMessagingService,
  DidCommVerificationService,
  DidsService,
  DirectIssuanceService,
  IssuedCredentialsService,
  KeyBackendsService,
  KeysService,
  MDocCredentialTemplatesService,
  OAuthClientRoleAssignmentsService,
  OAuthClientSecretsService,
  OAuthClientsService,
  OpenId4VcIssuanceService,
  OpenId4VcVerificationService,
  PresentationTemplatesService,
  RevocationService,
  SdJwtVcCredentialTemplatesService,
  TrustedEntitiesService,
  WalletProfileService,
  WalletsService,
  WebhookDeliveriesService,
  WebhookSubscriptionsService,
} from '../generated/wallets'
import { createClient } from '../generated/wallets/client'
import { type BoundService, bindClient } from './utils/bindClient'

export default class Paradym {
  wallets: BoundService<typeof WalletsService>
  walletProfile: BoundService<typeof WalletProfileService>
  webhooks: {
    subscriptions: BoundService<typeof WebhookSubscriptionsService>
    deliveries: BoundService<typeof WebhookDeliveriesService>
  }

  templates: {
    presentations: BoundService<typeof PresentationTemplatesService>
    credentials: {
      sdJwtVc: BoundService<typeof SdJwtVcCredentialTemplatesService>
      mdoc: BoundService<typeof MDocCredentialTemplatesService>
      anoncreds: BoundService<typeof AnoncredsCredentialTemplatesService>
    }
  }

  openId4Vc: {
    issuance: BoundService<typeof OpenId4VcIssuanceService>
    verification: BoundService<typeof OpenId4VcVerificationService>
  }

  didcomm: {
    issuance: BoundService<typeof DidCommIssuanceService>
    verification: BoundService<typeof DidCommVerificationService>
    messaging: BoundService<typeof DidCommMessagingService>
    connections: BoundService<typeof DidCommConnectionsService>
    invitations: BoundService<typeof DidCommInvitationsService>
    mediators: BoundService<typeof DidCommMediatorsService>
  }

  trustedEntities: BoundService<typeof TrustedEntitiesService>
  dids: BoundService<typeof DidsService>
  certificates: BoundService<typeof CertificatesService>
  certificateSigningRequests: BoundService<typeof CertificateSigningRequestsService>
  keys: BoundService<typeof KeysService>
  keyBackends: BoundService<typeof KeyBackendsService>

  revocation: BoundService<typeof RevocationService>
  directIssuance: BoundService<typeof DirectIssuanceService>
  issuedCredentials: BoundService<typeof IssuedCredentialsService>

  authorizationServers: BoundService<typeof AuthorizationServersService>
  attributeProviders: BoundService<typeof AttributeProvidersService>

  oauthClients: BoundService<typeof OAuthClientsService>
  oauthClientSecrets: BoundService<typeof OAuthClientSecretsService>
  oauthClientRoleAssignments: BoundService<typeof OAuthClientRoleAssignmentsService>

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    const client = createClient({
      baseUrl,
      throwOnError: true,
      headers: {
        'x-access-token': apiKey,
      },
    })

    this.wallets = bindClient(WalletsService, client)
    this.walletProfile = bindClient(WalletProfileService, client)
    this.webhooks = {
      subscriptions: bindClient(WebhookSubscriptionsService, client),
      deliveries: bindClient(WebhookDeliveriesService, client),
    }

    this.templates = {
      presentations: bindClient(PresentationTemplatesService, client),
      credentials: {
        sdJwtVc: bindClient(SdJwtVcCredentialTemplatesService, client),
        mdoc: bindClient(MDocCredentialTemplatesService, client),
        anoncreds: bindClient(AnoncredsCredentialTemplatesService, client),
      },
    }

    this.openId4Vc = {
      issuance: bindClient(OpenId4VcIssuanceService, client),
      verification: bindClient(OpenId4VcVerificationService, client),
    }

    this.didcomm = {
      issuance: bindClient(DidCommIssuanceService, client),
      verification: bindClient(DidCommVerificationService, client),
      messaging: bindClient(DidCommMessagingService, client),
      connections: bindClient(DidCommConnectionsService, client),
      invitations: bindClient(DidCommInvitationsService, client),
      mediators: bindClient(DidCommMediatorsService, client),
    }

    this.dids = bindClient(DidsService, client)
    this.trustedEntities = bindClient(TrustedEntitiesService, client)
    this.certificates = bindClient(CertificatesService, client)
    this.certificateSigningRequests = bindClient(CertificateSigningRequestsService, client)
    this.keys = bindClient(KeysService, client)
    this.keyBackends = bindClient(KeyBackendsService, client)

    this.revocation = bindClient(RevocationService, client)
    this.directIssuance = bindClient(DirectIssuanceService, client)
    this.issuedCredentials = bindClient(IssuedCredentialsService, client)

    this.authorizationServers = bindClient(AuthorizationServersService, client)
    this.attributeProviders = bindClient(AttributeProvidersService, client)

    this.oauthClients = bindClient(OAuthClientsService, client)
    this.oauthClientSecrets = bindClient(OAuthClientSecretsService, client)
    this.oauthClientRoleAssignments = bindClient(OAuthClientRoleAssignmentsService, client)
  }
}

export { Paradym }
