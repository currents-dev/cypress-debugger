import FileUpload from './FileUpload';

interface JsonFileUploadProps<T> {
  onChange: ({
    filename,
    payload,
  }: {
    filename: string | null;
    payload: T | null;
  }) => void;
  validate: (payload: T) => boolean;
}

function JsonFileUpload<T extends object>({
  onChange,
  validate,
}: JsonFileUploadProps<T>) {
  const handleFilesChange = (files: FileList | null) => {
    if (!files || !files[0]) return;

    const file = files[0];

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    function handleFileLoad(evt: ProgressEvent<FileReader>) {
      let result = evt.target?.result;

      if (!result) {
        onChange({
          filename: null,
          payload: null,
        });
      } else {
        if (typeof result !== 'string') {
          const textDecoder = new TextDecoder('utf-8');
          result = textDecoder.decode(result);
        }

        const parsedResult = JSON.parse(result);

        if (!validate(parsedResult)) {
          reader.abort();
          // eslint-disable-next-line no-alert
          alert('Bad input');
        } else {
          onChange({
            filename: file.name,
            payload: parsedResult,
          });
        }
      }
    }

    reader.addEventListener('load', handleFileLoad);
    reader.addEventListener('loadend', () => {
      reader.removeEventListener('load', handleFileLoad);
    });

    reader.addEventListener('error', () => {
      // eslint-disable-next-line no-alert
      alert('Error while uploading the file');
    });
  };

  return (
    <FileUpload accept="application/json" onFilesChange={handleFilesChange} />
  );
}

export default JsonFileUpload;
