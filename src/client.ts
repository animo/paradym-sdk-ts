import {
  AnoncredsCredentialTemplatesService,
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
  OpenId4VcIssuanceService,
  OpenId4VcVerificationService,
  PresentationTemplatesService,
  ProjectProfileService,
  ProjectsService,
  RevocationService,
  SdJwtVcCredentialTemplatesService,
  TrustedEntitiesService,
  WebhooksService,
} from '../generated'
import { client } from '../generated/client.gen'

export default class Paradym {
  projects: typeof ProjectsService
  projectProfile: typeof ProjectProfileService
  webhooks: typeof WebhooksService
  templates: {
    presentations: typeof PresentationTemplatesService
    credentials: {
      sdJwtVc: typeof SdJwtVcCredentialTemplatesService
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

  revocation: typeof RevocationService
  directIssuance: typeof DirectIssuanceService
  issuedCredentials: typeof IssuedCredentialsService

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

    this.revocation = RevocationService
    this.directIssuance = DirectIssuanceService
    this.issuedCredentials = IssuedCredentialsService
  }
}

export { Paradym }
