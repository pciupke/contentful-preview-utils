import * as React from 'react'
import { render } from '@testing-library/react'
import { Entry } from 'contentful'

import PreviewBanner from '../src/components/preview/preview-banner'
import PreviewPortal from '../src/components/preview/preview-portal'
import PreviewWrapper from '../src/components/preview/preview-wrapper'

const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_MANAGEMENT_TOKEN,
})

const closePreviewMock = () => {}
const closeModalMock = () => {}
const entryMock = {
  metadata: { tags: [] },
  sys: {
    space: { sys: { type: 'Link', linkType: 'Space', id: '75dqrdcb3zm6' } },
    type: 'Entry',
    id: '7w7J4OLTtKd2G3QaenKFiX',
    contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'blogPost' } },
    revision: 14,
    createdAt: '2023-01-17T08:40:25.802Z',
    updatedAt: '2023-02-13T11:07:32.152Z',
    environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
    locale: 'en-US',
  },
  fields: {
    internal: 'blog4',
    title: 'Vierter Blog-Post',
    text: 'Lacus viverra vitae congue eu consequat ac. Eget dolor morbi non arcu risus. Auctor urna nunc id cursus. Risus quis varius quam quisque id diam vel quam elementum. Pellentesque adipiscing commodo elit at imperdiet dui. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Pulvinar elementum integer enim neque. ',
  },
}
const dataMock: Entry<any> = {
  update: () =>
    new Promise((resolve, reject) => {
      // the resolve / reject functions control the fate of the promise
      resolve(
        client
          .getSpace(process.env.NEXT_PUBLIC_JEST_SPACE_ID)
          .then((space: any) => space.getEntry(process.env.NEXT_PUBLIC_JEST_CONTENT_ID))
          .then((entry: any) => console.log(entry, `entry was fetched.`))
          .catch(console.error),
      )
      reject(entryMock)
    }),
  toPlainObject: () => {
    return {}
  },
  metadata: { tags: [] },
  sys: {
    space: { sys: { type: 'Link', linkType: 'Space', id: '75dqrdcb3zm6' } },
    type: 'Entry',
    id: '6OecfcjYYMeyoy1xAG99ME',
    contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'blogPostWithImage' } },
    revision: 2,
    createdAt: '2023-02-09T10:45:06.288Z',
    updatedAt: '2023-02-09T11:19:33.045Z',
    environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
    locale: 'en-US',
  },
  fields: {
    internal: 'blogImage1',
    title: 'Blog Post with Image 1',
    image: {
      metadata: { tags: [] },
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: '75dqrdcb3zm6' } },
        type: 'Asset',
        id: 'QlZJ0cfEgPPl7c9uiPImq',
        revision: 2,
        createdAt: '2023-02-09T11:17:47.799Z',
        updatedAt: '2023-02-09T11:19:28.474Z',
        environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
        locale: 'en-US',
      },
      fields: {
        title: 'Bild1',
        description: 'Bild 1 Beschreibung',
        file: {
          url: '//images.ctfassets.net/75dqrdcb3zm6/QlZJ0cfEgPPl7c9uiPImq/1f5d73f941db8adfba7156207d43d4de/FunkeysLogo.jpeg',
          details: { size: 6286, image: { width: 240, height: 240 } },
          fileName: 'FunkeysLogo.jpeg',
          contentType: 'image/jpeg',
        },
      },
    },
  },
}

jest.mock('next/router', () => require('next-router-mock'))

describe('Banner render', () => {
  it('renders without crashing', () => {
    render(<PreviewBanner closePreview={closePreviewMock} />)
  })
})

describe('Portal render', () => {
  it('renders without crashing', () => {
    render(<PreviewPortal entry={entryMock} closeModal={closeModalMock} />)
  })
})

describe('Wrapper render', () => {
  it('renders without crashing', () => {
    render(
      <PreviewWrapper data={dataMock} previewMode={false}>
        {' '}
        <div>Children</div>{' '}
      </PreviewWrapper>,
    )
  })
})
