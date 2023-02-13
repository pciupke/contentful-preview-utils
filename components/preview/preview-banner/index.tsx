import React from "react";
import styles from "@/styles/PreviewBanner.module.css";

interface PreviewBannerProps {
  closePreview: () => void;
}

/**
 * Functional Component to display Preview Banner
 *
 * @param closePreview arrow-function that executes setPreviewMode
 * @returns JSX-Element
 */
const PreviewBanner: React.FC<PreviewBannerProps> = ({ closePreview }) => {
  return (
    <section className={styles.previewBanner}>
      <h3>Preview-Mode ist aktiviert</h3>
      <button onClick={closePreview} type="button">
        PreviewMode beenden
      </button>
    </section>
  );
};

export default PreviewBanner;
