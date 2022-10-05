import { useFormikContext, FormikContextType } from 'formik';
import ErrorMessage from './ErrorMessage';

interface FormValues {
  [key: string]: any;
}

function useCustomFormik(name: string): [FormikContextType<FormValues>, JSX.Element | null] {
  const formik = useFormikContext<FormValues>();
  const { touched, errors } = formik;
  const error = touched[name] && errors[name];
  const hasError = error ? <ErrorMessage text={error.toString()} /> : null;

  return [formik, hasError];
}

export { useCustomFormik };
