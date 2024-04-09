import "dotenv/config";

function baseFetch(path: string, init?: RequestInit) {
	return fetch(`${process.env.SERVER}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"x-access-token": process.env.X_ACCESS_TOKEN,
			...init?.headers,
		},
	});
}

const updatedProfile = await baseFetch(
	`/v1/projects/${process.env.PROJECT_ID}/profiles/default`,
	{
		method: "PUT",
		body: JSON.stringify({
			logo: {
				altText: "Logo of Animo Solutions",
				url: "https://github.com/animo.png",
			},
			displayName: "Animo",
		}),
	},
);
const updatedProfileJson = await updatedProfile.json();
if (!updatedProfile.ok) {
	console.error("Error updating profile", updatedProfileJson);
	process.exit();
}
console.log("Updated profile", JSON.stringify(updatedProfileJson, null, 2));

const sdJwtTemplate = await baseFetch(
	`/v1/projects/${process.env.PROJECT_ID}/templates/credentials/sd-jwt-vc`,
	{
		method: "POST",
		body: JSON.stringify({
			title: "Employee Badge",
			description: "Credential for employee badge",
			background: {
				url: "https://github.com/animo.png",
				color: "#000000",
			},
			text: {
				color: "#ffffff",
			},
			type: "EmployeeBadge",
			revocable: false,
			fields: {
				first_name: {
					type: "string",
					title: "First Name",
					required: true,
				},
				last_name: {
					type: "string",
					title: "Last Name",
					required: false,
				},
				employee_id: {
					type: "string",
					title: "Employee ID",
					required: true,
				},
				department: {
					type: "string",
					title: "Department",
					description: "Department of the employee",
					required: true,
					alwaysDisclosed: true,
				},
				is_admin: {
					type: "boolean",
					title: "Is Admin",
					required: true,
				},
				// date_of_birth: {
				// 	type: "date",
				// 	title: "Date of Birth",
				// 	required: true,
				// },
			},
			defaultFields: {
				expiration: {
					required: true,
					default: {
						years: 5,
					},
				},
			},
		}),
	},
);

const sdJwtTemplateJson = await sdJwtTemplate.json();
if (!sdJwtTemplate.ok) {
	console.error("Error creating sd-jwt-vc template", sdJwtTemplateJson);
	process.exit();
}
console.log("SD-JWT-VC Template", JSON.stringify(sdJwtTemplateJson, null, 2));

const verificationTemplate = await baseFetch(
	`/v1/projects/${process.env.PROJECT_ID}/templates/presentations`,
	{
		method: "POST",
		body: JSON.stringify({
			title: "Employee Verification",
			purpose: "We need to verify you're an employee of Animo Solutions",
			credentials: [
				{
					format: "sd-jwt-vc",
					fields: {
						first_name: {
							type: "string",
							const: "John",
						},
						// is_admin: {
						// 	type: "boolean",
						// 	const: true,
						// },
					},
					// This is an url now
					type: sdJwtTemplateJson.type,
				},
			],
		}),
	},
);

const verificationTemplateJson = await verificationTemplate.json();
if (!verificationTemplate.ok) {
	console.error(
		"Error creating verification template",
		verificationTemplateJson,
	);
	process.exit();
}
console.log(
	"Verification Template",
	JSON.stringify(verificationTemplateJson, null, 2),
);

// const issuanceSession = await baseFetch(
// 	`/v1/projects/${process.env.PROJECT_ID}/openid4vc/issuance/offer`,
// 	{
// 		method: "POST",
// 		body: JSON.stringify({
// 			credentials: [
// 				{
// 					credentialTemplateId: sdJwtTemplateJson.id,
// 					fields: {
// 						first_name: "John",
// 						last_name: "Doe",
// 						employee_id: "123",
// 						department: "Engineering",
// 						is_admin: false,
// 						// date_of_birth: "1990-01-01:00:00:00Z",
// 					},
// 				},
// 			],
// 		}),
// 	},
// );

// let issuanceSessionJson = await issuanceSession.json();
// if (!issuanceSession.ok) {
// 	console.error("Error creating issuance offer", issuanceSessionJson);
// 	process.exit();
// }
// console.log("issuanceSession", JSON.stringify(issuanceSessionJson, null, 2));

// while (issuanceSessionJson.status !== "completed") {
// 	const issuanceSessionStatus = await baseFetch(
// 		`/v1/projects/${process.env.PROJECT_ID}/openid4vc/issuance/${issuanceSessionJson.id}`,
// 	);
// 	issuanceSessionJson = await issuanceSessionStatus.json();
// 	await new Promise((resolve) => setTimeout(resolve, 1000));
// }

// console.log("Issuance Session Finished");

const verificationSession = await baseFetch(
	`/v1/projects/${process.env.PROJECT_ID}/openid4vc/verification/request`,
	{
		method: "POST",
		body: JSON.stringify({
			presentationTemplateId: verificationTemplateJson.id,
		}),
	},
);

let verificationSessionJson = await verificationSession.json();
if (!verificationSession.ok) {
	console.error("Error creating verification request", verificationSessionJson);
	process.exit();
}
console.log(
	"verificationSession",
	JSON.stringify(verificationSessionJson, null, 2),
);

while (verificationSessionJson.status !== "completed") {
	const verificationSessionStatus = await baseFetch(
		`/v1/projects/${process.env.PROJECT_ID}/openid4vc/verification/${verificationSessionJson.id}`,
	);
	verificationSessionJson = await verificationSessionStatus.json();
	await new Promise((resolve) => setTimeout(resolve, 1000));
}

console.log("Verification Session Finished");
