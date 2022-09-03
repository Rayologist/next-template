import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps } from 'types';
import { useCustomFormik } from './Helper';

function TextInput(props: TextInputProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const inputValue = formik.values[name] as TextInputProps['value'];

  return (
    <MantineTextInput
      label={label}
      name={name}
      value={inputValue ?? undefined}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={hasError}
      {...rest}
    />
  );
}

export default TextInput;
