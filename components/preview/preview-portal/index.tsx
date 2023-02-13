import React, { useState } from "react";
import styles from "@/styles/PreviewPortal.module.css";
import PreviewFormField from "./preview-form-field";
import {
  updateEntryAsDraft,
  updateAndPublishEntry,
} from "@/utils/contentful/manageEntry";
import { useRouter } from "next/router";

interface PreviewPortalProps {
  entry: any;
  closeModal: any;
}

const PreviewPortal: React.FC<PreviewPortalProps> = ({ entry, closeModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(entry.fields);

  const { fields } = entry;

  const directEdit = async (publish: boolean) => {
    setLoading(true);
    if (publish) {
      await updateAndPublishEntry(entry.sys.id, data);
    } else {
      await updateEntryAsDraft(entry.sys.id, data);
    }
    closeModal();
    router.reload();
    setLoading(false);
  };
  const redirectToContentful = () => {
    router.push(
      `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/entries/${entry.sys.id}`
    );
  };

  return (
    <section>
      <div className={styles.background}></div>
      {loading ? (
        <div className={styles.modal}>
          Ich mach so schnell ich kann. Moment...
        </div>
      ) : (
        <div className={styles.modal}>
          <div className={styles.form}>
            <h3 className={styles.title}>
              Ändere Content-Typen: {fields.internal}
            </h3>
            {Object.entries(data).map(([field, value], index: number) => (
              <PreviewFormField
                key={index}
                value={value}
                field={field}
                setData={setData}
              />
            ))}
            <div className={styles.buttonGroup}>
              <button
                className={styles.closeButton}
                type="button"
                onClick={closeModal}
              >
                Abbrechen
              </button>
              <button
                className={styles.redirectButton}
                type="button"
                onClick={redirectToContentful}
              >
                Gehe zu Contentful
              </button>
              <button
                className={styles.draftButton}
                type="button"
                onClick={() => directEdit(false)}
              >
                Direkt anwenden als Draft
              </button>
              <button
                className={styles.publishButton}
                type="button"
                onClick={() => directEdit(true)}
              >
                Direkt anwenden und veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PreviewPortal;
