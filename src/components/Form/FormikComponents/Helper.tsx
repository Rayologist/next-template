import { useFormikContext, FormikContextType } from 'formik';
import { Group, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

interface FormValues {
  [key: string]: any;
}

function useCustomFormik(name: string): [FormikContextType<FormValues>, JSX.Element | null] {
  const formik = useFormikContext<FormValues>();
  const { touched, errors } = formik;
  const error = touched[name] && errors[name];
  const hasError = error ? (
    <Group spacing={5} sx={{ position: 'absolute' }}>
      <IconAlertCircle width={18} />
      <Text weight={500} size="sm">
        {error.toString()}
      </Text>
    </Group>
  ) : null;

  return [formik, hasError];
}

export { useCustomFormik };
