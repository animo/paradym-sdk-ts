import { client } from "./api";

interface WithProjectId {
  projectId: string;
}

async function createProject() {
  const project = await client.projects.createProject({
    requestBody: {
      name: "Test",
    },
  });

  return project;
}

async function updateProfile({ projectId }: WithProjectId) {
  const updatedProfile = await client.projectProfile.updateProfile({
    projectId,
    requestBody: {
      displayName: "Animo",
      logo: {
        altText: "Logo of Animo Solutions",
        url: "https://github.com/animo.png",
      },
    },
  });

  return updatedProfile;
}

async function run() {
  let projectId = process.env.PROJECT_ID;

  if (!projectId) {
    const project = await createProject();
    projectId = project.id;
  }

  const profile = await updateProfile({ projectId });
  console.log("Updated profile", JSON.stringify(profile, null, 2));

  const credentialTemplate = process.env.CREDENTIAL_TEMPLATE_ID
    ? await client.templates.credentials.getSdJwtVcTemplate({
        credentialTemplateId: process.env.CREDENTIAL_TEMPLATE_ID,
        projectId,
      })
    : await client.templates.credentials.createSdJwtVcTemplate({
        projectId: projectId,
        requestBody: {
          name: "Employee Badge",
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
          attributes: {
            first_name: {
              type: "string",
              name: "First Name",
              required: true,
            },
            last_name: {
              type: "string",
              name: "Last Name",
              required: false,
            },
            employee_id: {
              type: "string",
              name: "Employee ID",
              required: true,
            },
            department: {
              type: "string",
              name: "Department",
              description: "Department of the employee",
              required: true,
              alwaysDisclosed: true,
            },
            is_admin: {
              type: "boolean",
              name: "Is Admin",
              required: true,
            },
            //   date_of_birth: {
            //     type: "date",
            //     title: "Date of Birth",
            //     required: true,
            //   },
          },
        },
      });
  console.log(
    "SD-JWT-VC Template",
    JSON.stringify(credentialTemplate, null, 2)
  );

  const presentationTemplate = process.env.PRESENTATION_TEMPLATE_ID
    ? await client.templates.presentations.getPresentationTemplate({
        id: process.env.PRESENTATION_TEMPLATE_ID,
        projectId,
      })
    : await client.templates.presentations.createPresentationTemplate({
        projectId: projectId,
        requestBody: {
          description:
            "We need to verify you're an employee of Animo Solutions",
          name: "Employee Verification",
          credentials: [
            {
              format: "sd-jwt-vc",
              attributes: {
                first_name: {
                  type: "string",
                  value: "John",
                },
                is_admin: {
                  type: "boolean",
                  value: false,
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
    projectId: projectId,
    requestBody: {
      credentials: [
        {
          credentialTemplateId: credentialTemplate.id,
          attributes: {
            first_name: "John",
            last_name: "Doe",
            employee_id: "123",
            department: "Engineering",
            is_admin: false,
            // date_of_birth: "1990-01-01:00:00:00Z",
          },
        },
      ],
    },
  });

  console.log("issuanceSession", JSON.stringify(issuanceSession, null, 2));

  while (issuanceSession.status !== "completed") {
    issuanceSession =
      await client.openId4Vc.issuance.getOpenId4VcIssuanceSessionById({
        projectId: projectId,
        issuanceSessionId: issuanceSession.id,
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("Issuance Session Finished");

  let verificationSession =
    await client.openId4Vc.verification.createVerificationRequest({
      projectId: projectId,
      requestBody: {
        presentationTemplateId: presentationTemplate.id,
      },
    });

  console.log(
    "verificationSession",
    JSON.stringify(verificationSession, null, 2)
  );

  while (verificationSession.status === "requested") {
    verificationSession =
      await client.openId4Vc.verification.getOpenId4VcVerificationSessionById({
        projectId: projectId,
        verificationSessionId: verificationSession.id,
      });
    console.log("session", JSON.stringify(verificationSession, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log(
    "Verification Session Finished",
    JSON.stringify(verificationSession, null, 2)
  );
}

run();
