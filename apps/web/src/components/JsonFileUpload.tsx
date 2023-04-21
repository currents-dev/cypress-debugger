import { useToast } from '@/components/ui/useToast';
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
  const { toast } = useToast();

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
          toast({
            title: 'Error',
            description: 'Bad input',
          });
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
      toast({
        title: 'Error',
        description: 'Error while uploading the file',
      });
    });
  };

  return (
    <FileUpload accept="application/json" onFilesChange={handleFilesChange} />
  );
}

export default JsonFileUpload;
