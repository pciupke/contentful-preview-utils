# contentful-preview-utils

Contentful-preview-utils is a package that provides you with features to improve the preview-workflow for your contentful editors in your next.js-project.

It improves your editors workflow by giving them a chance to change contentful-content directly from the preview-site without the need to navigate back to contentful.

## Prerequisites

- This package only works as part of a **next.js-project ( version >= 12 )**
- Every single content that you want to preview or edit needs to have a required and unique field with the name **"internal"**
- You need to add the query parameters **&env=\{entry.sys.environment.sys.id\}&internal={entry.fields.internal}&secret=<your_secret>** to the preview-URL in the contentful-app.
-

## Getting Started

### Installation

Just run

```bash
npm install contentful-preview-utils
# or
yarn add contentful-preview-utils
```

### Usage

Set up your contentful-preview mode to fetch your data from contentful. Here is some advice from next.js to help you with that: [next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and in addition specifically for the setup of a [contentful-preview in next](https://github.com/vercel/next.js/tree/canary/examples/cms-contentful).

## Limitations

Untill now the package only supports direct changes of text- (no RichText) and image-fields. All other fields are disabled and need to be changed via the contentful-app.
