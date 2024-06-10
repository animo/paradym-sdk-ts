<p align="center">
  <picture>
   <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-light-no-text_ok9auy.svg">
   <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-dark-no-text_fqqdq9.svg">
   <img alt="Animo Logo" height="250px" />
  </picture>
</p>

<h1 align="center" ><b>Paradym SDK</b></h1>

<h4 align="center">Powered by Animo</h4><br>

<p align="center">
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" alt="TypeScript" />
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg" alt="Apache 2.0 License" />
  </a>
  <a href="https://badge.fury.io/js/@paradym%2Fsdk">
    <img src="https://badge.fury.io/js/@paradym%2Fsdk.svg" alt="npm version">
  </a>
</p>

<p align="center">
  <a href="#getting-started">Getting started</a> 
  &nbsp;|&nbsp;
  <a href="#usage">Usage</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">License</a> 
</p>

---
The Paradym TypeScript SDK offers seamless integration with the [Paradym API](https://paradym.id/reference), enabling developers to interact with Paradym's features from TypeScript applications. This SDK simplifies the process of making API requests, allowing you to focus on building your application.


## Getting Started

First, you need to add the dependency to your project:

```sh
npm install @paradym/sdk
# or 
yarn add @paradym/sdk
```

## Usage

#### Initialize client
Initialize the client with your API key, which you can find in the [Paradym Dashboard](https://paradym.id/app/settings/api-keys). Set up the client as follows:

```ts
import Paradym from '@paradym/sdk'

const paradym = new Paradym({
    apiKey: "API_KEY"
})
```

#### Create a SD-JWT-VC Credential Template
```typescript
import Paradym from '@paradym/sdk'

const paradym = new Paradym({
    apiKey: "API_KEY"
})

paradym.templates.credentials.createSdJwtVcTemplate({
  projectId: 'clwt6e610000101s69ubga6lk',
  requestBody: { 
    name: "My SD-JWT VC template", 
    description: "This is a description", 
    issuer: "did:web", 
    background: { 
      color: "#FFFFFF", 
      url: "https://example.com/image.png" 
    }, 
    text: { 
      color: "#000000" 
    }, 
    validFrom: "2024-04-11", 
    validUntil: { 
      start: "validFrom", 
      future: { years: 5 } 
    }, 
    type: "UniversityCard", 
    revocable: false, 
    attributes: { 
      myAttribute: { 
        type: "string", 
        name: "My attribute", 
        description: "This is a attribute", 
        required: true, 
        alwaysDisclosed: false 
      } 
    } 
  }
})

```

#### Create an Issuance Offer:
```typescript
import Paradym from '@paradym/sdk'
const paradym = new Paradym({
    apiKey: "API_KEY"
})

paradym.openId4Vc.issuance.createIssuanceOffer({
  projectId: 'clwt6e610000101s69ubga6lk',
  requestBody: {
    credentials: [{
      credentialTemplateId: 'clwt6e610000101s69ubga6lk',
      attributes: {
        "name": "John Doe"
      },
    }]
  }
})
```


#### Create a SD-JWT presentation template:
```ts
import Paradym from '@paradym/sdk'
const paradym = new Paradym({
    apiKey: "API_KEY"
})

const sdJwtPresentationTemplate = await paradym.templates.presentations.createPresentationTemplate({
    projectId: 'clwt6e620000101s69ubga6lk',
    requestBody: {
        credentials: [
            {
                description: 'This is a description',
                name: 'My SD-JWT VC credential',
                format: 'sd-jwt-vc',
                type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
                attributes: {
                    myAttribute1: {
                        type: 'string',
                        value: 'myValue',
                    },
                    myAttribute2: {
                        type: 'number',
                        minimum: 1,
                        maximum: 10,
                    },
                    myAttribute3: {
                        type: 'boolean',
                        value: true,
                    },
                },
            },
        ],
        description: 'This is a description',
        name: 'My SD-JWT VC presentation',
    },
})
```

#### Create a SD-JWT Verification Request:
```ts
import Paradym from '@paradym/sdk'
const paradym = new Paradym({
    apiKey: "API_KEY"
})

paradym.openId4Vc.verification.createVerificationRequest({
  projectId: 'clwt6e610000101s69ubga6lk',
  requestBody: {
    presentationTemplateId: 'clwt6e610000101s69ubga6lk',
  }
})
```

## License

This project is licensed under the [Apache 2.0
License](https://opensource.org/licenses/Apache-2.0).