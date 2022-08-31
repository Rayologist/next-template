import FormDemo from "@containers/Form";
import { Paper, Group, Title, Container } from "@mantine/core";
import ColorSchemeToggle from "@components/ColorSchemeToggle";

export default function HomePage() {
  return (
    <Container size={700} my={20}>
      <Group position="right" mt={5}>
        <ColorSchemeToggle />
      </Group>
      <Title order={1} align="center">
        Sample Form
      </Title>
      <Paper shadow="md" mt={20} p={45} radius="md" withBorder>
        <FormDemo />
      </Paper>
    </Container>
  );
}
