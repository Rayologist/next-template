import { Form, Formik, FormikConfig, FormikContextType } from 'formik';
import { FormikController } from '@components/Form';
import { Button, Grid, ButtonProps } from '@mantine/core';
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
    <Button type="submit" form={id} {...buttonProps}>
      {buttonProps.children}
    </Button>
  );

  return FormikWrapper;
};

export default useSimpleForm;
