import { Entry } from "contentful";
import safeStringify from "fast-safe-stringify";
import { GetStaticPropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { ContentfulPreviewData } from "./../types/contentfulPreview";

/**
 * Takes context and contentful-homepage-data and transforms it to props that can be used in homepage-page
 *
 * @param context GetStaticPropsContext<ParsedUrlQuery, ContentfulPreviewData>
 * @param page Entry<any>
 * @returns props for homepage
 */
export const transformPageDataToProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, ContentfulPreviewData>,
  page: Entry<any>
) => {
  if (!page) {
    return { notFound: true };
  }

  const propsData = safeStringify({
    page: page,
    preview: context?.preview || false,
    previewData: context?.previewData || {
      env: process.env.NEXT_PUBLIC_CONTENTFUL_ENV,
      internal: "",
    },
  });

  const props = JSON.parse(propsData);
  return props;
};
