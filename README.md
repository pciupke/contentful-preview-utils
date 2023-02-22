# contentful-preview-utils

Contentful-preview-utils is a package that provides you with features to improve the preview-workflow for your contentful editors in your next.js-project.

It improves your editors workflow by giving them a chance to change contentful-content directly from the preview-site without the need to navigate back to contentful.

When you use this package your editor can navigate to the "_.../api/preview/..._"-preview-page of your next.js-app. There the editor will be able to press **"Command"** + **"Option"** + **"S"** to start the previewMode. In this mode every content from contentful will be highlighted. When clicked upon there is a modal popping up which lets the editor change the text-input directly without navigating back to contentful.com (although there is the option to go directly to the selected entry).

I dont want to overload this package with images. But you can get a visual impression of your editors workflow while using this package in the [_github-repo_](https://github.com/pciupke/contentful-preview-utils) (you'll find it in the _workflow-example.md_)

## Prerequisites

- This package only works as part of a **next.js-project ( version >= 12 )**
- Every single content that you want to preview or edit needs to have a required and unique field with the name **"internal"**
- You need to add the query parameters **&env=\{entry.sys.environment.sys.id\}&internal={entry.fields.internal}&secret=<your_secret>** to the preview-URL in the contentful-app.

## Disclaimer

Until now, I haven't implemented the opportunity for you to change the styles and options of the portal. I am working on that, but it might take some time.

## Getting Started

I assume you know how to setup your next.js-Project and connect it to contentful. For the latter I gave some hints, but no complete guide. Once you setup up your project you can use this package in the following way:

### Installation

Just run

```bash
npm install contentful-preview-utils
# or
yarn add contentful-preview-utils
```

### Usage

1. Set up your contentful-preview mode to fetch your data from contentful. Here is some advice from next.js to help you with that: [next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and in addition specifically for the setup of a [contentful-preview in next](https://github.com/vercel/next.js/tree/canary/examples/cms-contentful).

2. Once you are able to fetch data from contentful, you need to make them accessible for your page-component via getStaticProps (see [examples-folder](https://github.com/pciupke/contentful-preview-utils.git) for hints how to do that). A way to do it is like this:

```jsx
interface PageProps {
  page: IPage
  preview?: boolean
  previewData?: ContentfulPreviewData
}

const Page: NextPage<PageProps> = ({ page, preview, previewData }) => {
  const { content } = page.fields

return (
      <main className={styles.main}>
        <h1 className={styles.title}>
          Exampleproject for usage of next-js's Preview-Mode in combination with Contentful.
        </h1>
        <h4 className={styles.subtitle}>This was just a dummy-blog-post-app to demonstrate how to</h4>
        {/* check if you have available content */}
        {content &&
          // do anything with your content. In this case we just map through the BlogPosts
          content.map((blogData) => (
              <BlogPostRenderer key={blogData.fields.internal} postData={blogData} />

          ))}
      </main>
  )
}
export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, ContentfulPreviewData>) => {
  // fetch data from contentful
  const page = await getContentfulHomepage(context)

  // transform props
  const props = await transformPageDataToProps(context, page)

  // pass page data to the page via props
  return {
    props,
  }
}

export default Home
```

3. Your frontend-component has access to preview, previewData and your contentful-content. Start your dev server (i am using port 3000) to check if everything worked so far. Open a terminal and use one of these commands:

```bash
yarn && yarn dev

# or

npm install && npm run dev
```

Navigate to http://localhost:3000. You should see your page with all your contentful-content.

5. Now is the time to import the PreviewBanner and PreviewWrapper.

6. Wrap all your content-components with the PreviewWrapper.
7. Add the PreviewBanner-component to your Page-component. Your page-component could look something like this now:

```jsx
// imports you need as well
import React from 'react'
import Head from 'next/head'
import { GetStaticPropsContext, NextPage } from 'next/types'
import { ParsedUrlQuery } from 'querystring'

// imports from this package
import { ContentfulPreviewData } from 'contentful-preview-utils'
import { usePreview } from 'contentful-preview-utils'
import { transformPageDataToProps } from 'contentful-preview-utils'
import { PreviewBanner, PreviewWrapper } from 'contentful-preview-utils'

// custom imports i need to fetch and render the contentful-content
import BlogPostRenderer from '@/components/content/blog-post-renderer'
import getContentfulHomepage from '@/utils/contentful/getContentfulHomepage'
import { IPage } from '@/types/contentful'


interface PageProps {
  page: IPage
  preview?: boolean
  previewData?: ContentfulPreviewData
}

const Page: NextPage<PageProps> = ({ page, preview, previewData }) => {
  const { content } = page.fields

return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Exampleproject for usage of next-js's Preview-Mode in combination with Contentful.
        </h1>
        <h4 className={styles.subtitle}>This was just a dummy-blog-post-app to demonstrate how to</h4>
        {/* check if you have available content */}
        {content &&
          // map through your content-entries and wrap each content-entry with the previewWrapper
          content.map((blogData) => (
            <PreviewWrapper key={blogData.fields.internal} data={blogData} previewMode={previewMode}>
              <BlogPostRenderer postData={blogData} />
            </PreviewWrapper>
          ))}
      </main>
      {/* use this line to add the previewBanner to the buttom of your page when in Preview Mode */}
      {previewMode && preview && <PreviewBanner closePreview={() => setPreviewMode(false)} />}
    </>
  )
}
export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, ContentfulPreviewData>) => {
  // fetch data from contentful
  const page = await getContentfulHomepage(context)

  // transform props
  const props = await transformPageDataToProps(context, page)

  // pass page data to the page via props
  return {
    props,
  }
}

export default Home
```

8. Now everything is set up and ready to use. Start your dev-server again. Navigate to http://localhost:3000/api/preview?secret=<your_secret>&<your_additional_parameters>=<value_for_those_parameters>&slug=<your_slug>&env=<your_contentful_env>&internal=<internal_of_content_you_want_to_display>

9. Set up your preview in Contentful. Coming up next...

###### Explanation:

**env:** your contentful-enviroment-id, e.g. "master"
**internal:** the value of the "internal"-field of the content-entry you want to display, e.g. "blog-post"
**secret:** the secret you specified in your _api/preview.ts_-file e.g. "secret"

In my setup there is the need to provide a slug. Maybe you find a different solution.

**slug:** the slug of the page you want to display (in my case it will be concatenated to _"/"_), so _""_ will be _"localhost:3000/"_ or _"blog"_ will be _"localhost:3000/blog"_

##### Example Folder

You can find an example for a _api/preview.ts_-file in the related [github-project](https://github.com/pciupke/contentful-preview-utils.git), in the examples folder. In the same directory there is an example of a Next-Page.

## Limitations

Untill now the package only supports direct changes of _text_- (no RichText) and _image_-fields. All other fields are disabled and need to be changed via the [_contentful-app_](https://www.contentful.com/).
