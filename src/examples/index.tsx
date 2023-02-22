// This is not a working example, as it uses some functions like "getContentfulHomepage" which are custom functions and not part of this package
// It is just an inspiration of how you could use the contentful-preview-utils-package.

import React from 'react'
import Head from 'next/head'
import getContentfulHomepage from '@/utils/contentful/getContentfulHomepage'
import { GetStaticPropsContext, NextPage } from 'next/types'
import { IPage } from '@/types/contentful'
import { ParsedUrlQuery } from 'querystring'
import { ContentfulPreviewData } from '@/types/contentfulPreview'
import BlogPostRenderer from '@/components/content/blog-post-renderer'

// import from this package
import { usePreview } from 'contentful-preview-utils'
import { transformPageDataToProps } from 'contentful-preview-utils'
import { PreviewBanner, PreviewWrapper } from 'contentful-preview-utils'

interface PageProps {
  page: IPage
  preview?: boolean
  previewData?: ContentfulPreviewData
}

const Page: NextPage<PageProps> = ({ page, preview, previewData }) => {
  const { content } = page.fields

  /**
   * use usePreview-Hook from contentful-preview-utils with the preview and previewData you get from getStaticProps
   */
  const { previewMode, setPreviewMode } = usePreview({
    preview,
    previewData,
  })

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
      {/* use this line to show the previewBanner on the buttom of your page (condition: your page gets called in next-PreviewMode) */}
      {previewMode && preview && <PreviewBanner closePreview={() => setPreviewMode(false)} />}
    </>
  )
}

/**
 * This function gets called at build time on server-side to
 * statically pre-fetch the sections rendered on the page
 *
 * @param context GetStaticPropsContext<ParsedUrlQuery, ContentfulPreviewData>
 * @returns props: { homepage } - will be passed to page as props
 */
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

export default Page
