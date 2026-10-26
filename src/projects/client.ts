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
  MDocCredentialTemplatesService,
  OpenId4VcIssuanceService,
  OpenId4VcVerificationService,
  PresentationTemplatesService,
  ProjectProfileService,
  ProjectsService,
  RevocationService,
  SdJwtVcCredentialTemplatesService,
  TrustedEntitiesService,
  WebhooksService,
} from '../../generated/projects'
import { client } from '../../generated/projects/client.gen'

/**
 * Client for the deprecated `/v1/projects` API, from before projects were renamed to wallets.
 *
 * @deprecated Use `Paradym` from `@paradym/sdk`, which uses the `/v1/wallets` API.
 */
export default class Paradym {
  projects: typeof ProjectsService
  projectProfile: typeof ProjectProfileService
  webhooks: typeof WebhooksService
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

  revocation: typeof RevocationService
  directIssuance: typeof DirectIssuanceService
  issuedCredentials: typeof IssuedCredentialsService

  authorizationServers: typeof AuthorizationServersService
  attributeProviders: typeof AttributeProvidersService

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    client.setConfig({
      baseUrl,
      headers: {
        'x-access-token': apiKey,
      },
    })

    this.projects = ProjectsService
    this.projectProfile = ProjectProfileService
    this.webhooks = WebhooksService

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

    this.revocation = RevocationService
    this.directIssuance = DirectIssuanceService
    this.issuedCredentials = IssuedCredentialsService

    this.authorizationServers = AuthorizationServersService
    this.attributeProviders = AttributeProvidersService
  }
}

export { Paradym }
