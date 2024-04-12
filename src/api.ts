import "dotenv/config";
import {
	OpenAPI,
	ProjectsService,
	CredentialTemplatesService,
	PresentationTemplatesService,
	OpenId4VcIssuanceService,
	OpenId4VcVerificationService,
	ProjectProfileService,
	WebhooksService,
} from "./generated";

OpenAPI.HEADERS = {
	"x-access-token": process.env.X_ACCESS_TOKEN,
};

OpenAPI.BASE = process.env.SERVER;

export const client = {
	projects: ProjectsService,
	projectProfile: ProjectProfileService,
	webhooks: WebhooksService,
	templates: {
		credentials: CredentialTemplatesService,
		presentations: PresentationTemplatesService,
	},
	openId4Vc: {
		issuance: OpenId4VcIssuanceService,
		verification: OpenId4VcVerificationService,
	},
};
