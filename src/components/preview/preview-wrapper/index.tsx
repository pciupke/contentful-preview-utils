import React, { useState } from 'react'
import { Entry } from 'contentful'
import ReactDOM from 'react-dom'
import PreviewPortal from '../preview-portal'

interface PreviewWrapperProps {
  children: React.ReactNode
  data: Entry<any>
  previewMode: boolean
}

/**
 *
 * Wrapper that helps to make preview Work.
 * Just wrap you Component with this wrapper and you will be able to use the contentful preview for every child with this container.
 *
 * @param PreviewWrapperProps
 * @param children React.ReactNode no need to pass anything, just wrap child with this component
 * @param data Entry from contentful that you want to make accessable through the preview
 * @param previewMode Boolean that shows if you are in PreviewMode
 * @returns JSX-Element that has id attribute as wrapper for your components
 */
const PreviewWrapper: React.FC<PreviewWrapperProps> = ({ children, data, previewMode }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [hover, setHover] = useState(false)

  const elementStyle = hover ? { opacity: '1', cursor: 'pointer' } : { opacity: '0.4' }

  const closeModal = () => {
    setShowModal(false)
  }

  const openModal = () => {
    if (previewMode) {
      setShowModal(true)
    }
  }

  return (
    <section
      id={data.fields.internal}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={previewMode ? elementStyle : {}}
    >
      <div onClick={openModal}>{children}</div>
      {showModal && ReactDOM.createPortal(<PreviewPortal entry={data} closeModal={closeModal} />, document.body)}
    </section>
  )
}

export default PreviewWrapper
