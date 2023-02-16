// Important:
// this is just an example of how you could setup your preview.ts.
// For now you need to find a way to fetch your contentful-data yourself. But I am working on a solution for that.
// Most important is line 66 where you set the previewData. This needs to contain at least the "env"-field and the "internal"-field

// -----------------------------------------

import getContentfulHomepage from '../../utils/contentful/getContentfulHomepage'
import getContentfulPage from '../../utils/contentful/getContentfulPage'

export default async function handler(req: any, res: any) {
  // use query that holds all of these fields, so you can use them here
  const { secret, slug, pageType, env, internal } = req.query

  // check if secred is valid
  if (secret !== process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  // check if pageType is correct and a slug exists
  if (pageType.toString() === 'coursePage' && !slug) {
    return res.status(401).json({ message: 'Invalid slug for coursepage' })
  }

  let page: any = {}
  let url = ''

  // Get the course page slug from the context
  switch (pageType.toString()) {
    // not implemented in this demo
    case 'page': {
      page = await getContentfulPage({
        slug: slug.toString(),
        preview: true,
        previewData: {
          env: env.toString() || process.env.NEXT_PUBLIC_CONTENTFUL_ENV,
        },
      })
      url = `/${slug.toString()}`
      break
    }

    // implemented in this demo
    case 'homepage': {
      page = await getContentfulHomepage({
        preview: true,
        previewData: {
          env: env.toString() || process.env.NEXT_PUBLIC_CONTENTFUL_ENV,
          internal: internal,
        },
      })
      url = '/'
      break
    }
    default: {
      // eslint-disable-next-line no-console
      console.log('Unknow pageType')
    }
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'No page data found' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ env, internal }, { maxAge: 60 * 60 })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities

  res.setHeader('Content-Type', 'text/html')
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`,
  )
  return res.status(200).end()
}
