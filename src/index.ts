import { client } from "./api";

async function run() {
  const updatedProfile = await client.projectProfile.updateProfile({
    projectId: process.env.PROJECT_ID,
    requestBody: {
      displayName: "Animo",
      logo: {
        altText: "Logo of Animo Solutions",
        url: "https://github.com/animo.png",
      },
    },
  });
  console.log("Updated profile", JSON.stringify(updatedProfile, null, 2));

  const credentialTemplate =
    await client.templates.credentials.createSdJwtVcTemplate({
      projectId: process.env.PROJECT_ID,
      requestBody: {
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
          date_of_birth: {
            type: "date",
            title: "Date of Birth",
            required: true,
          },
        },
        defaultFields: {
          expiration: {
            required: true,
            default: {
              years: 5,
            },
          },
        },
      },
    });
  console.log(
    "SD-JWT-VC Template",
    JSON.stringify(credentialTemplate, null, 2)
  );

  const presentationTemplate =
    await client.templates.presentations.createPresentationTemplate({
      projectId: process.env.PROJECT_ID,
      requestBody: {
        purpose: "We need to verify you're an employee of Animo Solutions",
        title: "Employee Verification",
        credentials: [
          {
            format: "sd-jwt-vc",
            fields: {
              first_name: {
                type: "string",
                const: "John",
              },
              is_admin: {
                type: "boolean",
                const: true,
              },
            },
            type: credentialTemplate.type,
          },
        ],
      },
    });
  console.log(
    "Verification Template",
    JSON.stringify(presentationTemplate, null, 2)
  );

  let issuanceSession = await client.openId4Vc.issuance.createIssuanceOffer({
    projectId: process.env.PROJECT_ID,
    requestBody: {
      credentials: [
        {
          credentialTemplateId: credentialTemplate.id,
          fields: {
            first_name: "John",
            last_name: "Doe",
            employee_id: "123",
            department: "Engineering",
            is_admin: false,
            date_of_birth: "1990-01-01:00:00:00Z",
          },
        },
      ],
    },
  });

  console.log("issuanceSession", JSON.stringify(issuanceSession, null, 2));

  while (issuanceSession.status !== "completed") {
    issuanceSession =
      await client.openId4Vc.issuance.getOpenId4VcIssuanceSessionById({
        projectId: process.env.PROJECT_ID,
        // FIXME: id is not in openapi schema
        issuanceSessionId: issuanceSession.id as string,
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("Issuance Session Finished");

  let verificationSession =
    await client.openId4Vc.verification.createVerificationRequest({
      projectId: process.env.PROJECT_ID,
      requestBody: {
        presentationTemplateId: presentationTemplate.id,
      },
    });

  console.log(
    "verificationSession",
    JSON.stringify(verificationSession, null, 2)
  );

  while (verificationSession.status !== "verified") {
    verificationSession =
      await client.openId4Vc.verification.getOpenId4VcVerificationSessionById({
        projectId: process.env.PROJECT_ID,
        verificationSessionId: verificationSession.id,
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log(
    "Verification Session Finished",
    JSON.stringify(verificationSession, null, 2)
  );
}

run();
