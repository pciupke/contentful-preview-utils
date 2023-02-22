import React from 'react'

interface PreviewBannerProps {
  closePreview: () => void
}

/**
 * Functional Component to display Preview Banner
 *
 * @param closePreview arrow-function that executes setPreviewMode
 * @returns JSX-Element
 */
const PreviewBanner: React.FC<PreviewBannerProps> = ({ closePreview }) => {
  return (
    <section
      style={{
        alignItems: 'center',
        backgroundColor: '#a50104',
        bottom: '0',
        color: 'white',
        display: 'flex',
        fontSize: 'large',
        fontWeight: '700',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '16px 0',
        position: 'fixed',
        width: '100%',
      }}
    >
      <h3>Preview-Mode is on</h3>
      <button
        onClick={closePreview}
        style={{
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: 'large',
          fontWeight: '700',
          padding: '16px 16px',
        }}
        type='button'
      >
        PreviewMode off
      </button>
    </section>
  )
}

export default PreviewBanner
