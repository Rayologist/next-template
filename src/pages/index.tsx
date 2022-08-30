import FormDemo from "@containers/Form";
import { Paper, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ColorSchemeToggle from "@components/ColorSchemeToggle";

export default function HomePage() {
  const matches = useMediaQuery("(max-width: 700px)");
  return (
    <>
      <Group position="right" mt={5}>
        <ColorSchemeToggle />
      </Group>
      <Paper
        shadow="lg"
        ml="auto"
        mr="auto"
        mt="0.5rem"
        radius="md"
        sx={{
          padding: matches ? "1rem 1rem" : "2rem 1rem",
          width: matches ? "80%" : "45%",
        }}
        withBorder
      >
        <FormDemo />
      </Paper>
    </>
  );
}
