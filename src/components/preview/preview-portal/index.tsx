import React, { useState } from 'react'
import PreviewFormField from './preview-form-field'
import { updateEntryAsDraft, updateAndPublishEntry } from '../../../helpers/manageEntries'
import { useRouter } from 'next/router'

interface PreviewPortalProps {
  entry: any
  closeModal: any
}

const PreviewPortal: React.FC<PreviewPortalProps> = ({ entry, closeModal }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(entry.fields)

  const { fields } = entry

  const directEdit = async (publish: boolean) => {
    setLoading(true)
    if (publish) {
      await updateAndPublishEntry(entry.sys.id, data)
    } else {
      await updateEntryAsDraft(entry.sys.id, data)
    }
    closeModal()
    router.reload()
    setLoading(false)
  }
  const redirectToContentful = () => {
    router.push(
      `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/entries/${entry.sys.id}`,
    )
  }

  return (
    <section>
      <div
        style={{
          alignItems: 'center',
          background: '#01161e',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: '0',
          opacity: '50%',
          position: 'fixed',
          textAlign: 'center',
          top: '0',
          width: '100%',
        }}
      ></div>
      {loading ? (
        <div
          style={{
            backgroundColor: 'aliceblue',
            width: '50%',
            opacity: '1',
            position: 'fixed',
            margin: '3rem',
            padding: '3rem',
            top: '20%',
            left: '25%',
            borderRadius: '5px',
          }}
        >
          Ich mach so schnell ich kann. Moment...
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'aliceblue',
            width: '50%',
            opacity: '1',
            position: 'fixed',
            margin: '3rem',
            padding: '3rem',
            top: '20%',
            left: '25%',
            borderRadius: '5px',
          }}
        >
          <div>
            <h3
              style={{
                marginBottom: '1rem',
              }}
            >
              Ändere Content-Typen: {fields.internal}
            </h3>
            {Object.entries(data).map(([field, value], index: number) => (
              <PreviewFormField key={index} value={value} field={field} setData={setData} />
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
              }}
            >
              <button
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#a50104',
                  color: 'white',
                  cursor: 'pointer',
                }}
                type='button'
                onClick={closeModal}
              >
                Abbrechen
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#01161e',
                  color: 'white',
                  cursor: 'pointer',
                }}
                type='button'
                onClick={redirectToContentful}
              >
                Gehe zu Contentful
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#fac748',
                  color: 'white',
                  cursor: 'pointer',
                }}
                type='button'
                onClick={() => directEdit(false)}
              >
                Direkt anwenden als Draft
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#6a994e',
                  color: 'white',
                  cursor: 'pointer',
                }}
                type='button'
                onClick={() => directEdit(true)}
              >
                Direkt anwenden und veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PreviewPortal
