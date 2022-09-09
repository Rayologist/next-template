import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { PasswordInputProps } from 'types';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { useCustomFormik } from './Helper';

function PasswordInput(props: PasswordInputProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const passwordValue = formik.values[name] as PasswordInputProps['value'];

  return (
    <MantinePasswordInput
      name={name}
      label={label}
      error={hasError}
      value={passwordValue}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />
      }
      {...rest}
    />
  );
}

export default PasswordInput;
