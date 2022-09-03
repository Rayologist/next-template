import { FileInput as MantineFileInput } from '@mantine/core';
import { FileInputProps } from 'types';
import { IconUpload } from '@tabler/icons';
import { useCustomFormik } from '../Helper';
import ValueComponent from './ValueComponent';

function FileInput(props: FileInputProps<boolean>) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const fileInputValue = formik.values[name] as FileInputProps<boolean>['value'];

  return (
    <MantineFileInput
      label={label}
      name={name}
      icon={<IconUpload size={14} />}
      valueComponent={ValueComponent}
      value={fileInputValue}
      onChange={(value) => formik.setFieldValue(name, value)}
      onBlur={formik.handleBlur}
      error={hasError}
      {...rest}
    />
  );
}

export default FileInput;
