import { useToast } from '@/components/ui/useToast';
import clsx from 'clsx';
import { FileUp } from 'lucide-react';
import { ChangeEvent, DragEvent, useState } from 'react';

function FileUpload({
  accept = 'application/json',
  onFilesChange,
}: {
  accept?: string;
  onFilesChange?: (files: FileList | null) => void;
}) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(false);

    const dt = e.dataTransfer;
    const files = dt?.files;

    if (
      accept &&
      [...files].every((file) => file.type && accept.includes(file.type))
    ) {
      if (onFilesChange) {
        onFilesChange(files);
      }
    } else {
      toast({
        title: 'Error',
        description: 'Bad file type',
      });
    }
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onFilesChange) return;

    onFilesChange(e.target.files);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={clsx([
        'w-full h-full flex gap-4 flex-col items-center justify-center py-12 px-6 rounded border-2 border-dashed border-gray-400 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/20',
        isDragging ? 'border-indigo-500' : '',
      ])}
    >
      <FileUp className="w-9 h-9 text-gray-500 dark:text-slate-500" strokeWidth={1.5} />

      <p className="text-xl text-gray-500 dark:text-slate-500 text-center">
        Drop file to upload
        <br />
        or
      </p>
      <label
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        htmlFor="file-upload"
        className="bg-slate-900 text-slate-300 px-9 h-11 inline-flex items-center rounded border dark:border-slate-500 shadow-sm font-medium  hover:bg-slate-800"
      >
        Select file
        <input
          type="file"
          id="file-upload"
          accept={accept}
          className="sr-only"
          onChange={handleFilesChange}
        />
      </label>
    </div>
  );
}

export default FileUpload;
