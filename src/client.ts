import {
  SdJwtVcCredentialTemplatesService,
  OpenAPI,
  OpenId4VcIssuanceService,
  OpenId4VcVerificationService,
  PresentationTemplatesService,
  ProjectProfileService,
  ProjectsService,
  WebhooksService,
} from '../generated'

export default class Paradym {
  projects: typeof ProjectsService
  projectProfile: typeof ProjectProfileService
  webhooks: typeof WebhooksService
  templates: {
    credentials: typeof SdJwtVcCredentialTemplatesService
    presentations: typeof PresentationTemplatesService
  }
  openId4Vc: {
    issuance: typeof OpenId4VcIssuanceService
    verification: typeof OpenId4VcVerificationService
  }

  constructor({ apiKey, baseUrl = 'https://api.paradym.id' }: { apiKey: string; baseUrl?: string }) {
    OpenAPI.HEADERS = {
      'x-access-token': apiKey,
    }

    OpenAPI.BASE = baseUrl

    this.projects = ProjectsService
    this.projectProfile = ProjectProfileService
    this.webhooks = WebhooksService

    this.templates = {
      credentials: SdJwtVcCredentialTemplatesService,
      presentations: PresentationTemplatesService,
    }
    this.openId4Vc = {
      issuance: OpenId4VcIssuanceService,
      verification: OpenId4VcVerificationService,
    }
  }
}

export { Paradym }
