import { ChangeEvent, DragEvent, useState } from 'react';
import styles from './FileUpload.module.scss';

function Dropbox({
  children,
  accept = 'application/json',
  onChange = () => {},
}: {
  children: JSX.Element;
  accept?: string;
  onChange?: (files: FileList) => void;
}) {
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

    if (
      accept &&
      [...files].every((file) => file.type && accept.includes(file.type))
    ) {
      if (onChange) {
        onChange(files);
      }
    } else {
      alert('Bad file type');
    }
  };

  return (
    <div
      className={`${styles.dropbox} ${
        isDragOver ? styles.dropbox__active : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

function FileUpload({
  accept = 'application/json',
  onFilesChange,
}: {
  accept?: string;
  onFilesChange?: (files: FileList | null) => void;
}) {
  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onFilesChange) return;

    onFilesChange(e.target.files);
  };

  return (
    <Dropbox accept={accept} onChange={onFilesChange}>
      <div className={styles['file-upload']}>
        <label htmlFor="file-upload">
          <input
            type="file"
            id="file-upload"
            accept={accept}
            className={styles['file-upload_input']}
            onChange={handleFilesChange}
          />
          To upload data - click on the text or drag a file into the area
        </label>
      </div>
    </Dropbox>
  );
}

export default FileUpload;
