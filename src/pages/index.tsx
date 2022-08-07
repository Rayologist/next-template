import FormDemo from "@containers/Form";
import { MediaQuery, Group } from "@mantine/core";
import ColorSchemeToggle from "@components/ColorSchemeToggle";

export default function HomePage() {
  return (
    <>
      <Group position="right" mt={5}>
        <ColorSchemeToggle />
      </Group>
      <MediaQuery smallerThan={700} styles={{ width: "50%" }}>
        <FormDemo />
      </MediaQuery>
    </>
  );
}
