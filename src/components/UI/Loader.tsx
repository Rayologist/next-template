import { Loader as MantineLoader, Container } from '@mantine/core';

export default function Loader() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
      <MantineLoader variant="dots" size="lg" />
    </Container>
  );
}
