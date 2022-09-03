import { Textarea as MantineTextarea } from '@mantine/core';
import { TextareaProps } from 'types';
import { useCustomFormik } from './Helper';

function Textarea(props: TextareaProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const textValue = formik.values[name] as TextareaProps['value'];

  return (
    <MantineTextarea
      label={label}
      name={name}
      error={hasError}
      {...rest}
      value={textValue}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
}

export default Textarea;
