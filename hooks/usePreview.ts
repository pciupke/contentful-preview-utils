import { useEffect, useState } from "react";
import { ContentfulPreviewData } from "../types/contentfulPreview";

interface usePreviewProps {
  preview?: boolean;
  previewData?: ContentfulPreviewData;
}

/**
 * Custom Hook that takes preview and previewData.
 * Manages the eventlistener for the switch to the previewMode,
 * statemanagement for previewMode,
 * scrolling of selected content into view
 * redirecting to content in contentful.com.
 *
 *
 * @param previewProps: usePreviewProps
 * @param previewData: ContentfulPreviewData
 *
 * returns: usePreview as default, handleClick, previewMode, setPreviewMode as named exports
 */
const usePreview = ({
  preview = false,
  previewData = { env: "master", internal: "" },
}: usePreviewProps) => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  /**
   * Scrolls to element which's id matches the internal in the previewData-Query
   */
  useEffect(() => {
    if (preview && typeof previewData?.internal == "string") {
      const previewElement = document.getElementById(previewData.internal);
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preview, previewData.internal]);

  /**
   * Adds and removes eventlistener for Keykombination to document
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (preview && event.metaKey && event.altKey && event.code === "KeyS") {
        setPreviewMode((previewMode) => !previewMode);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [preview]);

  return { previewMode, setPreviewMode };
};

export default usePreview;
