import { useSimpleForm } from '@components/Form';
import { Checkbox, Anchor, Paper, Title, Text, Container, Group, Box } from '@mantine/core';
import { object, string } from 'yup';

export default function AuthenticationTitle() {
  const LoginForm = useSimpleForm({
    initialValues: {
      account: '',
      password: '',
    },
    onSubmit: (values, formikHelpers) => {
      console.log(values); // eslint-disable-line no-console
      setTimeout(() => formikHelpers.setSubmitting(false), 2000);
    },
    validationSchema: object({
      account: string().required('Required'),
      password: string().required('Required'),
    }),
    controllers: [
      {
        control: 'text-input',
        label: 'Account',
        name: 'account',
        withAsterisk: true,
      },
      {
        control: 'password-input',
        label: 'Password',
        name: 'password',
        withAsterisk: true,
      },
    ],
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm>
          {(formik) => (
            <Box mt={30}>
              <Group position="apart">
                <Checkbox label="Remember me" />
                <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <LoginForm.Button fullWidth mt="xl" loading={formik.isSubmitting}>
                {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
              </LoginForm.Button>
            </Box>
          )}
        </LoginForm>
      </Paper>
    </Container>
  );
}
