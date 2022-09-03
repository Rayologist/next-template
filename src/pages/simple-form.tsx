import { useSimpleForm } from '@components/Form';
import { Checkbox, Anchor, Paper, Title, Text, Container, Group } from '@mantine/core';
import { useState } from 'react';

export default function AuthenticationTitle() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const LoginForm = useSimpleForm({
    initialValues: {
      account: '',
      password: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values, formikHelpers) => {
      setIsSubmitting(true);
      console.log(values); // eslint-disable-line no-console
      setTimeout(() => setIsSubmitting(false), 2000);
    },
    controllers: [
      {
        control: 'text-input',
        label: 'Account',
        name: 'account',
      },
      {
        control: 'password-input',
        label: 'Password',
        name: 'password',
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
        Do not have an account yet?
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <LoginForm.Button fullWidth mt="xl" loading={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </LoginForm.Button>
      </Paper>
    </Container>
  );
}
