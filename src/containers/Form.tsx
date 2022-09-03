import { Form, Formik, FormikHelpers } from 'formik';
import { FormikController } from '@components/Form';
import { Button, Grid, ColProps } from '@mantine/core';
import { object, string, number, array, date, ref } from 'yup';
import { ControllerProps } from 'types';

function FormDemo() {
  interface Values {
    username: string;
    email: string;
    age: number | null;
    password: string;
    confirmPassword: string;
    drinks: Array<string>;
    position: string;
    browser: string;
    comments: string;
    date: Date | null;
    programmingLanguage: Array<string>;
    resume: File[];
  }

  const initialValue: Values = {
    username: '',
    password: '',
    age: null,
    confirmPassword: '',
    email: '',
    drinks: [],
    position: '',
    browser: '',
    comments: '',
    date: null,
    programmingLanguage: [],
    resume: [],
  };

  const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    console.log(values); // eslint-disable-line no-console
    setTimeout(() => actions.setSubmitting(false), 2000);
  };

  const validationSchema = object({
    username: string().required('Required'),
    email: string().email('Wrong Format').required('Required'),
    age: number().required('Required').nullable(),
    password: string().required('Required'),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Passwords do not match')
      .required('Required'),
    drinks: array().min(1, 'Required'),
    position: string().required('Required').nullable(),
    browser: string().required('Required').nullable(),
    comments: string().required('Required'),
    date: date().required('Required').nullable(),
    programmingLanguage: array().min(1, 'Required'),
    resume: array().min(1, 'Required'),
  });

  const fields: (ControllerProps & { col?: ColProps })[] = [
    {
      control: 'text-input',
      name: 'username',
      label: 'Username',
      withAsterisk: true,
    },
    {
      control: 'text-input',
      type: 'email',
      name: 'email',
      label: 'Email',
      withAsterisk: true,
    },
    {
      control: 'password-input',
      name: 'password',
      label: 'Password',
      withAsterisk: true,
    },
    {
      control: 'password-input',
      name: 'confirmPassword',
      label: 'Confirm Password',
      withAsterisk: true,
    },
    {
      control: 'checkbox-group',
      name: 'drinks',
      label: 'Drinks',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Tea', value: 'tea' },
        { label: 'Wine', value: 'wine' },
      ],
      withAsterisk: true,
    },
    {
      control: 'select',
      name: 'position',
      label: 'Position',
      options: [
        { label: 'Backend', value: 'backend' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Fullstack', value: 'fullstack' },
      ],
      withAsterisk: true,
      placeholder: 'Pick Position',
    },
    {
      control: 'radio-group',
      name: 'browser',
      label: 'Browser',
      options: [
        { label: 'Firefox', value: 'firefox' },
        { label: 'Edge', value: 'edge' },
        { label: 'Chrome', value: 'chrome' },
        { label: 'Opera', value: 'opera' },
        { label: 'Safari', value: 'safari' },
      ],
      withAsterisk: true,
    },
    {
      control: 'date-picker',
      name: 'date',
      label: 'Date',
      placeholder: 'Pick Date',
      withAsterisk: true,
      allowFreeInput: true,
    },
    {
      control: 'number-input',
      name: 'age',
      label: 'Age',
      withAsterisk: true,
      min: 1,
    },
    {
      control: 'multi-select',
      name: 'programmingLanguage',
      label: 'Programming Language',
      options: [
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Go',
          value: 'go',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Rust',
          value: 'rust',
        },
      ],
      clearable: true,
      searchable: true,
      creatable: true,
      withAsterisk: true,
    },
    {
      control: 'file-input',
      name: 'resume',
      label: 'Resume',
      multiple: true,
      clearable: true,
      withAsterisk: true,
      col: {
        md: 12,
        lg: 12,
      },
    },
    {
      control: 'text-area',
      name: 'comments',
      label: 'Comments',
      withAsterisk: true,
      col: {
        md: 12,
        lg: 12,
      },
    },
  ];

  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => (
        <Form>
          <Grid justify="center" gutter="xl">
            {fields.map((field, index) => {
              const { col } = field;
              return (
                <Grid.Col xs={12} sm={12} md={6} lg={6} key={`${field.name}-${index}`} {...col}>
                  <FormikController {...field} />
                </Grid.Col>
              );
            })}
            <Grid.Col xs={3.5} sm={2.5} md={2.5} lg={2.5} xl={2.5} mt={10}>
              <Button type="submit" loading={formik.isSubmitting} fullWidth>
                {formik.isSubmitting ? 'Submitting' : 'Submit'}
              </Button>
            </Grid.Col>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default FormDemo;
