import { Select as MantineSelect } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { SelectProps } from 'types';
import { useCustomFormik } from './Helper';

function Select(props: SelectProps) {
  const { label, options, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const fieldValue = formik.values[name] as SelectProps['value'];

  return (
    <MantineSelect
      rightSection={<IconChevronDown width={15} color="#9e9e9e" />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      label={label}
      name={name}
      value={fieldValue}
      onChange={(value) => formik.setFieldValue(name, value)}
      onBlur={() => formik.setFieldTouched(name, true)}
      allowDeselect
      error={hasError}
      {...rest}
      data={options}
    />
  );
}

export default Select;
