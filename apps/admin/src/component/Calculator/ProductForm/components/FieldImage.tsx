import * as React from 'react';
import { Field } from 'react-final-form';
import { ImageUpload, validateFile } from '@redbull/components';
import { FieldValidator } from 'final-form';

type Props = {
  acceptedFiles: string[];
  label: string;
  name: string;
  maxFileSize: number;
  setValue: (...args: any) => void;
};

const FieldImage = ({
  acceptedFiles,
  label,
  name,
  maxFileSize,
  setValue,
}: Props) => {
  const [preview, setPreview] = React.useState<string>('');

  const validate: FieldValidator<File> = (file, values, meta) => {
    if (!file && !meta?.pristine) {
      return 'This field is required';
    }
    // This is to prevent error when product is being EDITED
    if ((values as any).imageServer && meta?.pristine) {
      return undefined;
    }
    if (file) {
      const fileValidation = validateFile(file, acceptedFiles, maxFileSize);
      if (fileValidation.isValid) {
        setImagePreview(file);
        return undefined;
      }
      return fileValidation.fileError;
    }
    return undefined;
  };

  const setImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target?.result;
      if (image) setPreview(image.toString());
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (preview) setValue('preview', preview);
  }, [preview, setValue]);

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }: any) => {
        return (
          <ImageUpload
            error={meta.error}
            label={label}
            onChange={input.onChange}
          />
        );
      }}
    </Field>
  );
};

export default FieldImage;
