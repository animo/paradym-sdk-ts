import {
  OpenAPI,
  OpenId4VcIssuanceService,
  OpenId4VcVerificationService,
  PresentationTemplatesService,
  ProjectProfileService,
  ProjectsService,
  SdJwtVcCredentialTemplatesService,
  WebhooksService,
  RevocationService,
  DidCommIssuanceService,
  DidCommVerificationService,
  IssuanceService,
  DidCommMessagingService,
  DidCommConnectionsService,
  DidCommInvitationsService,
  DiDsService,
  AnoncredsCredentialTemplatesService
} from '../generated'

export default class Paradym {
  projects: typeof ProjectsService
  projectProfile: typeof ProjectProfileService
  webhooks: typeof WebhooksService
  templates: {
    sdJwtVc: {
      credentials: typeof SdJwtVcCredentialTemplatesService
      presentations: typeof PresentationTemplatesService
    },
    anoncreds: {
      credentials: typeof AnoncredsCredentialTemplatesService
    }
  }

  openId4Vc: {
    issuance: typeof OpenId4VcIssuanceService
    verification: typeof OpenId4VcVerificationService
  }

  didComm: {
    issuance: typeof DidCommIssuanceService
    verification: typeof DidCommVerificationService
    messaging: typeof DidCommMessagingService
    connections: typeof DidCommConnectionsService
    invitations: typeof DidCommInvitationsService
  }

  revocation: typeof RevocationService
  issuance: typeof IssuanceService
  dids: typeof DiDsService

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    OpenAPI.HEADERS = {
      'x-access-token': apiKey,
    }

    OpenAPI.BASE = baseUrl

    this.projects = ProjectsService
    this.projectProfile = ProjectProfileService
    this.webhooks = WebhooksService

    this.templates = {
      sdJwtVc: {
        credentials: SdJwtVcCredentialTemplatesService,
        presentations: PresentationTemplatesService,
      },
      anoncreds: {
        credentials: AnoncredsCredentialTemplatesService,
      }
    }
    this.openId4Vc = {
      issuance: OpenId4VcIssuanceService,
      verification: OpenId4VcVerificationService,
    }

    this.didComm = {
      issuance: DidCommIssuanceService,
      verification: DidCommVerificationService,
      messaging: DidCommMessagingService,
      connections: DidCommConnectionsService,
      invitations: DidCommInvitationsService,
    }

    this.revocation = RevocationService
    this.issuance = IssuanceService
    this.dids = DiDsService
  }
}

export { Paradym }
