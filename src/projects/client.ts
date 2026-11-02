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
import { createClient } from '../../generated/projects/client'
import { type BoundService, bindClient } from '../utils/bindClient'

/**
 * Client for the deprecated `/v1/projects` API, from before projects were renamed to wallets.
 *
 * @deprecated Use `Paradym` from `@paradym/sdk`, which uses the `/v1/wallets` API.
 */
export default class Paradym {
  projects: BoundService<typeof ProjectsService>
  projectProfile: BoundService<typeof ProjectProfileService>
  webhooks: BoundService<typeof WebhooksService>
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

  revocation: BoundService<typeof RevocationService>
  directIssuance: BoundService<typeof DirectIssuanceService>
  issuedCredentials: BoundService<typeof IssuedCredentialsService>

  authorizationServers: BoundService<typeof AuthorizationServersService>
  attributeProviders: BoundService<typeof AttributeProvidersService>

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    const client = createClient({
      baseUrl,
      throwOnError: true,
      headers: {
        'x-access-token': apiKey,
      },
    })

    this.projects = bindClient(ProjectsService, client)
    this.projectProfile = bindClient(ProjectProfileService, client)
    this.webhooks = bindClient(WebhooksService, client)

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

    this.revocation = bindClient(RevocationService, client)
    this.directIssuance = bindClient(DirectIssuanceService, client)
    this.issuedCredentials = bindClient(IssuedCredentialsService, client)

    this.authorizationServers = bindClient(AuthorizationServersService, client)
    this.attributeProviders = bindClient(AttributeProvidersService, client)
  }
}

export { Paradym }
