import React from 'react'
import { useRouter } from 'next/router'

interface PreviewFormFieldProps {
  value: any
  field: any
  setData: any
}

const PreviewFormField: React.FC<PreviewFormFieldProps> = ({ value, field, setData }) => {
  const router = useRouter()

  const goToAsset = (assetId: string) => {
    router.push(`https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/assets/${assetId}`)
  }

  const renderField = (value: any) => {
    switch (typeof value) {
      case 'string':
        return field !== 'internal' ? (
          <textarea
            style={{
              marginTop: '0.5rem',
              width: '100%',
              maxWidth: '100%',
              backgroundColor: 'white',
              border: 'none',
              padding: '5px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            }}
            cols={50}
            rows={3}
            placeholder={value}
            value={value}
            onChange={(event: any) => {
              setData((data: any) => {
                const newData = {
                  ...data,
                  [field]: event.target.value,
                }
                return newData
              })
            }}
          ></textarea>
        ) : (
          <input
            style={{
              marginTop: '0.5rem',
              width: '100%',
              backgroundColor: 'white',
              border: 'none',
              padding: '5px',
              cursor: 'not-allowed',
            }}
            disabled
            type='text'
            placeholder={value}
          />
        )

      case 'object':
        return value?.sys.type === 'Asset' ? (
          <button
            style={{
              padding: '0.25rem 1rem',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: 'white',
              marginTop: '0.5rem',
            }}
            type='button'
            onClick={() => goToAsset(value.sys.id)}
          >
            Ändere Asset in Contentful
          </button>
        ) : (
          <div>Feld noch nicht unterstützt</div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h4
        style={{
          marginTop: '1rem',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        }}
      >
        {field.charAt(0).toUpperCase()}
        {field.slice(1).toLowerCase()}
      </h4>
      {renderField(value)}
    </div>
  )
}

export default PreviewFormField
