import "dotenv/config";
import {
	OpenAPI,
	ProjectsService,
	PresentationTemplatesService,
	OpenId4VcIssuanceService,
	OpenId4VcVerificationService,
	ProjectProfileService,
	WebhooksService,
	AnoncredsCredentialTemplatesService,
	SdJwtVcCredentialTemplatesService,
	DidCommInvitationsService,
	DidCommConnectionsService,
	DiDsService,
	DidCommMessagingService,
} from "./generated";

OpenAPI.HEADERS = {
	"x-access-token": process.env.X_ACCESS_TOKEN,
};

OpenAPI.BASE = process.env.SERVER;

export const client = {
	projects: ProjectsService,
	projectProfile: ProjectProfileService,
	webhooks: WebhooksService,
	dids: DiDsService,
	templates: {
		credentials: {
			sdJwtVc: SdJwtVcCredentialTemplatesService,
			anoncreds: AnoncredsCredentialTemplatesService,
		},
		presentations: PresentationTemplatesService,
	},
	openId4Vc: {
		issuance: OpenId4VcIssuanceService,
		verification: OpenId4VcVerificationService,
	},
	didcomm: {
		invitations: DidCommInvitationsService,
		connections: DidCommConnectionsService,
		messaging: DidCommMessagingService,
	},
};
