import { Container } from '@mantine/core';
import Editor from '@components/RichTextEditor';

export default function RTE() {
  return (
    <Container size={800}>
      <Editor />
    </Container>
  );
}
