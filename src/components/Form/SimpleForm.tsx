import { Form, Formik, FormikConfig } from 'formik';
import { FormikController } from '@components/Form';
import { Button, Grid, ButtonProps } from '@mantine/core';
import { ControllerPropsWithCol } from 'types';
import { useId } from '@mantine/hooks';

type Fields = {
  [field: string]: any;
};

type SimpleFormProps<T extends Fields> = FormikConfig<T> & ControllerPropsWithCol;

const useSimpleForm = <T extends Fields>(props: SimpleFormProps<T>) => {
  const id = useId();

  const { controllers, ...rest } = props;

  const FormikWrapper = () => (
    <Formik {...rest}>
      <Form id={id}>
        <Grid justify="center" gutter="xl">
          {controllers.map((field, index) => {
            const { col } = field;
            return (
              <Grid.Col key={`${field.name}-${index}`} {...col}>
                <FormikController {...field} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Form>
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
