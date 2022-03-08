import FormDemo from "@containers/Form";
import { MediaQuery } from "@mantine/core";

export default function HomePage() {
  return (
    <MediaQuery smallerThan={700} styles={{ width: "70%" }}>
      <FormDemo />
    </MediaQuery>
  );
}
