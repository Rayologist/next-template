import FormDemo from '@containers/Form';
import { Paper, Title, Container } from '@mantine/core';

export default function Form() {
  return (
    <Container size={700} my={20}>
      <Title order={1} align="center">
        Sample Form
      </Title>
      <Paper shadow="md" mt={20} p={45} radius="md" withBorder>
        <FormDemo />
      </Paper>
    </Container>
  );
}
