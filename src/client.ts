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
import { client } from '../generated/wallets/client.gen'

export default class Paradym {
  wallets: typeof WalletsService
  walletProfile: typeof WalletProfileService
  webhooks: {
    subscriptions: typeof WebhookSubscriptionsService
    deliveries: typeof WebhookDeliveriesService
  }

  templates: {
    presentations: typeof PresentationTemplatesService
    credentials: {
      sdJwtVc: typeof SdJwtVcCredentialTemplatesService
      mdoc: typeof MDocCredentialTemplatesService
      anoncreds: typeof AnoncredsCredentialTemplatesService
    }
  }

  openId4Vc: {
    issuance: typeof OpenId4VcIssuanceService
    verification: typeof OpenId4VcVerificationService
  }

  didcomm: {
    issuance: typeof DidCommIssuanceService
    verification: typeof DidCommVerificationService
    messaging: typeof DidCommMessagingService
    connections: typeof DidCommConnectionsService
    invitations: typeof DidCommInvitationsService
    mediators: typeof DidCommMediatorsService
  }

  trustedEntities: typeof TrustedEntitiesService
  dids: typeof DidsService
  certificates: typeof CertificatesService
  certificateSigningRequests: typeof CertificateSigningRequestsService
  keys: typeof KeysService
  keyBackends: typeof KeyBackendsService

  revocation: typeof RevocationService
  directIssuance: typeof DirectIssuanceService
  issuedCredentials: typeof IssuedCredentialsService

  authorizationServers: typeof AuthorizationServersService
  attributeProviders: typeof AttributeProvidersService

  oauthClients: typeof OAuthClientsService
  oauthClientSecrets: typeof OAuthClientSecretsService
  oauthClientRoleAssignments: typeof OAuthClientRoleAssignmentsService

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    client.setConfig({
      baseUrl,
      headers: {
        'x-access-token': apiKey,
      },
    })

    this.wallets = WalletsService
    this.walletProfile = WalletProfileService
    this.webhooks = {
      subscriptions: WebhookSubscriptionsService,
      deliveries: WebhookDeliveriesService,
    }

    this.templates = {
      presentations: PresentationTemplatesService,
      credentials: {
        sdJwtVc: SdJwtVcCredentialTemplatesService,
        mdoc: MDocCredentialTemplatesService,
        anoncreds: AnoncredsCredentialTemplatesService,
      },
    }

    this.openId4Vc = {
      issuance: OpenId4VcIssuanceService,
      verification: OpenId4VcVerificationService,
    }

    this.didcomm = {
      issuance: DidCommIssuanceService,
      verification: DidCommVerificationService,
      messaging: DidCommMessagingService,
      connections: DidCommConnectionsService,
      invitations: DidCommInvitationsService,
      mediators: DidCommMediatorsService,
    }

    this.dids = DidsService
    this.trustedEntities = TrustedEntitiesService
    this.certificates = CertificatesService
    this.certificateSigningRequests = CertificateSigningRequestsService
    this.keys = KeysService
    this.keyBackends = KeyBackendsService

    this.revocation = RevocationService
    this.directIssuance = DirectIssuanceService
    this.issuedCredentials = IssuedCredentialsService

    this.authorizationServers = AuthorizationServersService
    this.attributeProviders = AttributeProvidersService

    this.oauthClients = OAuthClientsService
    this.oauthClientSecrets = OAuthClientSecretsService
    this.oauthClientRoleAssignments = OAuthClientRoleAssignmentsService
  }
}

export { Paradym }
