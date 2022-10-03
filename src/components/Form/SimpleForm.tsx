import { Form, Formik, FormikConfig, FormikContextType } from 'formik';
import { Button, Grid, ButtonProps, useMantineTheme } from '@mantine/core';
import { FormikController } from '@components/Form';
import { SimpleFormControllerProps } from 'types';
import { useId } from '@mantine/hooks';
import { ReactNode } from 'react';

type Fields = {
  [field: string]: any;
};

type SimpleFormProps<T extends Fields> = FormikConfig<T> &
  SimpleFormControllerProps<FormikContextType<T>>;

const useSimpleForm = <T extends Fields>(props: SimpleFormProps<T>) => {
  const id = useId();
  const theme = useMantineTheme();

  const { controllers, ...formikProps } = props;

  const FormikWrapper = ({
    children,
  }: {
    children?: ReactNode | ((formikContext: FormikContextType<T>) => ReactNode);
  }) => (
    <Formik {...formikProps}>
      {(formik) => (
        <Form id={id}>
          <Grid justify="center" gutter="xl">
            {controllers.map((field, index) => {
              const { col, after, ...controllerProps } = field;
              return (
                <Grid.Col key={`${field.name}-${index}`} {...col}>
                  <FormikController {...controllerProps} />
                  {typeof after === 'function' ? after(formik) : after}
                </Grid.Col>
              );
            })}
          </Grid>
          {typeof children === 'function' ? children(formik) : children}
        </Form>
      )}
    </Formik>
  );

  FormikWrapper.Button = (buttonProps: ButtonProps) => (
    <Button type="submit" form={id} loaderProps={{ color: theme.colors.blue[5] }} {...buttonProps}>
      {buttonProps.children}
    </Button>
  );

  return FormikWrapper;
};

export default useSimpleForm;
