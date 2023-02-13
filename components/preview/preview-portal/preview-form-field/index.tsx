import React from "react";
import styles from "@/styles/PreviewFormField.module.css";
import { useRouter } from "next/router";

interface PreviewFormFieldProps {
  value: any;
  field: any;
  setData: any;
}

const PreviewFormField: React.FC<PreviewFormFieldProps> = ({
  value,
  field,
  setData,
}) => {
  const router = useRouter();

  const goToAsset = (assetId: string) => {
    router.push(
      `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/assets/${assetId}`
    );
  };

  const renderField = (value: any) => {
    switch (typeof value) {
      case "string":
        return field !== "internal" ? (
          <textarea
            className={styles.textarea}
            cols={50}
            rows={3}
            placeholder={value}
            value={value}
            onChange={(event: any) => {
              setData((data: any) => {
                const newData = {
                  ...data,
                  [field]: event.target.value,
                };
                return newData;
              });
            }}
          ></textarea>
        ) : (
          <input
            className={styles.disabled}
            disabled
            type="text"
            placeholder={value}
          />
        );
        break;
      case "object":
        return value?.sys.type === "Asset" ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => goToAsset(value.sys.id)}
          >
            Ändere Asset in Contentful
          </button>
        ) : (
          <div>Feld noch nicht unterstützt</div>
        );
      default:
        console.log(value);
    }
  };

  return (
    <div>
      <h4 className={styles.title}>
        {field.charAt(0).toUpperCase()}
        {field.slice(1).toLowerCase()}
      </h4>
      {renderField(value)}
    </div>
  );
};

export default PreviewFormField;
