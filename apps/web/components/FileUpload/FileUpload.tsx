import { ChangeEvent, DragEvent, useState } from "react";
import styles from "./FileUpload.module.scss";

interface JSONFIleUploadProps<T> {
  onChange: (payload: T | null) => void;
  validate: (payload: T) => boolean;
}

export function JSONFileUpload<T extends Object>({
  onChange,
  validate,
}: JSONFIleUploadProps<T>) {
  const handleFilesChange = (files: FileList | null) => {
    if (!files || !files[0]) return;

    const file = files[0];

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    function handleFileLoad(evt: ProgressEvent<FileReader>) {
      let result = evt.target?.result;

      if (!result) {
        onChange(null);
      } else {
        if (typeof result !== "string") {
          const dec = new TextDecoder("utf-8");
          result = dec.decode(result);
        }

        const parsedResult = JSON.parse(result);

        if (!validate(parsedResult)) {
          reader.abort();
          alert("Bad input");
        } else {
          onChange(parsedResult);
        }
      }
    }

    reader.addEventListener("load", handleFileLoad);
    reader.addEventListener(
      "loadend",
      function (evt: ProgressEvent<FileReader>) {
        reader.removeEventListener("load", handleFileLoad);
      }
    );

    reader.addEventListener("error", () => {
      alert("Error while uploading the file");
    });
  };

  return (
    <FileUpload accept="application/json" onFilesChange={handleFilesChange} />
  );
}

export function FileUpload({
  multiple,
  accept,
  onFilesChange,
}: {
  multiple?: boolean;
  accept?: string;
  onFilesChange?: (files: FileList | null) => void;
}) {
  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onFilesChange) return;

    onFilesChange(e.target.files);
  };

  return (
    <Dropbox accept={accept} onChange={onFilesChange}>
      <div className={styles["file-upload"]}>
        <input
          type="file"
          id="fileElem"
          accept={accept}
          className={styles["file-upload_input"]}
          onChange={handleFilesChange}
        />
        <label htmlFor="fileElem">
          Click to select a file, or drag it in the area
        </label>
      </div>
    </Dropbox>
  );
}

const Dropbox = ({
  children,
  accept,
  onChange,
}: {
  children: JSX.Element;
  accept?: string;
  onChange?: (files: FileList) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOver(true);
  };


  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsDragOver(false);
    const dt = e.dataTransfer;
    const files = dt?.files;

    if (accept && [...files].every((file) => accept.includes(file.type))) {
      if (onChange) {
        onChange(files);
      }
    } else {
      alert("Bad file type");
    }
  };

  return (
    <div
      className={`${styles.dropbox} ${
        isDragOver ? styles["dropbox--active"] : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
